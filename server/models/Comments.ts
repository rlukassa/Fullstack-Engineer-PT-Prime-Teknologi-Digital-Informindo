import mongoose, { Schema, Document } from 'mongoose';

export enum CommentType {
    TEXT = 'text',
    IMAGE = 'image',
    GIF = 'gif',
    EMOJI = 'emoji'
}

export interface IComment extends Document {
    types: CommentType;
    likes: number;
    content: string;
    author: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt?: Date;
    isEdited: boolean;
}

const CommentsSchema: Schema = new Schema({
    types: {
        type: String,
        enum: Object.values(CommentType),
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    isEdited: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model<IComment>('Comments', CommentsSchema);