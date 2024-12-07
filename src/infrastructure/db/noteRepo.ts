import { Prisma, type PrismaClient } from "@prisma/client";
import type { CreateNote, INote, UpdateNote } from "../entity/interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/types";
import { DBError } from "../entity/errors";

@injectable()
export class NoteRepository implements INote {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getAll(userId: string) {
		try {
			const notes = await this.prisma.note.findMany({
				where: {
					authorId: userId,
				},
			});

			return notes;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}

	async getOne(noteId: string) {
		try {
			const note = await this.prisma.note.findUnique({
				where: {
					id: noteId,
				},
			});

			if (!note) {
				throw new DBError("Something went wrong while doing DB Operation");
			}

			return note;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}

	async create(data: CreateNote) {
		try {
			const newNote = await this.prisma.note.create({
				data,
			});

			return newNote;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}

	async update(noteId: string, data: UpdateNote) {
		try {
			const updatedNote = await this.prisma.note.update({
				where: {
					id: noteId,
				},
				data,
			});

			return updatedNote;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}

	async delete(noteId: string) {
		try {
			await this.prisma.note.delete({
				where: {
					id: noteId,
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}
}
