export interface GqlStartCountVar {
  owner: string;
  repo: string;
}

export interface GqlContributionVar {
  user: string;
}

export interface ContributionByRepo {
  repository: { nameWithOwner: string };
  contributions: { totalCount: number };
}

export interface GqlStarCount {
  repository: {
    owner: { login: string },
    name: string, 
    stargazerCount: number,
  };
}

export interface GqlUserCommits {
  user: {
    contributionsCollection: {
      commitContributionsByRepository: ContributionByRepo[]
    }
  }
}

export interface GqlUserPRs {
  user: {
    contributionsCollection: {
      pullRequestContributionsByRepository: ContributionByRepo[]
    }
  }
}

export interface GqlError {
  type: string;
  path: string[];
  locations: { line: number, column: number }[];
  message: string;
}

export interface GqlResponse<T> {
  data: T;
  errors?: GqlError[];
}