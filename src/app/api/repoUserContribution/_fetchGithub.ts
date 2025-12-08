import { ONE_YEAR_MS } from "@/app/api/repoUserContribution/_constants";
import {
	GQL_START_COUNT,
	GQL_USER_COMMITS,
	GQL_USER_CREATION_DATE,
	GQL_USER_PRS
} from "./_queries";
import {
	GqlResponse,
	GqlStarCount,
	GqlUserCommits,
	GqlUserPRs,
	GqlUserCreationDate,
	AnyGqlVar,
	Connection,
	UsePRNode,
} from "./_types";

const CACHE_SECONDS = parseInt(process.env.CACHE_SECONDS || "43200"); // 12 hours default if cache not specified
const GQL_API_URL = "https://api.github.com/graphql";
const HEADERS = {
	"X-GitHub-Api-Version": "2022-11-28",
	Authorization: `Bearer ${process.env.GH_TOKEN}`,
	"Content-Type": "application/json",
	Accept: "application/vnd.github+json",
};

const fetchGraphQL = async <T>(
	query: string,
	variables: AnyGqlVar
): Promise<GqlResponse<T>> => {
	try {
		const res = await fetch(GQL_API_URL, {
			method: "POST",
			headers: HEADERS,
			next: { revalidate: CACHE_SECONDS },
			body: JSON.stringify({
				query: query,
				variables: variables,
			}),
		});

		if (!res.ok) {
			const resText = await res.text();
			throw new Error(`API status: ${res.status} | ${resText}`);
		}

		const data: GqlResponse<T> = await res.json();
		if (data.errors) {
			throw new Error(`${data.errors[0].type} | ${data.errors[0].message}`);
		}

		return data;
	} catch (err) {
		console.error("[fetchGraphQL] Failed to fetch Github API: ", err);
		throw err;
	}
};

export const fetchPaginatedGraphQL = async <ResponseT, NodeT>(
	query: string,
	variables: AnyGqlVar,
	extractConnection: (data: ResponseT) => Connection<NodeT> // Need this to know where the pagination data is in the response schema
): Promise<NodeT[]> => {
	let allNodes: NodeT[] = [];
	let hasNextPage = true;
	let cursor: string | null = null;

	while (hasNextPage) {
		const res = await fetchGraphQL<ResponseT>(query, {
			...variables,
			after: cursor,
		});
		const { nodes, pageInfo } = extractConnection(res.data);
		allNodes.push(...nodes);

		if (pageInfo.hasNextPage && pageInfo.endCursor) {
			cursor = pageInfo.endCursor;
		} else {
			hasNextPage = false;
		}
	}

	return allNodes;
};

export const getRepoStars = async (
	owner: string,
	repo: string
): Promise<{ owner: string; repo: string; stars: number }> => {
	const res = await fetchGraphQL<GqlStarCount>(GQL_START_COUNT, {
		owner,
		repo,
	});

	return {
		owner: res.data.repository.owner.login,
		repo: res.data.repository.name,
		stars: res.data.repository.stargazerCount || 0,
	};
};

const getUserOneYearRangesSinceCreation = (userCreationDate: string) => {
	const currentDate = new Date().getTime();
	let userCreationDateMS = new Date(userCreationDate).getTime();
	const oneYearRanges = [];
	while (userCreationDateMS < currentDate) {
		const to =
			userCreationDateMS + ONE_YEAR_MS > currentDate
				? currentDate
				: userCreationDateMS + ONE_YEAR_MS;

		oneYearRanges.push({
			from: new Date(userCreationDateMS).toISOString(),
			to: new Date(to).toISOString(),
		});

		userCreationDateMS = to + 1; // Offset 1ms to not overlap with next iteration
	}

	return oneYearRanges;
};

export const getUserCommits = async (
	owner: string,
	repo: string,
	user: string
): Promise<number> => {
	const userCreationDateRes = await fetchGraphQL<GqlUserCreationDate>(
		GQL_USER_CREATION_DATE,
		{ user }
	);
	const oneYearRanges = getUserOneYearRangesSinceCreation(
		userCreationDateRes.data.user.createdAt
	);

	const res = await Promise.all(
		oneYearRanges.map((range) =>
			fetchGraphQL<GqlUserCommits>(GQL_USER_COMMITS, {
				user,
				from: range.from,
				to: range.to,
			})
		)
	);

	return res.reduce((total, commitRes) => {
		const commitsByRepo =
			commitRes.data.user.contributionsCollection
				.commitContributionsByRepository;
		const commitsToRepo = commitsByRepo.find(
			(contrib) =>
				contrib.repository.nameWithOwner.toLowerCase() ===
				`${owner}/${repo}`.toLowerCase()
		);
		return total + (commitsToRepo ? commitsToRepo.contributions.totalCount : 0);
	}, 0);
};

export const getUserPullRequests = async (
	owner: string,
	repo: string,
	user: string
): Promise<number> => {
	const PRsByRepo = await fetchPaginatedGraphQL<GqlUserPRs, UsePRNode>(
		GQL_USER_PRS,
		{ user },
		(data) => data.user.pullRequests
	);

	const PRsToRepo = PRsByRepo.filter(
		(contrib) =>
			contrib.repository.nameWithOwner.toLowerCase() ===
			`${owner}/${repo}`.toLowerCase()
	);
	return PRsToRepo.length;
};
