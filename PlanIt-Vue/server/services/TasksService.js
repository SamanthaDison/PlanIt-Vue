import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class TasksService {

    async getTasks(projectId) {
        const tasks = await dbContext.Tasks.find({ projectId: projectId }).populate('creator', 'name picture')
        return tasks
    }

    async createTask(newTask) {
        const project = await dbContext.Projects.findById(newTask.projectId)
        if (project.creatorId.toString() !== newTask.creatorId) {
            throw new Forbidden('not your project')
        }
        const createdTask = await dbContext.Tasks.create(newTask)
        await createdTask.populate('creator', 'name picture')
        return createdTask
    }


    async editTask(updated) {
        const original = await dbContext.Tasks.findById(updated.id).populate('creator', 'name picture')
        if (original.creator.id !== updated.creatorId) {
            throw new BadRequest('Unable to edit')
        }
        original.name = updated.name || original.name
        original.weight = updated.weight || original.weight
        original.sprintId = updated.sprintId || original.sprintId
        original.isComplete = updated.isComplete || original.isComplete

        await original.save()
        return original
    }

    async removeTask(taskId, creatorId) {
        const foundTask = await dbContext.Tasks.findById(taskId).populate('creator', 'name picture')
        if (foundTask.creator.id.toString() !== creatorId) {
            throw new BadRequest('Unable top delete sprint')
        }
        await foundTask.remove()
        return foundTask
    }

}

export const tasksService = new TasksService()