export enum CommentType {
    TEXT = 'text',
    IMAGE = 'image',
    GIF = 'gif',
    EMOJI = 'emoji'
}

export interface IComment {
    id?: number;
    types: CommentType;
    likes?: number;
    content: string;
    author_id: number;
    post_id: number;
    is_edited?: boolean;
    created_at?: Date;
    updated_at?: Date;
}