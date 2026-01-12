import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    image: string;
    caption?: string;
    likes: number;
    comments: mongoose.Types.ObjectId[];
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt?: Date;
    isEdited: boolean;
}

const PostSchema: Schema = new Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        maxLength: 2200
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments',
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

export default mongoose.model<IPost>('Post', PostSchema);