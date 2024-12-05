// IUser
// ISession
// INote

import type { Note, Session, User } from "@prisma/client";

export interface IUser {
	getAll: () => Promise<User | null>;
	getOne: (id: string) => Promise<User | null>;
	create: (data: Omit<User, "id">) => Promise<User>;
	update: (id: string, data: Partial<User>) => Promise<User>;
	delete: (id: string) => Promise<void>;
}

export interface ISession {
	getOne: (sessionId: string) => Promise<Session | null>;
	create: (userId: string) => Promise<Session>;
	delete: (sessionId: string) => Promise<void>;
}

export interface INote {
	getAll: () => Promise<Note | null>;
	getOne: (id: string) => Promise<Note | null>;
	create: (data: Omit<Note, "id">) => Promise<Note>;
	update: (id: string, data: Partial<Note>) => Promise<Note>;
	delete: (id: string) => Promise<void>;
}
