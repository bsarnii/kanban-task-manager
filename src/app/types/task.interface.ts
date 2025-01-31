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
    isCompleted: boolean
}