import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
export class SprintsController extends BaseController {
    constructor() {
        super('api/projects/:projectId/sprints')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
        // .get('', this.getAllSprints)
        // .post('', this.createSprint)
        // .delete('/:sprintId', this.removeSprint)
    }
}