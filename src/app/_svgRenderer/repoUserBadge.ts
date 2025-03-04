import { themes } from "./themes/themes";
import { fonts } from "./fonts";
import { commitIcon, prIcon, starIcon } from "./icons";

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
  themeOptions.animation = themeOptions.animation || "slide";

  return themeOptions;
}; 

const repoName = (owner: string, repo: string, multiline: boolean, showOwner: boolean) => `
  <div class="flex title ${multiline ? 'col' : 'row'} enter-left">
    ${showOwner ? `
      <p class="flex">
        <p class="bold ellipsis">${owner}</p>
        /
      </p>`
      : 
      ``
    }
    <p class="ellipsis">${repo}</p>
  </div>
`;

const starCounter = (count: number) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;

  return `
    <div class="flex row justify-center items-center enter-right" style="width: 20%; gap: 1rem;">
      ${starIcon}
      <p class="counter bold">${countStr}</p>
    </div>
  `;
};

const subtitle = (user: string) => `
  <div class="flex row w-full italic secondary sub-title enter-left">
    <p class="ellipsis bold">${user}</p>
    <p>contributions:</p>
  </div>
`;

const commitInfo = (count: number) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;

  return `
    <div class="flex row w-full items-center enter-left" style="gap: 1rem; padding: 0 1.25rem;">
      ${commitIcon}
      <div class="flex row items-center stats">
        <p>${countStr}</p>
        <p class="italic secondary" style="margin-left: .5rem;">commits</p>
      </div>
    </div>
  `;
};

const prInfo = (count: number) => {
  const countStr = count > 999 ? (count / 1000).toFixed() + 'K' : `${count}`;
  
  return `
    <div class="flex row w-full items-center enter-left" style="gap: 1rem; padding: 0 1.25rem;">
      ${prIcon}
      <div class="flex row items-center stats">
        <p>${countStr}</p>
        <p class="italic secondary" style="margin-left: .5rem;">pull requests</p>
      </div>
    </div>
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
    <svg fill="none" viewBox="0 0 600 300" width="600" height="300" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%">
        <div 
          xmlns="http://www.w3.org/1999/xhtml" 
          class="flex col justify-between w-full h-full p-sm border-box bg" 
          style="border-radius: ${themeOptions.borderRadius}px;"
        >
          ${themes(themeOptions.theme!, themeOptions.transparent, themeOptions.animation!)}
          ${fonts[themeOptions.fontStyle!]}
          <div class="flex row justify-between items-center w-full">
            ${repoName(owner, repo, multiline, themeOptions.showOwner!)}
            ${starCounter(starCount)}
          </div>
          <div class="flex col w-full" style="margin-bottom: 1.5rem; gap: .5rem;">
            ${subtitle(user)}
            <div class="flex col w-full">
              ${commitInfo(commitCount)}
              ${prInfo(prCount)}
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;

  return svgString;
};