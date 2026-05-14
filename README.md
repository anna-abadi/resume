# Anna Abadi — Portfolio Website

A modern, dark-themed personal portfolio built with **React + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

Make sure you have **Node.js 18+** installed, then:

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → Opens at http://localhost:5173
```

---

## 📸 Adding Your Photo

1. Save your photo as `src/assets/photo.jpg`
2. Open `src/components/Hero.jsx`
3. Change this line:
   ```js
   import photo from '../assets/photo.svg'
   ```
   to:
   ```js
   import photo from '../assets/photo.jpg'
   ```
4. Done! The photo will display in the hero section.

---

## ✏️ Updating Your Info

All resume content lives in one file: **`src/data/resume.js`**

Edit it to update your name, jobs, skills, links, etc. — everything on the site updates automatically.

---

## 🏗️ Build for Production

```bash
npm run build
# Output goes to the `dist/` folder
```

---

## 🌐 Deploy to Netlify (Free)

### Option A — Drag & Drop (easiest)
1. Run `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder into the browser
4. You'll get a live URL like `https://jolly-name-123.netlify.app` instantly

### Option B — Connect GitHub (recommended for updates)
1. Push this project to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Select your repo, set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy** — Netlify auto-deploys on every push

---

## 🔗 Custom Domain

Once deployed on Netlify:

1. Go to **Site settings → Domain management → Add custom domain**
2. Type your domain (e.g. `anna-abadi.dev` or `annaabadi.com`)
3. Follow Netlify's DNS instructions — point your domain's nameservers to Netlify

**Recommended domain registrars:**
- [Namecheap](https://www.namecheap.com) — ~$10/yr for `.com`, `.dev`
- [Porkbun](https://porkbun.com) — often cheaper, clean UI
- [Google Domains](https://domains.google) — simple, integrates well

**Suggested domains:**
- `anna-abadi.dev` (great for developers — `.dev` requires HTTPS)
- `annaabadi.com`
- `annaabadi.ca` (Canadian!)
- `anna-abadi.me`

---

## 🗂️ Project Structure

```
anna-abadi-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    │   └── photo.svg  ← replace with photo.jpg
    ├── data/
    │   └── resume.js  ← edit all your info here
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── TrustedBar.jsx
        ├── Skills.jsx
        ├── Experience.jsx
        ├── Projects.jsx
        ├── Education.jsx
        ├── Contact.jsx
        └── Footer.jsx
```
