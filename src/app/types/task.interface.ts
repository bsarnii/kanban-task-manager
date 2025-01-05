import { Status } from "./status.interface"

export interface Task{
    id: string
    boardId: string
    name: string
    description: string
    status: Status
    subtasks: Subtask[]

}

export interface Subtask{
    id: string
    name: string
    isCompleted: boolean
}