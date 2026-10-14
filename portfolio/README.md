# MD. Emon Miah — Portfolio

Responsive software engineering portfolio built with Next.js App Router, React, TypeScript, and custom CSS.

## CV maintenance

- Edit `public/cv.md` to update the CV content.
- The production build generates `public/cv.pdf` from the Markdown source.
- The site provides **View CV** and **Download CV** links.
- The profile portrait is loaded from the public GitHub avatar URL, so it follows the avatar currently set on GitHub.

## Local development

```bash
cd portfolio
yarn install
yarn dev
```

## Production build

```bash
yarn build
```

## Deploy on Vercel

When importing the repository, set **Root Directory** to `portfolio`. Use the Next.js framework preset and `yarn build` as the build command. The CV PDF generator runs automatically before Next.js builds.
