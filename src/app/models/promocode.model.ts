import { ServiceProvider } from './service-provider.model';
import { User } from './users.model';

export interface PromoCode {
	name: string;
	description: string;
	// optional fields
	serviceProvider?: ServiceProvider;
	user?: User;
}
