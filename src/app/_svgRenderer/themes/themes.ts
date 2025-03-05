import { base } from "./Base";
import { eyeBurner } from "./EyeBurner";
import { caveman } from "./Caveman";

// type Animation = "none" | "fade" | "slide"; 

const animations = (type: string) => `
<style>

  /* ************ */
  /*  ANIMATIONS  */
  /* ************ */

  .enter-left {
    animation-duration: ${type === 'slide' ? '2s' : '3s'};
    animation-name: ${type === 'slide' ? 'slide-left-right' : type};
  }
  
  .enter-right {
    animation-duration: ${type === 'slide' ? '2s' : '3s'};
    animation-name: ${type === 'slide' ? 'slide-right-left' : type};
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes slide-left-right {
    from {
      transform: translateX(-100%);
    } 

    to {
      transform: translateX(0%);
    }
  }

  @keyframes slide-right-left {
    from {
      transform: translateX(100%);
    } 

    to {
      transform: translateX(0%);
    }
  }
</style>
`;

export const themes = (theme: string, transparent: boolean, animation: string) => {
  switch(theme) {
    case "caveman":
      return caveman(transparent) + animations(animation) + base;
    case "eyeBurner":
      return eyeBurner(transparent) + animations(animation) + base;
    default: 
      throw Error("Invalid Theme");
  }
}