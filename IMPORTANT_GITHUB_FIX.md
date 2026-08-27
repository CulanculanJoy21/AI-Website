# USE THIS VERSION ON GITHUB

The screenshots with broken images happened because GitHub did not have the files at:
- assets/profile/joy-profile.png
- assets/featured/...

This V10 build fixes that permanently:

- Your profile photo is embedded directly inside `index.html`.
- The 3 featured thumbnails are embedded directly inside `featured-data.js`.
- The featured videos play from Google Drive, so you do NOT need to upload the large MP4 files to GitHub.
- There is no required profile/featured image folder anymore.

## Upload

Delete/replace the old repository files with EVERYTHING from this V10 folder.

At minimum, make sure these are at the repository root:
- index.html
- styles.css
- script.js
- portfolio-data.js
- featured-data.js
- .nojekyll

Then commit the changes.

After GitHub Pages redeploys, press:
Ctrl + Shift + R

to force the browser to load the new version instead of the cached old site.
