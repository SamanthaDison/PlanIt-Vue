import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { tasksService } from "../services/TasksService";

export class TasksController extends BaseController {
    constructor() {
        super('api/projects/:projectId/tasks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getTasks)
            .post('', this.createTask)
            .put('/:taskId', this.editTask)
            .delete('/:id', this.removeTask)


    }

    async getTasks(req, res, next) {
        try {
            const tasks = await tasksService.getTasks(req.params.projectId)
            return res.send(tasks)
        } catch (error) {
            next(error)
        }
    }

    async createTask(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const createdTask = await tasksService.createTask(req.body)
            return res.send(createdTask)
        } catch (error) {
            next(error)
        }
    }

    async editTask(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const updatedTask = await tasksService.editTask(req.params.taskId, req.body)
            return res.send(updatedTask)
        } catch (error) {
            next(error)
        }
    }

    async removeTask(req, res, next) {
        try {
            await tasksService.removeTask(req.params.id, req.userInfo.id)
            return res.send('deleted task')

        } catch (error) {
            next(error)
        }
    }

}


