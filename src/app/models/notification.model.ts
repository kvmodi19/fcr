import { User } from './users.model';

export interface Notification {
	title: string;
	description: string;
	user: User;
	createdAt: string;
}
