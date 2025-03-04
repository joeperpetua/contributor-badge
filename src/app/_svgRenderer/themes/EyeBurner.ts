export const eyeBurner = (transparent: boolean) => `
<style>
  .bg {
    background-color:   ${transparent ? 'rgba(0, 0, 0, 0)' : 'white'};
  }

  .secondary {
    color: darkslategray;
  }

  .icon-commit {
    fill: black;
  }

  .icon-pr {
    stroke: black;
  }
</style>
`;