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


    async editTask(taskId, updatedTask) {
        const taskToEdit = await dbContext.Tasks.findById(taskId).populate('creator', 'name picture')
        if (taskToEdit.creatorId.toString() !== updatedTask.creatorId) {
            throw new BadRequest('Unable to edit')
        }
        taskToEdit.name = updatedTask.name || taskToEdit.name
        taskToEdit.weight = updatedTask.weight || taskToEdit.weight
        taskToEdit.sprintId = updatedTask.sprintId || taskToEdit.sprintId
        taskToEdit.isComplete = updatedTask.isComplete || taskToEdit.isComplete

        await taskToEdit.save()
        return taskToEdit
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