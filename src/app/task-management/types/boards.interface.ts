import { Status, StatusInputDto } from "./status.interface"

export interface Board{
    id: string
    name: string
    statuses: Status[]
    createdAt: string
}

export type BoardInputDto = Omit<Board, 'id' | 'createdAt' | 'statuses'> & { statuses: StatusInputDto[] };