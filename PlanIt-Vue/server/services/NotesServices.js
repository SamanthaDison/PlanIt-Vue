import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
    async getNotes(query = {}) {
        return await dbContext.Notes.find(query).populate('creator', 'name')
    }

    async getById(id) {
        const note = await dbContext.Notes.findById(id).populate('creator', 'name')
        if (!note) {
            throw new BadRequest('Invalid Id')
        }
        return note
    }

    async create(body) {
        const newNote = await dbContext.Notes.create(body)
        return newNote.populate('creator', 'name')
    }

    async remove(noteId, userId) {
        const note = await this.getById(noteId)
        if (note.creatorId.toString() !== userId) {
            throw new Forbidden('You may not delete this note')
        }
        await dbContext.Notes.findByIdAndDelete(noteId)
    }

    async edit(body) {
        const note = await this.getById(body.id)
        if (note.creatorId.toString() !== body.creatorId) {
            throw new Forbidden('You may not edit this note')
        }
        const updateNote = dbContext.Notes.findOneAndUpdate({ _id: body.id }, body, { new: true })
        return await updateNote
    }
}

export const notesService = new NotesService()
