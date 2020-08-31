export interface ServiceProvider {
	eCardName: string;
	service: string;
	user: string;
	description: string;
	address: Address;
}

export interface Address {
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	country: string;
	pinCode: string;
}

