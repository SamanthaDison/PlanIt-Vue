import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesServices'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
    constructor() {
        super('api/projects/:projectId/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getNotes)
            .get('/:id', this.getById)
            .post('', this.create)
            .delete('/:id', this.remove)
    }

    async getNotes(req, res, next) {
        try {
            const query = req.query
            query.creatorId = req.userInfo.id
            const notes = await notesService.getNotes(query)
            return res.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const note = await notesService.getById(req.params.id)
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            const note = await notesService.create(req.body)
            return res.send(note)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const userId = req.userInfo.id
            const noteId = req.params.id
            await notesService.remove(noteId, userId)
            res.send('You have deleted this note')
        } catch (error) {
            next(error)
        }
    }
}