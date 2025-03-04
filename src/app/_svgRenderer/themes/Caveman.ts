export const caveman = (transparent: boolean) => `
<style>
  .bg {
    background-color:  ${transparent ? 'rgba(0, 0, 0, 0)' : 'rgb(62, 62, 62)'};
  }

  p {
    color: white;
  }
    
  .secondary {
    color: #D2D2D2;
  }

  .icon-commit {
    fill: #D2D2D2;
  }

  .icon-pr {
    stroke: #D2D2D2;
  }
</style>
`;