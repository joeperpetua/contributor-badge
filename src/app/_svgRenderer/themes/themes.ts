import { base } from "./Base";
import { eyeBurner } from "./EyeBurner";
import { caveman } from "./Caveman";

export const themes = (theme: string, transparent: boolean) => {
  switch(theme) {
    case "caveman":
      return caveman(transparent) + base;
    case "eyeBurner":
      return eyeBurner(transparent) + base;
    default: 
      throw Error("Invalid Theme");
  }
}