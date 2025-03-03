# Contributor Badge
<img src='readme-img/icon.png' height="100" width="auto" align="left">
<br>
Simple and customizable badges to showcase your OSS contributions  

in your Github profile or personal website.  
<br>

## Table of Contents
- [Usage](#usage)
- [Themes](#themes)
  - [Caveman](#caveman-default)
  - [EyeBurner](#eyeburner)
- [Display options](#display-options)
  - [showOwner](#showowner)
  - [borderRadius](#borderradius)
  - [transparent](#transparent)
  - [fontStyle](#fontstyle)
- [Deployment](#deployment)
- [Contributions](#contributions)

## Usage
The badges are served as SVG images, so they will need to be displayed by a `<img>` or `<picture>` tag.
```html
<img height="200px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=REPO_OWNER&repo=REPO_NAME&user=CONTRIBUTOR">     
```

You can set the size as you see fit using the `height` attribute and setting `width` to auto. 

You can add a custom link to the repository by wrapping the badge in a `<a>` tag:
```html
<a href="https://gihtub.com/REPO_OWNER/REPO_NAME" target="_blank"><img height="200px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=REPO_OWNER&repo=REPO_NAME&user=CONTRIBUTOR"></a>
```

## Themes
You can choose any of the following themes by specifying the `theme` param in the URL:

### Caveman (default)
`&theme=caveman`  

<img height="200px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua">

### EyeBurner
`&theme=eyeBurner` 

<img height="200px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&theme=eyeBurner">

## Display options
The following options can be set using query params:

### `showOwner`
Wether to display or not the repository owner.

`&showOwner=true` (default)  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua">  

`&showOwner=false`  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&showOwner=false">

---

### `borderRadius`
Specify the border radius for the badge.

`&borderRadius=10` (default)  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua">  

`&borderRadius=0`    
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&borderRadius=0">  

---

### `transparent`
Wheter the badge has a solid background or not.

`&transparent=false` (default)  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua">  

`&transparent=true`  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&transparent=true">  

---

### `fontStyle`
What font style to use. The badge will use websafe fonts for each OS/device, so the fonts used may differ depending where the badge is being served.

`&fontStyle=sans-serif` (default)  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua">  

`&fontStyle=serif`  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&fontStyle=serif">  

`&fontStyle=monospace`  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&fontStyle=monospace">  

`&fontStyle=cursive`  
<img height="150px" width="auto" src="https://contributor-badge.vercel.app/api/repoUserContribution?owner=joeperpetua&repo=contributor-badge&user=joeperpetua&fontStyle=cursive">  

## Deployment
The current endpoint has a 12 hours cache to avoid reaching the Github API rate limiting.
You can deploy your own instance and set the CACHE_SECONDS environment variable to avoid this caching mechanism.

For this, you will need to create a fork of this repository and create an access token.

1. Create fork  
![alt text](readme-img/fork.png)

2. Create Github access token
  - Go to https://github.com/settings/tokens/new
  - Check the "public_repo" box
  ![alt text](readme-img/gh-token.png)
  - Scroll to the bottom of the page and click "Generate token"
  - Copy the token
  ![alt text](readme-img/gh-token-copy.png)

3. Deploy in Vercel (or the provider you prefer)
   - Create account with Github in https://vercel.com
   - Create new Project
   ![alt text](readme-img/vercel-project.png)
   - Import from your fork repository
   ![alt text](readme-img/vercel-import.png)
   - Set the Environment variables `GH_TOKEN` and `CACHE_SECONDS`
   ![alt text](readme-img/vercel-env.png)
   - Click "Deploy"

Now your deployment should be accessible in the URL created by Vercel.

## Contributions
Contributions are welcomed, feel free to create any issue or PR for further development.
Some nice features would be:
- More personalization options
- More themes
- Different locales
- Custom contribution types (issues, reviews, etc.)

