// Also get repo owner and name to display the string in the original case
export const GQL_START_COUNT = `
query($owner:String!, $repo:String!) {
  repository(owner: $owner name: $repo){
    owner { login }
    name
    stargazerCount
  }
}
`;

export const GQL_USER_CREATION_DATE = `
query($user:String!) {
  user(login: $user) {
    createdAt
  }
}
`;

export const GQL_USER_COMMITS = `
query($user:String!, $from: DateTime!, $to: DateTime!) {
  user(login: $user) {
    contributionsCollection (from: $from, to: $to) {
      commitContributionsByRepository(maxRepositories: 100) {
        contributions {
          totalCount
        }
        repository {
          nameWithOwner
        }
      }
    }
  }
}
`;

export const GQL_USER_PRS = `
query($user:String!, $after: String) {
  user(login: $user) {
    pullRequests(
      first: 100
      states: [MERGED]
      orderBy: {field: CREATED_AT, direction: DESC}
      after: $after
    ) {
      totalCount
      nodes {
        title
        state
        repository {
          nameWithOwner
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}`;
