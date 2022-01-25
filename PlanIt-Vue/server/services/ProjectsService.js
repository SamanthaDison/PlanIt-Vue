import { dbContext } from "../db/DbContext";
import { BadRequest } from '../utils/Errors'

class ProjectsService {
    async getAllProjects(query = {}) {
        const foundProjects = await dbContext.Projects.find(query).populate('creator', 'name picture')
        return foundProjects
    }

    async getProjectById(id) {
        const foundProject = await dbContext.Projects.findById(id).populate('creator', 'name picture')
        if (!foundProject) {
            throw new BadRequest('Unable to find that project')
        }
        return foundProject
    }

    async createProject(newProject) {
        const createdProject = await dbContext.Projects.create(newProject)
        await createdProject.populate('creator', 'name picture')
        return createdProject
    }

    async removeProject(projectId, creatorId) {
        const foundProject = await this.getProjectById(projectId)
        if (foundProject.creatorId.toString() !== creatorId) {
            throw new BadRequest('Unable to delete project')
        }
        await foundProject.remove()
        return foundProject
    }
}

export const projectsService = new ProjectsService()