import { dbContext } from "../db/DbContext";

class ProjectsService {
    async getAll() {
        const foundProjects = await dbContext.Projects.find().populate('creator')
        return foundProjects
    }

}

export const projectsService = new ProjectsService()