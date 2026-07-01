import {
	initializeApp,
	getApps,
	cert,
	type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore;

try {
	const projectId = process.env.FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

	if (
		projectId &&
		clientEmail &&
		privateKey &&
		projectId !== "your-project-id"
	) {
		const serviceAccount: ServiceAccount = {
			projectId,
			clientEmail,
			privateKey,
		};

		if (!getApps().length) {
			initializeApp({
				credential: cert(serviceAccount),
			});
		}

		db = getFirestore();
	} else {
		// Create a proxy that returns null for all operations when Firebase is not configured
		db = new Proxy({} as Firestore, {
			get(_target, prop) {
				if (prop === "collection") {
					return () =>
						new Proxy(
							{},
							{
								get(_t, p) {
									if (p === "doc") {
										return () => ({
											get: async () => ({ exists: false, data: () => null }),
											set: async () => {},
											update: async () => {},
										});
									}
									if (p === "where") {
										const chainable = new Proxy(
											{},
											{
												get(_t2, p2) {
													if (
														p2 === "where" ||
														p2 === "orderBy" ||
														p2 === "limit" ||
														p2 === "offset"
													) {
														return () => chainable;
													}
													if (p2 === "get") {
														return async () => ({ docs: [] });
													}
													if (p2 === "count") {
														return () => ({
															get: async () => ({
																data: () => ({ count: 0 }),
															}),
														});
													}
													return undefined;
												},
											}
										);
										return () => chainable;
									}
									if (
										p === "orderBy" ||
										p === "limit" ||
										p === "offset"
									) {
										const chainable = new Proxy(
											{},
											{
												get(_t2, p2) {
													if (
														p2 === "where" ||
														p2 === "orderBy" ||
														p2 === "limit" ||
														p2 === "offset"
													) {
														return () => chainable;
													}
													if (p2 === "get") {
														return async () => ({ docs: [] });
													}
													return undefined;
												},
											}
										);
										return () => chainable;
									}
									if (p === "add") {
										return async () => ({});
									}
									if (p === "get") {
										return async () => ({ docs: [] });
									}
									return undefined;
								},
							}
						);
				}
				return undefined;
			},
		});
		console.warn(
			"⚠️  Firebase not configured. Using fallback data. Set FIREBASE_* env vars in .env.local"
		);
	}
} catch (error) {
	console.error("Firebase initialization error:", error);
	// Same proxy fallback
	db = new Proxy({} as Firestore, {
		get(_target, prop) {
			if (prop === "collection") {
				return () =>
					new Proxy(
						{},
						{
							get(_t, p) {
								if (p === "doc") {
									return () => ({
										get: async () => ({ exists: false, data: () => null }),
										set: async () => {},
										update: async () => {},
									});
								}
								if (p === "where" || p === "orderBy" || p === "limit") {
									const chainable = new Proxy(
										{},
										{
											get(_t2, p2) {
												if (
													p2 === "where" ||
													p2 === "orderBy" ||
													p2 === "limit" ||
													p2 === "offset"
												) {
													return () => chainable;
												}
												if (p2 === "get") {
													return async () => ({ docs: [] });
												}
												if (p2 === "count") {
													return () => ({
														get: async () => ({
															data: () => ({ count: 0 }),
														}),
													});
												}
												return undefined;
											},
										}
									);
									return () => chainable;
								}
								if (p === "add") {
									return async () => ({});
								}
								return undefined;
							},
						}
					);
			}
			return undefined;
		},
	});
}

export { db };
