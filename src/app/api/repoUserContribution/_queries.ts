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

export const GQL_USER_COMMITS = `
query($user:String!) {
  user(login: $user) {
    contributionsCollection {
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
query($user:String!) {
  user(login: $user) {
    contributionsCollection {
      pullRequestContributionsByRepository(maxRepositories: 100) {
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