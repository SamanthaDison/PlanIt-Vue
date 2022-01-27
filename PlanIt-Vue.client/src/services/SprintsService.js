import { api } from "./AxiosService";
import { AppState } from "../AppState"
import { logger } from "../utils/Logger";


class SprintsService {
    async getAllSprints(projectId) {
        const res = await api.get(`api/projects/${projectId}/sprints`)
        logger.log(res.data, 'Sprints')
        AppState.sprints = res.data
    }
    async createSprint(projectId, sprintId) {
        const res = await api.post(`api/projects/${projectId}/sprints/`, sprintId)
        AppState.sprints.unshift(res.data)
    }
    // async getSprintById(projectId, sprintId) {
    //     const res = await api.get(`api/projects/${projectId}/sprints/${sprintId}`)
    //     logger.log(res.data)
    //     AppState.sprints = res.data
    // }
    async removeSprint(sprintId, projectId) {
        const res = await api.delete(`api/projects/${projectId}/sprints/${sprintId}`)
        logger.log(res.data)
        AppState.sprints.filter(s => s.sprintId !== sprintId)
        AppState.sprints = AppState.sprints
    }

}

export const sprintsService = new SprintsService()