import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class TasksService {
    async getAllTasks(projectId) {
        const res = await api.get(`api/projects/${projectId}/tasks/`)
        logger.log('getting tasks', res.data)
        AppState.tasks = res.data
    }
    // async getTaskId(projectId, taskId) {
    //     const res = await api.get(`api/projects/${projectId}/tasks/${taskId}`)
    //     AppState.tasks = res.data
    // }
    async createTask(projectId, taskId) {
        const res = await api.post(`api/projects/${projectId}/tasks`, taskId)
        AppState.tasks.unshift(res.data)
    }

    async removeTask(taskId, projectId) {
        const res = await api.delete(`api/projects/${projectId}/tasks/${taskId}`)
        AppState.tasks.filter(t => t.taskId !== taskId)
        AppState.tasks = AppState.tasks
    }

    async isComplete(task, projectId) {

        await api.put(`api/projects/${projectId}/tasks/${task.id}`, task)
    }


}

export const tasksService = new TasksService()