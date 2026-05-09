import { BoardMemberRole } from "./board-member.interface"
import { Status, StatusInputDto } from "./status.interface"

export interface Board{
    id: string
    name: string
    statuses: Status[]
    createdAt: string
    createdBy: string
    boardMemberRole: BoardMemberRole
}

export type BoardInputDto = Omit<Board, 'id' | 'createdAt' | 'statuses' | 'createdBy' | 'boardMemberRole'> & { statuses: StatusInputDto[] };