import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const SprintSchema = new Schema(
    {
        name: { type: String, required: true },
        projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }

    }
)