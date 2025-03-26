export interface Task{
    id: string
    boardId: string
    name: string
    description: string
    statusId: string
    subtasks: Subtask[]
    createdAt: string
}

export interface Subtask{
    id: string
    name: string
    completed: boolean
    createdAt: string
}

export type SubtaskInput = Omit<Subtask, 'id' | 'createdAt'> & { id?: string };

export type TaskInputDto = Omit<Task, 'id'| 'createdAt' | 'subtasks'> & { subtasks: SubtaskInput[] };