const sansSerif = `<style> text { font-family: "Segoe UI", "San Francisco", "Ubuntu", "Roboto", sans-serif; } </style>`;
const serif     = `<style> text { font-family: "Constantia", "Palatino", serif; } </style>`;
const monospace = `<style> text { font-family: "Cascadia Code", "Andale Mono", monospace; } </style>`;
const cursive   = `<style> text { font-family: "Segoe Print", "Apple Casual", cursive; } </style>`;

export const fonts: { [key:string]: string } = {
  "sans-serif": sansSerif,
  serif,
  monospace,
  cursive
}