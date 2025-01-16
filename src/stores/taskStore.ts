import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority, TaskType, TaskDifficulty } from '../models/task';
import { taskClient } from '../clients/task-client';

interface FilterState {
    priority: Array<TaskPriority> | null;
    status: Array<TaskStatus> | null;
    type: Array<TaskType> | null;
    difficulty: Array<TaskDifficulty> | null;
    search: string;
}



interface TaskStore {
    tasks: Task[];
    filteredTasks: Task[];
    filter: FilterState;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
    addTask: (task: Task) => void;
    updateTask: (id: number, updatedTask: Task) => void;
    deleteTask: (id: number) => void;
    duplicateTask: (id: number) => void;
    setFilter: (key: keyof FilterState, values: Array<string> | string | null) => void;
    getFilteredTasks: () => Task[];
    fetchTasks: () => Promise<void>;
}


const useTaskStore = create<TaskStore>((set, get) => {
    return {
        tasks: [],
        filteredTasks: [],
        filter: {
            priority: [],
            status: [],
            type: [],
            difficulty: [],
            search: '',
        },
        isLoading: false,
        isError: false,
        error: null,
        addTask: (task) =>
            set((state) => {
                try {
                    taskClient.createTask(task);
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false, isError: true });
                }
                return {
                    tasks: [...state.tasks, { ...task, id: Date.now() }],
                }
            }),
        updateTask: (id, updatedTask) =>
            set((state) => {
                const updatedTasks = state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updatedTask } : task
                );
                try {
                    taskClient.updateTask(updatedTask);
                } catch (error) {
                    return { tasks: updatedTasks, error: (error as Error).message, isLoading: false, isError: true };
                }
                return { tasks: updatedTasks };
            }),
        deleteTask: (id) =>
            set((state) => {
                const updatedTasks = state.tasks.filter((task) => task.id !== id);
                try {
                    taskClient.deleteTask(id);
                } catch (error) {
                    set({ error: (error as Error).message, isLoading: false, isError: true });
                }
                return { tasks: updatedTasks };
            }),

        duplicateTask: (id) => {
            const task = get().tasks.find((task) => task.id === id);
            if (task) {
                const newTask = { ...task, id: Date.now(), createdAt: new Date() };
                get().addTask(newTask);
            }

        },

        setFilter: (key, values) => {
            set((state) => ({
                filter: { ...state.filter, [key]: values },
            }))
        },
        getFilteredTasks: () => {
            const { tasks, filter } = get();
            return tasks.filter((task) => {
                return (
                    (filter.priority?.length === 0 || filter.priority?.includes(task.priority)) &&
                    (filter.status?.length === 0 || filter.status?.includes(task.status)) &&
                    (filter.type?.length === 0 || filter.type?.includes(task.type)) &&
                    (filter.difficulty?.length === 0 || filter.difficulty?.includes(task.difficulty)) &&
                    task.title.includes(filter.search)
                );
            });
        },

        fetchTasks: async () => {
            set({ isLoading: true, error: null });
            try {
                const tasks = await taskClient.getTasks();
                set({ tasks, isLoading: false, isError: false });
            } catch (error) {
                set({ error: (error as Error).message, isLoading: false, isError: true });
            }
        },

    }
});

export default useTaskStore;
