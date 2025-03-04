const sansSerif = `<style> p { font-family: "Segoe UI", "San Francisco", "Ubuntu", "Roboto", sans-serif; } </style>`;
const serif     = `<style> p { font-family: "Constantia", "Palatino", serif; } </style>`;
const monospace = `<style> p { font-family: "Cascadia Code", "Andale Mono", monospace; } </style>`;
const cursive   = `<style> p { font-family: "Segoe Print", "Apple Casual", cursive; } </style>`;

export const fonts: { [key:string]: string } = {
  "sans-serif": sansSerif,
  serif,
  monospace,
  cursive
}