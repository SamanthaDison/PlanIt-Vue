import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class SprintsService {

    // async getSprints(query = {}) {
    //     const foundSprints = await dbContext.Sprints.find(query).populate('creator', 'name picture')
    //     return foundSprints
    // }

    async getSprints(projectId) {
        const sprints = await dbContext.Sprints.find({ projectId: projectId }).populate('creator', 'name picture')
        return sprints
    }
    async createSprint(newSprint) {
        const project = await dbContext.Projects.findById(newSprint.projectId)
        if (project.creatorId.toString() !== newSprint.creatorId) {
            throw new Forbidden('not your project')
        }
        const createdSprint = await dbContext.Sprints.create(newSprint)
        await createdSprint.populate('creator', 'name picture')
        return createdSprint
    }

    async removeSprint(sprintId, creatorId) {
        const foundSprint = await dbContext.Sprints.findById(sprintId).populate('creator', 'name picture')
        if (foundSprint.creatorId.toString() !== creatorId) {
            throw new BadRequest('Unable top delete sprint')
        }
        await foundSprint.remove()
        return foundSprint
    }

}

export const sprintsService = new SprintsService()