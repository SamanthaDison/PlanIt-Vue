import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
    constructor() {
        super('api/projects/:projectId/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
        // .get('', getAllNotes)
        // .post('', this.createNote)
        // .delete('/:noteId', this.deleteNote)

    }


}