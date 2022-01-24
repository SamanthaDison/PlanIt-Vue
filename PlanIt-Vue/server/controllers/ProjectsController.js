import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'

export class ProjectsController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
        // .post('', this.create)
        // .put('/:id', this.edit)
        // .delete('/:id', this.remove)

    }

    async getAll(req, res, next) {
        try {
            const projects = await projectsService.getAll()
            res.send(projects)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {

        } catch (error) {

        }
    }


}