
export interface Boards{
    boards: Array<Board>
}

export interface Board{
    columns: Array<Column>
    name: string
}

export interface Column{
    name: string
    tasks: Array<Task>
}

export interface Task{
    description: string
    status: string
    subtasks: Array<Subtask>
    title: string
}

export interface Subtask{
    isCompleted: boolean
    title: string
}