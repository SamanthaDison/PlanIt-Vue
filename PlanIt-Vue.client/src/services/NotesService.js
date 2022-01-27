import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class NotesService {

    async getAll(projectId) {
        const res = await api.get(`api/projects/${projectId}/notes`)
        AppState.notes = res.data
    }

    async create(projectId, noteId) {
        const res = await api.post(`api/projects/${projectId}/notes`, noteId)
        AppState.notes.unshift(res.data)
    }


    async remove(noteId, projectId) {
        const res = await api.delete(`api/projects/${projectId}/notes/${noteId}`)
        AppState.notes.filter(n => n.noteId !== noteId)
        AppState.notes = AppState.notes
    }

}
export const notesService = new NotesService()