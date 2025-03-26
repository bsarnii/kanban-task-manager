export interface Status {
    id: string
    name: string
    createdAt: string
}

export type StatusInputDto = Omit<Status, 'id' | 'createdAt'> & { id?: string };