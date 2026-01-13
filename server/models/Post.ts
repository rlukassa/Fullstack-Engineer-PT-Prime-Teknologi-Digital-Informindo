export interface IPost {
    id?: number;
    title: string;
    caption?: string;
    image?: string;
    likes?: number;
    author_id: number;
    is_edited?: boolean;
    created_at?: Date;
    updated_at?: Date;
    author?: {
        id: number;
        username: string;
    };
    comments?: number;
}