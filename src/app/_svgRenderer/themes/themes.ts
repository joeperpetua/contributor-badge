import { base } from "./Base";
import { eyeBurner } from "./EyeBurner";
import { caveman } from "./Caveman";

export const themes: { [key:string]: string } = {
  caveman: caveman + base,
  eyeBurner: eyeBurner + base,
}