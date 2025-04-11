import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function ShortIdPage(props) {
	const prisma = new PrismaClient();
	const shortId = props.params.shortId;

	const data = await prisma.link.findUnique({
		where: {
			shortUrl: shortId,
		},
	});

	if (!data) {
		redirect("/"); // Redirige al home si no encuentra el short link
	}

	redirect(data.url); // Redirige al URL original si lo encuentra
}
