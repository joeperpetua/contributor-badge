interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  contributions: number;
}

interface PartialPullRequest { 
  user: { login: string; };
  merged_at: string | null;
}

interface CallResponse<T> {
  data: T[];
  nextUrl: string | null;
}

const GITHUB_TOKEN = process.env.GH_TOKEN;
const HEADERS = {
  "X-GitHub-Api-Version": "2022-11-28", 
  "Authorization": `Bearer ${GITHUB_TOKEN}`,
  "Accept": "application/vnd.github+json"
}
const TWELVE_HOURS = 60 * 60 * 12;

const call = async <T>(url: string): Promise<CallResponse<T>> => {
  const res = await fetch(url, { headers: HEADERS, next: { revalidate: TWELVE_HOURS }, });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  const data: T[] = await res.json();
  const linkHeader = res.headers.get("link");
  let nextUrl: string | null = null;

  if (linkHeader) {
    const nextLink = linkHeader
      .split(",")
      .find((link) => link.includes('rel="next"'));
    if (nextLink) {
      nextUrl = nextLink.match(/<(.*?)>/)?.[1] || null;
    }
  }

  return { data, nextUrl };
}

const paginate = async <T>(baseUrl: string, query?: string): Promise<T[]> => {
  let allData: T[] = [];
  let nextUrl: string | null = `${baseUrl}?per_page=80&${query || ''}`;

  try {
    while (nextUrl) {
      const { data, nextUrl: newNextUrl }: CallResponse<T> = await call<T>(nextUrl);
      allData = allData.concat(data);
      nextUrl = newNextUrl;
    }
  } catch (error) {
    console.error("Error during pagination:", error);
    throw error;
  }

  return allData;
}

export const getRepoStars = async (owner: string, repo: string): Promise<number> => {
  const URL = `https://api.github.com/repos/${owner}/${repo}`;

  const res = await fetch(URL, { headers: HEADERS, next: { revalidate: TWELVE_HOURS } })
  const data = await res.json();
  const count = data.stargazers_count;

  return count ? count : 0;
}

export const getUserCommits = async (owner: string, repo: string, contributor: string): Promise<number> => {
  const URL = `https://api.github.com/repos/${owner}/${repo}/contributors`;

  const data = await paginate<GitHubUser>(URL);
  const user = data.find(user => user.login === contributor);

  return user ? user.contributions : 0;
}

export const getUserPullRequests = async (owner: string, repo: string, contributor: string): Promise<number> => {
  const URL = `https://api.github.com/repos/${owner}/${repo}/pulls`;

  const data = await paginate<PartialPullRequest>(URL, 'state=all');
  const pullRequests = data.filter(pr => pr.user.login === contributor && pr.merged_at);

  return pullRequests.length > 0 ? pullRequests.length : 0;
}