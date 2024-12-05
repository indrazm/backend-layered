import type { User } from "@prisma/client";

export class UserDTO {
	public id: string;
	public name: string;
	public email: string;
	public avatar: string | null;

	constructor(data: Pick<User, "id" | "name" | "email" | "avatar">) {
		this.id = data.id;
		this.name = data.name;
		this.email = data.email;
		this.avatar = data.avatar;
	}

	get() {
		return {
			name: this.name,
			email: this.email,
			avatar: this.avatar,
		};
	}
}
