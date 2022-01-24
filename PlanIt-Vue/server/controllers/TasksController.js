import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class TasksController extends BaseController {
    constructor() {
        super('api/projects/:projectId/tasks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
        // .get('', this.getAllTasks)
        // .create('', this.createTask)
        // .put('/:taskId', this.editTask)
        // .delete('/:taskId', this.deleteTask)

    }
}
