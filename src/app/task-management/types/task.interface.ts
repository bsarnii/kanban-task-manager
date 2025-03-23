export interface Task{
    id: string
    boardId: string
    name: string
    description: string
    statusId: string
    subtasks: Subtask[]
}

export interface Subtask{
    id: string
    name: string
    completed: boolean
}

export type SubtaskInput = Omit<Subtask, 'id'> & { id?: string };

export type TaskInputDto = Omit<Task, 'id'|'subtasks'> & { subtasks: SubtaskInput[] };