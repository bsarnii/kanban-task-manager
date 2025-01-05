import { Status } from "./status.interface"
import { Task as Task2}  from "./task.interface"

export interface Boards{
    boards: Array<Board>
}

export interface Board{
    id: string
    columns: Array<Column>
    tasks: Task2[]
    name: string
    statuses: Status[]
}

export interface Column{
    id: string
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