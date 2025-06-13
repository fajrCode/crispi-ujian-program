import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function checkDatabaseConnection() {
	try {
		await db.$connect();
		console.log('Database connection successful.');
	} catch (error) {
		console.error('Database connection failed:', error);
		process.exit(1);
	}
}

checkDatabaseConnection();

export default db;
