# Samira's Little Museum of Love

## Add your photos (keep the exact names)
Put in `assets/images/`: `mug.jpg`, `notebook.jpg`, `gift-details.jpg`.
Missing images show a styled placeholder naming the file to add. Images use `object-fit: contain`, so nothing gets cropped.

## Music
Put your song at `assets/audio/museum-music.mp3`. It starts after the first click ("ادخلي يا كوكو"). A missing file just hides the music button.

## Link to the second website
Publish `letter-website` first, then open `script.js` and set:
`const SECOND_WEBSITE_URL = "https://YOUR-USERNAME.github.io/letter-website/";`

## Publish on GitHub Pages
1. Create a new repository (e.g. `museum-website`), upload everything inside this folder (so `index.html` is at the root).
2. Settings → Pages → Source: "Deploy from a branch" → `main` / root → Save.
3. After a minute the site is at `https://YOUR-USERNAME.github.io/museum-website/`.

## Password
The site opens with a password gate. Password = Samira's birthday as digits: `16032007` (day/month/year). To change it, edit `PASSWORDS` in `script.js`.
The tour order is fixed: mug → notebook → letter. Photo for the letter corner's Polaroid: `assets/images/couple-photo.jpg`.

Note: after the notebook, the button "روحي لركن الرسالة" opens the second website directly (`SECOND_WEBSITE_URL`), no intermediate page.
