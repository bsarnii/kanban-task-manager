import { Status } from "./status.interface"

export interface Board{
    id: string
    name: string
    statuses: Status[]
}