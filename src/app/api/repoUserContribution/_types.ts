type GqlPaginationVars = {
	after?: string | null;
	first?: number;
};

// Update your function signature to accept these extra vars
export type AnyGqlVar = (GqlStartCountVar | GqlContributionVar) &
	GqlPaginationVars;

export interface Connection<T> {
	nodes: T[];
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string | null;
	};
}

export interface GqlStartCountVar {
	owner: string;
	repo: string;
}

export interface GqlContributionVar {
	user: string;
	from?: string;
	to?: string;
}

export interface ContributionByRepo {
	repository: { nameWithOwner: string };
	contributions: { totalCount: number };
}

export interface GqlStarCount {
	repository: {
		owner: { login: string };
		name: string;
		stargazerCount: number;
	};
}

export interface GqlUserCreationDate {
	user: {
		createdAt: string;
	};
}

export interface GqlUserCommits {
	user: {
		contributionsCollection: {
			commitContributionsByRepository: ContributionByRepo[];
		};
	};
}

export interface UsePRNode {
	state: "MERGED" | "OPEN" | "CLOSED";
	repository: { nameWithOwner: string };
}

export interface GqlUserPRs {
	user: {
		pullRequests: {
			nodes: UsePRNode[];
			pageInfo: {
				hasNextPage: boolean;
				endCursor: string;
			};
		};
	};
}

export interface GqlError {
	type: string;
	path: string[];
	locations: { line: number; column: number }[];
	message: string;
}

export interface GqlResponse<T> {
	data: T;
	errors?: GqlError[];
}
