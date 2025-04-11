// app/api/shortener/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
	const body = await request.json();
	const { url } = body;
	const shortUrl = Math.random().toString(36).substring(2, 5);

	try {
		const data = await prisma.link.create({
			data: { url, shortUrl },
		});

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
