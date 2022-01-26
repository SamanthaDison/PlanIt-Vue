import { AppState } from "../AppState";
import { api } from "./AxiosService";
import { logger } from "../utils/Logger";

class ProjectsService {

    async getAllProjects() {
        const res = await api.get('api/projects')
        logger.log('getting ALL posts', res.data)
    }
}

export const projectsService = new ProjectsService()