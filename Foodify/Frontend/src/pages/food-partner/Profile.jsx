import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const fallbackPartner = {
	name: "Neighborhood Kitchen",
	email: "",
};

function VideoTile({ item }) {
	const videoRef = useRef(null);

	const handlePointerEnter = () => {
		videoRef.current?.play().catch(() => undefined);
	};

	const handlePointerLeave = () => {
		const video = videoRef.current;
		if (video) {
			video.pause();
			video.currentTime = 0;
		}
	};

	return (
		<article
			className="group relative aspect-[3/4] overflow-hidden bg-[var(--primary)]"
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
		>
			<video
				ref={videoRef}
				src={item.video}
				muted
				loop
				playsInline
				preload="metadata"
				className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
				aria-label={`${item.name} food video`}
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10">
				<p className="truncate text-xs font-medium text-white">{item.name}</p>
			</div>
		</article>
	);
}

export default function Profile() {
	const { partnerId } = useParams();
	const [foods, setFoods] = useState([]);
	const [partner, setPartner] = useState(fallbackPartner);

	useEffect(() => {
		const foodRequest = axios.get("http://localhost:3000/api/food", {
			withCredentials: true,
		});
		const partnerRequest = axios.get(
			`http://localhost:3000/api/foodpartner/${partnerId}`,
			{ withCredentials: true },
		);

		Promise.all([foodRequest, partnerRequest])
			.then(([foodResponse, partnerResponse]) => {
				const allFoods = foodResponse.data.foodItems ?? [];
				const partnerFoods = allFoods.filter((item) => item.foodpartner === partnerId);

				setFoods(partnerFoods);
				setPartner({
					name: partnerResponse.data.foodPartner?.name || fallbackPartner.name,
					email: partnerResponse.data.foodPartner?.email || fallbackPartner.email,
				});
			})
			.catch((error) => {
				console.error("Failed to fetch partner profile:", error);
			});
	}, [partnerId]);

	return (
		<div className="min-h-[100dvh] bg-[var(--bg-canvas)] px-3 py-4 text-[var(--text-main)] sm:px-6">
			<main className="mx-auto w-full max-w-md overflow-hidden rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-subtle)]">
				<header className="relative px-5 pb-5 pt-6 sm:px-6">
					<div className="mb-5 flex items-start justify-between gap-4">
						<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[var(--partner-primary)] text-2xl font-semibold text-white ring-4 ring-[var(--bg-muted)]">
							{partner.name.charAt(0).toUpperCase()}
						</div>
						<div className="min-w-0 flex-1 pt-1">
							<h1 className="truncate text-lg font-semibold tracking-tight">{partner.name}</h1>
							<p className="mt-1 truncate text-sm text-[var(--text-muted)]">{partner.email}</p>
						</div>
						<Link
							to="/home"
							aria-label="Back to home"
							className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
						>
							Home
						</Link>
					</div>

					<div className="grid grid-cols-2 border-t border-[var(--border-subtle)] pt-4 text-center">
						<div>
							<p className="text-2xl font-semibold tracking-tight">{foods.length}</p>
							<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
								Total meals
							</p>
						</div>
						<div>
							<p className="text-2xl font-semibold tracking-tight">15K</p>
							<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
								Customers served
							</p>
						</div>
					</div>
				</header>

				{foods.length > 0 ? (
					<section className="grid grid-cols-3 gap-px border-t border-[var(--border-subtle)] bg-[var(--border-subtle)]">
						{foods.map((item) => (
							<VideoTile key={item._id} item={item} />
						))}
					</section>
				) : (
					<div className="border-t border-[var(--border-subtle)] px-6 py-14 text-center">
						<p className="text-sm font-medium">No meals published yet</p>
						<p className="mt-1 text-xs text-[var(--text-muted)]">
							New kitchen reels will appear here.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
