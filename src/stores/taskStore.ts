import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority, TaskType, TaskDifficulty } from '../models/task';

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
    addTask: (task: Task) => void;
    updateTask: (id: number | undefined, updatedTask: Partial<Task>) => void;
    deleteTask: (id: number | undefined) => void;
    duplicateTask: (id: number | undefined) => void;
    setFilter: (key: keyof FilterState, values: Array<string> | string | null) => void;
    getFilteredTasks: () => Task[];
}

const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    filteredTasks: [],
    filter: {
        priority: [],
        status: [],
        type: [],
        difficulty: [],
        search: '',
    },
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, { ...task, id: Date.now() }],
        })),
    updateTask: (id, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            ),
        })),
    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),
    duplicateTask: (id) => {
        const task = get().tasks.find((task) => task.id === id);
        if (task) {
            get().addTask({ ...task, id: Date.now(), createdAt: new Date() });
        }
    },
    setFilter: (key, values) =>{
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
}));

export default useTaskStore;
