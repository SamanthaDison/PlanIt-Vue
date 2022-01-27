import { AppState } from "../AppState";
import { api } from "./AxiosService";
import { logger } from "../utils/Logger";

class ProjectsService {

    async getAllProjects() {
        const res = await api.get('api/projects')
        logger.log('getting ALL posts', res.data)
        AppState.projects = res.data
    }

    async getProjectsById(projectId) {
        const res = await api.get(`api/projects/${projectId}`)
        logger.log('getting post by id', res.data)
        AppState.activeProject = res.data
        // ^^This function will be called by onMounted in the [active]project page
    }
    async createProject(newProject) {
        const res = await api.post('api/projects', newProject)
        logger.log('creating new post', res.data)
        AppState.projects.unshift(newProject)
    }

    async removeProject(projectId) {
        const res = await api.delete(`api/projects/${projectId}`)
        logger.log('deleting this post', res.data)
        AppState.projects = AppState.projects.filter(p => p.id !== projectId)
    }
}


export const projectsService = new ProjectsService()