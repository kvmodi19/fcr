export interface User {
	email: string;

	// optional fields
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
	'employee' = 1, 'self-employee' = 2
}
