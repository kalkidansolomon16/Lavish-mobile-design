# Lavish — Mobile App Design Prototype

A clickable design of the Lavish mobile app, for the **client** and **student** roles. The real app will be built in **Flutter**; this prototype is the visual and flow reference for it.

## Run it

```bash
npm install
npm run dev        # open the URL Vite prints
```

- **Prototype**: click through the app inside the phone frame. The left menu jumps to any screen, and the right panel explains each screen and which part of the web app it connects to.
- **All screens**: an overview of every screen (also at `/#gallery`).
- Deep link to one screen with `/#<screen>`, e.g. `/#shop`, `/#s-home`.

## What's covered

| Role | Features |
|---|---|
| Client | Register (phone + OTP) · doctors list · book appointment (or let reception choose) · approval status · pay (Telebirr / CBE Birr / Chapa / cash at reception) · chat with doctor (unlocked after first treatment) · prescriptions · shop, cart, checkout, order tracking · complaints · notifications · profile |
| Student | Register · course catalogue · course detail · apply · application status · my course (progress, sessions, materials) · chat with CTO · profile |

Web-app counterparts (`lavish_front`): reception approves appointments and records payments; doctors see clients and chat; admin adds products and confirms delivery; CTO tracks complaints and approves students.

## Design tokens (same as the web app)

| Token | Hex | Use |
|---|---|---|
| Teal | `#0a7379` | Primary, buttons, headers |
| Teal deep | `#06565b` | Gradients, pressed states |
| Gold | `#cba590` | Accent, FAB, highlights |
| Gold soft | `#f3e8e1` | Accent backgrounds |
| Mint | `#d9e8e5` | Info backgrounds, active tab |
| Background | `#f6f5f4` | Screen background |
| Ink | `#262626` | Text |
| Muted | `#808285` | Secondary text |
| OK / Warn / Bad | `#3f8a5f` / `#c78a1b` / `#b8483f` | Status badges |

- **Fonts**: EB Garamond 600 for headings, Roboto for body text, Noto Sans Ethiopic for Amharic.
- **Icons**: Material Symbols Rounded. The names match Flutter `Icons.<name>_rounded`.
- **Radii**: cards 20 · buttons 16 · inputs 14 · chips full. Screen padding is 20.
- **Navigation**: Material 3 `NavigationBar`. Client tabs: Home, Doctors, Shop, Chat, Profile. Student tabs: Home, Courses, CTO chat, Profile.

All data is mock data (`src/store.js`); the Flutter app will use the Laravel API.
