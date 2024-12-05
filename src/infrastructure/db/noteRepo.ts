import type { Note, PrismaClient } from "@prisma/client";
import type { CreateNote, INote, UpdateNote } from "../entity/interface";

export class NoteRepository implements INote {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getAll(userId: string) {
		// get all notes based on userId
		const notes = await this.prisma.note.findMany({
			where: {
				authorId: userId,
			},
		});

		return notes;
	}

	async getOne(noteId: string) {
		const note = await this.prisma.note.findUnique({
			where: {
				id: noteId,
			},
		});

		return note;
	}

	async create(data: CreateNote) {
		const newNote = await this.prisma.note.create({
			data,
		});

		return newNote;
	}

	async update(noteId: string, data: UpdateNote) {
		const updatedNote = await this.prisma.note.update({
			where: {
				id: noteId,
			},
			data,
		});

		return updatedNote;
	}

	async delete(noteId: string) {
		await this.prisma.note.delete({
			where: {
				id: noteId,
			},
		});
	}
}
