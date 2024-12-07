import { Prisma, type PrismaClient } from "@prisma/client";
import type { ISession } from "../entity/interface";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/types";
import { DBError } from "../entity/errors";

@injectable()
export class SessionRepository implements ISession {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async getOne(sessionId: string) {
		try {
			const session = await this.prisma.session.findUnique({
				where: {
					id: sessionId,
				},
			});

			if (!session) {
				throw new DBError("Something went wrong while doing DB Operation");
			}

			return session;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}
	async create(userId: string) {
		try {
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
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resources from DB");
			}

			throw new DBError("Something went wrong while doing DB Operation");
		}
	}

	async delete(sessionId: string) {
		try {
			await this.prisma.session.delete({
				where: {
					id: sessionId,
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
