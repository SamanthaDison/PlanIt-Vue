import { api } from "./AxiosService";
import { AppState } from "../AppState"
import { logger } from "../utils/Logger";


class SprintsService {
    async getAll(projectId) {
        const res = await api.get(`api/projects/${projectId}/sprints`)
        AppState.sprints = res.data
    }
    async create(projectId, sprintId) {
        const res = await api.post(`api/projects/${projectId}/sprints/`, sprintId)
        AppState.sprints.unshift(res.data)
    }
    async getSprintById(projectId, sprintId) {
        const res = await api.get(`api/projects/${projectId}/sprints/${sprintId}`)
        logger.log(res.data)
        AppState.sprints = res.data
    }
    async remove(sprintId, projectId) {
        const res = await api.delete(`api/projects/${projectId}/sprints/${sprintId}`)
        logger.log(res.data)
        AppState.sprints.filter(s => s.sprintId !== sprintId)
        AppState.sprints = AppState.sprints
    }

}

export const sprintsService = new SprintsService()