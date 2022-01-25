import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { sprintsService } from '../services/SprintsService'
export class SprintsController extends BaseController {
    constructor() {
        super('api/projects/:projectId/sprints')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getSprints)
            .post('', this.createSprint)
            .delete('/:sprintId', this.removeSprint)
    }

    async getSprints(req, res, next) {
        try {
            const sprints = await sprintsService.getSprints(req.params.id)
            res.send(sprints)
        } catch (error) {
            next(error)
        }
    }

    async createSprint(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const createdSprint = await sprintsService.createSprint(req.body)
            res.send(createdSprint)
        } catch (error) {
            next(error)
        }
    }

    async removeSprint(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const deletedSprint = await sprintsService.removeSprint(req.params.id, req.userInfo.id)
            res.send(deletedSprint)
        } catch (error) {
            next(error)
        }
    }


}