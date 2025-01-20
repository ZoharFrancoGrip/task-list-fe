import { Task } from '../models/task';

const TASK_API_BASE_URL = 'http://localhost:1234';

export const taskClient = {
    async getTasks(): Promise<Task[]> {
        const response = await fetch(`${TASK_API_BASE_URL}/tasks`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    },

    async createTask(task: Task): Promise<Task> {
        const response = await fetch(`${TASK_API_BASE_URL}/task/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        return response.json();
    },

    async updateTask(task: Task): Promise<Task> {
        const response = await fetch(`${TASK_API_BASE_URL}/task/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return response.json();
    },


    async deleteTask(id: number): Promise<void> {
        const response = await fetch(`${TASK_API_BASE_URL}/task/delete/${id}`, { method: 'POST' });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    },
};