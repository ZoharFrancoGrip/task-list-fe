import { create } from 'zustand';
import { Task } from '../models/task';

interface FilterState {
  priority: 'All' | 'Low' | 'Medium' | 'High';
  status: 'All' | 'Pending' | 'In Progress' | 'Completed';
  search: string;
}

interface TaskStore {
  tasks: Task[];
  filter: FilterState;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  setFilter: (key: keyof FilterState, value: string) => void;
  getFilteredTasks: () => Task[];
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: {
    priority: 'All',
    status: 'All',
    search: '',
  },
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), ...task }],
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
  setFilter: (key, value) =>
    set((state) => ({
      filter: { ...state.filter, [key]: value },
    })),
  getFilteredTasks: () => {
    const { tasks, filter } = get();
    return tasks.filter((task) => {
      return (
        (filter.priority === 'All' || task.priority === filter.priority) &&
        (filter.status === 'All' || task.status === filter.status) &&
        task.title.includes(filter.search)
      );
    });
  },
}));

export default useTaskStore;
