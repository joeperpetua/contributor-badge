import { themes } from "./themes/themes";
import { fonts } from "./fonts";
import { commitIcon, prIcon, star } from "./icons";

interface BadgeParams {
  owner: string;
  repo: string;
  user: string;
  starCount: number;
  prCount: number;
  commitCount: number;
  multiline: boolean;
  themeOptions: ThemeOptions;
}

interface ThemeOptions {
  theme: string | null;
  borderRadius: string | null;
  transparent: boolean;
  showOwner: boolean;
  fontStyle: string | null;
  animation: string | null;
}

const themeDefaults = (themeOptions: ThemeOptions) => {
  // showOwner & transparent default val is already set when parsing from query params
  themeOptions.theme = themeOptions.theme || "caveman";
  themeOptions.borderRadius = themeOptions.borderRadius || "10";
  themeOptions.transparent = themeOptions.transparent != null ? themeOptions.transparent : true;
  themeOptions.fontStyle = themeOptions.fontStyle || "sans-serif";
  themeOptions.animation = themeOptions.animation || "fade";

  return themeOptions;
}; 

const truncateEllipsis = (text: string, index: number) => text.split('').slice(0, index).join('') + '...';

const repoName = (owner: string, repo: string, multiline: boolean, showOwner: boolean) => {
  let str = "";

  if (multiline) {
    owner = owner.length > 22 ? truncateEllipsis(owner, 19) : owner; // Trim one char before than repo name to account for '/' char
    repo = repo.length > 22 ? truncateEllipsis(repo, 20) : repo;

    str = `
    <text x="20" y="55" class="title owner">${owner}/</text>
    <text x="20" y="95" class="title">${repo}</text>
    `;
  } else {
    str = `
    <text x="20" y="55" class="title">
      ${showOwner ? `<tspan class="owner">${owner}/</tspan>` : ``}
      <tspan>${repo}</tspan>  
    </text>
    `;
  }

  return str;
};

const starCounter = (count: number, multiline: boolean) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  return `<text x="${count > 99 ? 525 : 535}" y="${multiline ? 72 : 57}" class="counter">${countStr}</text>`;
};

const subtitle = (user: string, multiline: boolean) => {
  user = user.length > 22 ? truncateEllipsis(user, 19) : user;
  const str = `${user} contributions:`;

  return `<text x="20" y="${multiline ? 180 : 165}" class="sub-title italic secondary">${str}</text>`;
};

const commitInfo = (count: number, multiline: boolean) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  return `
      <svg viewBox="0 0 600 300" x="40" y="${multiline ? 200 : 185}">${commitIcon}</svg>
      <text x="90" y="${multiline ? 223 : 208}" class="stats">
        ${countStr} 
        <tspan class="italic secondary">commits</tspan>
      </text>
    `;
};

const prInfo = (count: number, multiline: boolean) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  return `
      <svg viewBox="0 0 600 300" x="40" y="${multiline ? 240 : 225}">${prIcon}</svg>
      <text x="90" y="${multiline ? 265 : 250}" class="stats">
        ${countStr} 
        <tspan class="italic secondary">pull requests</tspan>
      </text>
    `;
};

export const createSVG = async ({ 
  owner, 
  repo, 
  user, 
  starCount, 
  prCount, 
  commitCount, 
  multiline,
  themeOptions
}: BadgeParams): Promise<string> => {
  themeOptions = themeDefaults(themeOptions);

  const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="600" height="300">
        <rect width="600" height="300" rx="${themeOptions.borderRadius}" ry="${themeOptions.borderRadius}" />
        ${themes(themeOptions.theme!, themeOptions.transparent, themeOptions.animation!)}
        ${fonts[themeOptions.fontStyle!]}
        ${repoName(owner, repo, multiline, themeOptions.showOwner!)}
        ${star(multiline)}
        ${starCounter(starCount, multiline)}
        ${subtitle(user, multiline)}
        ${commitInfo(commitCount, multiline)}
        ${prInfo(prCount, multiline)}
      </svg>
    `;

  return svgString;
};