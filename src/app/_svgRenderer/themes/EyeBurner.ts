export const eyeBurner = (transparent: boolean) => `
<style>
  rect {
    fill: ${transparent ? 'rgba(0, 0, 0, 0)' : 'white'};
  }
  text {
    fill: black;
  }
  .secondary {
    fill: darkslategray;
  }
  .icon-commit {
    fill: black;
  }
  .icon-pr {
    stroke: black;
  }
</style>
`;