"use client";

import { useState, useRef } from "react";

export default function Home() {
	const inputRef = useRef();
	const [shortURL, setShortURL] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = inputRef.current.value;

		fetch("/api/shortener", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url }),
		})
			.then((res) => res.json())
			.then((data) => setShortURL(data.shortUrl));
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<ul className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
					<li className="mb-2 ">Acorta tus URL aquí</li>
				</ul>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<form onSubmit={handleSubmit}>
						<input
							ref={inputRef}
							type="text"
							placeholder="URL"
							className="w-full max-w-[500px] p-4 rounded-lg"
						/>
						<button className="w-full max-w-[500px] p-4 rounded-lg">
							Acorta
						</button>
						<span className="w-full max-w-[500px] p-4 rounded-lg">
							{shortURL}
						</span>
					</form>
				</div>
			</main>
		</div>
	);
}
