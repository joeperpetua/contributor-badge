export const base = `
  <style>

    /* *********** */
    /*   HELPERS   */
    /* *********** */

    .flex { display: flex; }
    .row { flex-direction: row; }
    .col { flex-direction: column; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .w-full { width: 100%; }
    .h-full { height: 100%; }
    .p-sm { padding: 2.5%; }
    .ellipsis { text-overflow: ellipsis; overflow: hidden; }
    .italic { font-style: italic; }
    .bold { font-weight: bold; }
    .border-box { box-sizing: border-box; }
    
  </style>


  <style>

    /* ********** */
    /*   LAYOUT   */
    /* ********** */

    p { 
      margin: 0;
    }

    .title {
      font-size: 2rem;
      max-width: 70%;
    }

    .sub-title {
      max-width: 85%;
    }

    .sub-title p {
      font-size: 1.6rem;
      padding: 0 0.25rem;
    }

    .stats {
      font-size: 1.4rem;
    }

    .counter {
      font-size: 1.75rem;
      font-weight: bold;
    }

  </style>
`;