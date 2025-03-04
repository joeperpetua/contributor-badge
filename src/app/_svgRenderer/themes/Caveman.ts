export const caveman = (transparent: boolean) => `
<style>
  rect {
    fill: ${transparent ? 'rgba(0, 0, 0, 0)' : 'rgb(62, 62, 62)'};
  }
  text {
    fill: white;
  }
  .secondary {
    fill: #D2D2D2;
  }
  .icon-commit {
    fill: #D2D2D2;
  }
  .icon-pr {
    stroke: #D2D2D2;
  }
</style>
`;