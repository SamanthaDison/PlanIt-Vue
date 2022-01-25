import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const TaskSchema = new Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    isComplete: { type: Boolean, required: true, default: false }

},
    { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Profile',
    justOne: true
})