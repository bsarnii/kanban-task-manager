export interface BoardMember {
    id: string;
    email: string;
    role: BoardMemberRole;
}

export type BoardMemberRole = 'owner' | 'editor' | 'viewer';

export const BoardMemberRoleLabels: Record<BoardMemberRole, string> = {
    owner: 'Owner',
    editor: 'Editor',
    viewer: 'Viewer'
};