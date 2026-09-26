# Formal Academic Homepage Template

A dependency-free, responsive academic homepage designed for GitHub Pages. It is intentionally
structured to look complete with one publication and to scale naturally as your record grows.

## Preview locally

Open `index.html` directly, or serve the folder with any static web server. For example:

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Customize

1. Replace every occurrence of `Your Name`, `University Name`, and bracketed placeholder text.
2. Replace the `.portrait-placeholder` block in `index.html` with an image:

   ```html
   <img class="portrait" src="assets/portrait.jpg" alt="Portrait of Your Name" />
   ```

3. Replace the placeholder links marked with `data-placeholder-link`.
4. Enter the paper's real author order, status, venue, year, and URLs exactly as published.
5. Replace the publication graphic with your paper's overview figure when available.
6. Edit `cv.html`, or replace its link with a PDF such as `assets/cv.pdf`.
7. Update the page description and title in the `<head>` of both pages.

## Publish on GitHub Pages

1. Create a public repository named `YOUR-USERNAME.github.io`.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. The site will appear at `https://YOUR-USERNAME.github.io/` after deployment finishes.

No build step, framework, or external font is required.
