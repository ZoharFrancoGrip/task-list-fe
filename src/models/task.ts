export class Task {
    id: number = 0;
    title: string = '';
    description: string = '';
    priority: TaskPriority = TaskPriority.High;
    status: TaskStatus = TaskStatus.InProgress;
    type: TaskType = TaskType.Bug;
    difficulty: TaskDifficulty = TaskDifficulty.Hard;
    createdAt: Date = new Date();
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export enum TaskType {
    Bug = 'Bug',
    Feature = 'Feature',
    Task = 'Task',
}

export enum TaskStatus {
    ToDo = 'TODO',
    InProgress = 'In Progress',
    Blocked = 'Blocked',
    Done = 'Done',
}

export enum TaskDifficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

