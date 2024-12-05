import { TYPES } from "./../../infrastructure/entity/types";
import type { NoteRepository } from "../../infrastructure/db/noteRepo";
import type {
	CreateNote,
	UpdateNote,
} from "../../infrastructure/entity/interface";
import "reflect-metadata";
import { injectable, inject } from "inversify";

@injectable()
export class NoteServices {
	private noteRepo: NoteRepository;

	constructor(@inject(TYPES.noteRepo) noteRepo: NoteRepository) {
		this.noteRepo = noteRepo;
	}

	async getAll(userId: string) {
		const notes = await this.noteRepo.getAll(userId);
		return notes;
	}

	async getOne(noteId: string) {
		const note = await this.noteRepo.getOne(noteId);
		return note;
	}

	async create(data: CreateNote) {
		const newNote = await this.noteRepo.create(data);
		return newNote;
	}

	async update(noteId: string, data: UpdateNote) {
		const updatedNote = await this.noteRepo.update(noteId, data);
		return updatedNote;
	}

	async delete(noteId: string) {
		await this.noteRepo.delete(noteId);
	}
}
