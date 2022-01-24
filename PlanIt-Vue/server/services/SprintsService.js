import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class SprintsService {

    async getSprints(query = {}) {
        const foundSprints = await dbContext.Sprints.find(query).populate('creator', 'name picture')
        return foundSprints
    }

    async createSprint(newSprint) {
        const createdSprint = await dbContext.Sprints.create(newSprint)
        return createdSprint
    }

    async remove(sprintId, creatorId) {
        const foundSprint = await dbContext.Sprints.findById(sprintId).populate('creator', 'name picture')
        if (foundSprint.creatorId.toString() !== creatorId) {
            throw new BadRequest('Unable top delete sprint')
        }
        await foundSprint.remove()
        return foundSprint
    }

}

export const sprintsService = new SprintsService()