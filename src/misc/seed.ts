import { db } from '@/server/db';
import { users } from '@/server/schema';

db.insert(users).values([
	{
		email: 'john.doe@gmail.com',
		handle: 'john'
	}
]);
