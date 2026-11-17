# A Letter From Hassan

## Files to add (keep the exact names)
- `assets/images/couple-photo.jpg` — your photo with Samira (a styled placeholder shows until you add it).
- `assets/audio/letter-song.mp3` — "كامل الأوصاف — عبد الحليم حافظ". This ONE file is both the background music and the player.
- `assets/audio/voice-message.mp3` — your voice message.

Replace a file by keeping the same filename. Nothing is autoplayed: music starts when Samira taps "افتحي الرسالة" or the player button, and her choice is remembered.

## Audio behavior
Playing the voice message pauses the song; when the voice ends (or is stopped), the song resumes only if it was playing before. A manually paused song stays paused.

## Publish on GitHub Pages
1. New repository (e.g. `letter-website`), upload the contents of this folder (`index.html` at the root).
2. Settings → Pages → Deploy from a branch → `main` / root → Save.
3. Copy the final link (`https://YOUR-USERNAME.github.io/letter-website/`) into `SECOND_WEBSITE_URL` in the museum website's `script.js`.
