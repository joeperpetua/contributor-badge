const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&amp;display=swap');
      text {
        font-family: "Roboto Mono", serif;
        fill: white;
      }
      .italic {
        font-style: italic;
      }
      .title {
        font-size: 2rem;
      }
      .sub-title {
        font-size: 1.6rem;
      }
      .stats {
      font-size: 1.4rem;
      }
      .counter {
        font-size: 1.75rem;
        letter-spacing: -2px;
      }
      .gray {
        fill: #D2D2D2;
      }
    </style>
  `;

const repoName = (owner: string, repo: string, multiline: boolean) => {
  let str = "";
  const full = `${owner}/${repo}`;

  if (multiline) {
    if (full.length < 44) {
      str = `<text x="20" y="55" class="title">${full.substring(0, 23)}</text><text x="20" y="95" class="title">${full.substring(23)}</text>`;
    } else {
      const shortened = full.split('').slice(0, 43).join('') + '...';
      str = `<text x="20" y="55" class="title">${shortened.substring(0, 23)}</text><text x="20" y="95" class="title">${shortened.substring(23)}</text>`;
    }
  } else {
    str = `<text x="20" y="55" class="title">${full}</text>`;
  }

  return str;
};

const star = (multiline: boolean) => {
  return `
      <svg viewBox="0 0 600 300" x="490" y="${multiline ? 40 : 25}">
        <path fill="#D9FF00" transform="scale(3)"
          d="M6.5209 1.10473C6.66299 0.628786 7.33701 0.628787 7.4791 1.10473L8.58355 4.80404C8.64806 5.02012 8.84923 5.16627 9.07467 5.16085L12.9342 5.0681C13.4308 5.05617 13.6391 5.69719 13.2303 5.97941L10.0534 8.17295C9.86779 8.30108 9.79095 8.53756 9.86577 8.75029L11.1466 12.3923C11.3114 12.8608 10.7662 13.257 10.3714 12.9555L7.30353 10.6119C7.12433 10.475 6.87567 10.475 6.69647 10.6119L3.62856 12.9555C3.23385 13.257 2.68856 12.8608 2.85335 12.3923L4.13423 8.75029C4.20905 8.53756 4.13221 8.30108 3.94664 8.17295L0.769689 5.97941C0.360946 5.69719 0.569229 5.05617 1.06579 5.0681L4.92533 5.16085C5.15077 5.16627 5.35194 5.02012 5.41645 4.80404L6.5209 1.10473Z"
        />
      </svg>

      
    `;
};

const starCounter = (count: number, multiline: boolean) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  return `<text x="540" y="${multiline ? 72 : 57}" class="counter">${countStr}</text>`;
};

const subtitle = (contributor: string, multiline: boolean) => {
  let str = '';
  if (contributor.length > 22) {
    str = `${contributor.split('').slice(0, 18).join('') + '...'} contributions:`;
  } else {
    str = `${contributor} contributions:`;
  }
  return `<text x="20" y="${multiline ? 180 : 165}" class="sub-title italic gray">${str}</text>`;
};

const commitIcon = `
    <path 
      transform="scale(1.75)" fill="#D2D2D2"
      d="M9 11.25C9.59674 11.25 10.169 11.0129 10.591 10.591C11.0129 10.169 11.25 9.59674 11.25 9C11.25 8.40326 11.0129 7.83097 10.591 7.40901C10.169 6.98705 9.59674 6.75 9 6.75C8.40326 6.75 7.83097 6.98705 7.40901 7.40901C6.98705 7.83097 6.75 8.40326 6.75 9C6.75 9.59674 6.98705 10.169 7.40901 10.591C7.83097 11.0129 8.40326 11.25 9 11.25ZM13.41 9.9C12.9937 11.9531 11.1769 13.5 9 13.5C6.82312 13.5 5.00625 11.9531 4.59 9.9H0.9C0.402187 9.9 0 9.49781 0 9C0 8.50219 0.402187 8.1 0.9 8.1H4.59C5.00625 6.04687 6.82312 4.5 9 4.5C11.1769 4.5 12.9937 6.04687 13.41 8.1H17.1C17.5978 8.1 18 8.50219 18 9C18 9.49781 17.5978 9.9 17.1 9.9H13.41Z" 
    />
  `;

const prIcon = `
    <path 
      transform="scale(1.75)" 
      stroke="#D2D2D2" 
      fill="none" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      d="M16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13ZM16 13L16 6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H11M4 7C5.65685 7 7 5.65685 7 4C7 2.34315 5.65685 1 4 1C2.34315 1 1 2.34315 1 4C1 5.65685 2.34315 7 4 7ZM4 7V19"
    />
  `;

const commit = (count: number, multiline: boolean) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  return `
      <svg viewBox="0 0 600 300" x="40" y="${multiline ? 200 : 185}">${commitIcon}</svg>
      <text x="90" y="${multiline ? 226 : 211}" class="stats">
        ${countStr} 
        <tspan class="italic gray">commits</tspan>
      </text>
    `;
};

const pr = (count: number, multiline: boolean) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  return `
      <svg viewBox="0 0 600 300" x="40" y="${multiline ? 240 : 225}">${prIcon}</svg>
      <text x="90" y="${multiline ? 270 : 255}" class="stats">
        ${countStr} 
        <tspan class="italic gray">pull requests</tspan>
      </text>
    `;
};

export const createSVG = async (opts: {
  owner: string,
  repo: string,
  contributor: string,
  multiline: boolean
}): Promise<string> => {
  const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="600" height="300">
        <rect width="600" height="300" fill="#3e3e3e" />
        ${styles}
        ${repoName(opts.owner, opts.repo, opts.multiline)}
        ${star(opts.multiline)}
        ${starCounter(1000, opts.multiline)}
        ${subtitle(opts.contributor, opts.multiline)}
        ${pr(30, opts.multiline)}
        ${commit(127, opts.multiline)}
      </svg>
    `;

  return svgString;
};