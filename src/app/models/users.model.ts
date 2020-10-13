export interface User {
	email: string;
	uid: string;
	address?: string;
	age?: string;
	gender?: string;
	mobile?: string;
	name?: string;
	password?: string;
	profile?: string;
	profession?: Professions;
	cardName?: string;
	cardAddress?: string;
}

export enum Professions {
	'user' = 1, 'service-provider' = 2
}
