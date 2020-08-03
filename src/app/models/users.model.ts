export interface User {
	email?: string;
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
	'user' = 1, 'shop-owner' = 2
}
