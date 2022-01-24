import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'

export class ProjectsController extends BaseController {
    constructor() {
        super('api/projects')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getAllProjects)
            .get('/:id', this.getProjectById)
            .post('', this.createProject)
            .delete('/:id', this.removeProject)
    }

    async getAllProjects(req, res, next) {
        try {
            const projects = await projectsService.getAllProjects({ creatorId: req.userInfo.id })
            res.send(projects)
        } catch (error) {
            next(error)
        }
    }

    async getProjectById(req, res, next) {
        try {
            const foundProject = await projectsService.getProjectById(req.params.id)
            res.send(foundProject)
        } catch (error) {
            next(error)
        }
    }

    async createProject(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const createdProject = await projectsService.createProject(req.body)
            res.send(createdProject)
        } catch (error) {
            next(error)
        }
    }

    async removeProject(req, res, next) {
        try {
            const deletedProject = await projectsService.removeProject(req.params.id, req.userInfo.id)
            res.send(deletedProject)
        } catch (error) {
            next(error)
        }
    }

}

