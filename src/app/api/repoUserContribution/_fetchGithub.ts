import { GQL_START_COUNT, GQL_USER_COMMITS, GQL_USER_PRS } from "./_queries";
import { GqlStartCountVar, GqlContributionVar, GqlResponse, GqlStarCount, GqlUserCommits, GqlUserPRs } from "./_types";

const CACHE_SECONDS = parseInt(process.env.CACHE_SECONDS || "43200") ; // 12 hours default if cache not specified
console.log("Running with CACHE", CACHE_SECONDS);

const GQL_API_URL = 'https://api.github.com/graphql';
const HEADERS = {
  "X-GitHub-Api-Version": "2022-11-28",
  "Authorization": `Bearer ${process.env.GH_TOKEN}`,
  "Content-Type": "application/json",
  "Accept": "application/vnd.github+json"
}

const fetchGraphQL = async <T>(query: string, variables: GqlStartCountVar | GqlContributionVar): Promise<GqlResponse<T>> => {
  try {
    const res = await fetch(
      GQL_API_URL,
      { 
        method: 'POST',
        headers: HEADERS,
        next: { revalidate: CACHE_SECONDS },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }), 
      }
    );
  
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
    console.error('[fetchGraphQL] Failed to fetch Github API: ', err);
    throw err;
  }
}

export const getRepoStars = async (owner: string, repo: string): Promise<{owner: string, repo: string, stars: number}> => {
  const res = await fetchGraphQL<GqlStarCount>(GQL_START_COUNT, { owner, repo});

  return {
    owner: res.data.repository.owner.login,
    repo: res.data.repository.name,
    stars: res.data.repository.stargazerCount || 0
  };
}

export const getUserCommits = async (owner: string, repo: string, user: string): Promise<number> => {
  const res = await fetchGraphQL<GqlUserCommits>(GQL_USER_COMMITS, { user });
  const commitsByRepo = res.data.user.contributionsCollection.commitContributionsByRepository;
  const commitsToRepo = commitsByRepo.find(contrib => contrib.repository.nameWithOwner.toLowerCase() === `${owner}/${repo}`.toLowerCase());
  return commitsToRepo ? commitsToRepo.contributions.totalCount : 0;
}

export const getUserPullRequests = async (owner: string, repo: string, user: string): Promise<number> => {
  const res = await fetchGraphQL<GqlUserPRs>(GQL_USER_PRS, { user });
  const PRsByRepo = res.data.user.contributionsCollection.pullRequestContributionsByRepository;
  const PRsToRepo = PRsByRepo.find(contrib => contrib.repository.nameWithOwner.toLowerCase() === `${owner}/${repo}`.toLowerCase());
  return PRsToRepo ? PRsToRepo.contributions.totalCount : 0;
}