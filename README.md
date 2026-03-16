# Jonas Kasper Jensen — Portfolio Website

This website is a minimal portfolio hosted with **GitHub Pages**.  
All projects are defined inside `index.html`.

The site automatically renders projects from a list of objects inside the `posts` array.

---

# File structure

The repository should look like this:

index.html
README.md

assets/
project1/
image1.jpg
video.mp4
model.glb

project2/
image1.jpg
video.mp4

All media files should be placed inside the **assets folder**.

---

# Adding a new project

1. Open **index.html**
2. Find the section:

const posts = [

3. Copy an existing project block
4. Paste it **at the top of the list**
5. Edit the fields

Example:

{
title: “New project”,
date: “2026-04-01”,
summary: “Short description of the work.”,
blocks: [

{
  type: "image",
  span: "span-12",
  src: "assets/project2/image1.jpg"
},

{
  type: "video",
  span: "span-12",
  src: "assets/project2/video.mp4"
},

{
  type: "glb",
  span: "span-12",
  src: "assets/project2/model.glb"
}

]
},

Commit the change after editing.

---

# Supported media types

The site can display:

Images

jpg
png
gif

Video

mp4

3D models

glb

Example blocks:

Image:

{
type: “image”,
src: “assets/project1/image1.jpg”
}

Video:

{
type: “video”,
src: “assets/project1/video.mp4”
}

3D model:

{
type: “glb”,
src: “assets/project1/model.glb”
}

---

# Uploading files

Upload files through GitHub:

Add file → Upload files

Place them inside the correct folder:

assets/project-name/

Example:

assets/project1/image1.jpg
assets/project1/video.mp4
assets/project1/model.glb

---

# Updating the website

After editing or uploading files:

1. Click **Commit changes**
2. Wait **30–60 seconds**
3. Refresh the page

If the browser shows an old version, do a **hard refresh**.

Mac:

Cmd + Shift + R

Windows:

Ctrl + F5

---

# Testing files directly

If a file does not appear on the site, test it directly in the browser.

Example:

https://JonasKasperJensen.github.io/assets/project1/image1.jpg

If the file loads, the path is correct.

---

# Notes

File paths are **case sensitive**.

Avoid spaces in filenames.

Good filenames:

image1.jpg
video.mp4
model.glb

Bad filenames:

My Image File.jpg
Final Video Version 3.mp4

---

# Author

Jonas Kasper Jensen
