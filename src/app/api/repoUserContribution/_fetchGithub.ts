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

const TWELVE_HOURS = 60 * 60 * 12;

const paginate = async (URL: string, query?: string) => {
  const call = async (page: number) => {
    URL += `?per_page=100&page=${page}&${query || ''}`;

    // console.log('[fetchGithub] [paginate] [call] Fetching', URL);
    const res = await fetch(URL, {
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
      next: { revalidate: TWELVE_HOURS } 
    });

    return await res.json();
  }

  let dataAll: any[] = [];
  let page = 1;
  while(true) {
    const data = await call(page);
    if (data?.length === 0) break;
    dataAll = dataAll.concat(data);
    page++;
  }

  return dataAll;
}

export const getRepoStars = async (owner: string, repo: string): Promise<number> => {
  const URL = `https://api.github.com/repos/${owner}/${repo}`;

  const res = await fetch(URL, { next: { revalidate: TWELVE_HOURS } })
  const data = await res.json();
  const count = data.stargazers_count;

  return count ? count : 0;
}

export const getUserCommits = async (owner: string, repo: string, contributor: string): Promise<number> => {
  const URL = `https://api.github.com/repos/${owner}/${repo}/contributors`;

  const data: GitHubUser[] = await paginate(URL);
  const user = data.find(user => user.login === contributor);

  return user ? user.contributions : 0;
}

export const getUserPullRequests = async (owner: string, repo: string, contributor: string): Promise<number> => {
  const URL = `https://api.github.com/repos/${owner}/${repo}/pulls`;

  const data: PartialPullRequest[] = await paginate(URL, 'state=all');
  const pullRequests = data.filter(pr => pr.user.login === contributor && pr.merged_at);

  return pullRequests.length > 0 ? pullRequests.length : 0;
}