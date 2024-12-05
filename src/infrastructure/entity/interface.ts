// IUser
// ISession
// INote

import type { Note, Session, User } from "@prisma/client";

export type CreateUser = Omit<User, "id">;
export type UpdateUser = Partial<User>;

export type CreateNote = Omit<Note, "id">;
export type UpdateNote = Partial<Note>;

export interface IUser {
	getAll: () => Promise<User[]>;
	getOne: (id: string) => Promise<User | null>;
	create: (data: CreateUser) => Promise<User>;
	update: (id: string, data: UpdateUser) => Promise<User>;
	delete: (id: string) => Promise<void>;
}

export interface ISession {
	getOne: (sessionId: string) => Promise<Session | null>;
	create: (userId: string) => Promise<Session>;
	delete: (sessionId: string) => Promise<void>;
}

export interface INote {
	getAll: (userId: string) => Promise<Note[]>;
	getOne: (id: string) => Promise<Note | null>;
	create: (data: CreateNote) => Promise<Note>;
	update: (id: string, data: UpdateNote) => Promise<Note>;
	delete: (id: string) => Promise<void>;
}
