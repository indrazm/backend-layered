import type { PrismaClient } from "@prisma/client";
import type { ISession } from "../entity/interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/types";

@injectable()
export class SessionRepository implements ISession {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getOne(sessionId: string) {
		const session = await this.prisma.session.findUnique({
			where: {
				id: sessionId,
			},
		});

		return session;
	}
	async create(userId: string) {
		const session = await this.prisma.session.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return session;
	}

	async delete(sessionId: string) {
		await this.prisma.session.delete({
			where: {
				id: sessionId,
			},
		});
	}
}
