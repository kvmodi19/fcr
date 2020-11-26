import { ServiceProvider } from './service-provider.model';
import { User } from './users.model';

export interface Product {
	name: string;
	description: string;
	price: number;
	// optional fields
	serviceProvider?: ServiceProvider;
	user?: User;
}
