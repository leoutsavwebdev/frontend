# Leo Club Event Portal

A web app for managing events, participant registrations, payments, and live leaderboards for the Leo Club (e.g. Leo Club of CEG). It has three roles: **Student**, **Coordinator**, and **Admin**.

---

## Tech stack

- **React 19** with **Vite 7**
- **React Router** for navigation
- **Framer Motion** for animations
- **Lucide React** for icons
- **CSS** (no UI framework) with CSS variables for theming
- **localStorage** for persistence (no backend)

---

## How to run

```bash
cd light-house/vite-project
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

- **Build:** `npm run build`
- **Preview build:** `npm run preview`

---

## Login information

### Student

- **Login:** Email only (no password).
- **Sample:** `student@test.com`
- On first login, the student is prompted to enter **name**, **roll no**, and **phone**. A **LEO ID** is generated (e.g. `LEO_UTSAVJV1410`) and shown in the dashboard.
- Students can register for events, choose “Pay now” (with transaction ID + screenshot) or “Pay when you arrive”, and undo registration. They see their **profile** (LEO ID, name, email, roll no, phone) and their event registrations.

### Coordinator

- **Login:** Email + password.
- **Sample accounts:**
  - `coord@test.com` / `password` (approved)
  - `coord2@test.com` / `password` (pending)
- Coordinators can:
  - **Events I Can Join** — join up to 2 events as coordinator (“I Am In”).
  - **My Active Work** — view or exit their active events.
  - **Participants** — select an event and see participants; mark “Arrived” and set payment status. If there are no participants, “No registrations till now.” is shown.
  - **Live Leaderboard** — select an event, see **Roll No**, name, LEO ID, score; add/edit scores. Event contacts (Organiser + Coordinator 1 & 2 with names and phone numbers) are shown in the same section.

### Admin

- **Login:** Email + password.
- **Sample:** `admin@test.com` / `password`
- Admin can:
  - **Events** — add event (modal with a **cross/close** button), edit, close, complete, and download report.
  - **Coordinators** — approve or reject coordinator requests.
  - **Revenue** — view mock revenue summary (total and per event).
  - **Reports** — generate and download event reports (participants, revenue, winners). Completing an event sets top 3 from the leaderboard as winners.

---

## Features overview

| Role        | Features |
|------------|----------|
| **Student** | Profile (LEO ID, name, email, roll no, phone), view and register for events, pay now (with tx ID + screenshot) or pay at arrival, undo registration, see wins. |
| **Coordinator** | Join/exit events, track participants (arrived, payment), “No registrations till now” when empty, live leaderboard with **roll no**, add/edit scores, event contacts (organiser + 2 coordinators with phone). |
| **Admin** | CRUD events, approve/reject coordinators, revenue summary, event reports, complete events (top 3 = winners). Add-event modal has a visible **close (X)** button; tab buttons are styled for clarity. |

---

## Project structure (main paths)

- `src/context/` — `AuthContext`, `AppData` (users, events, participants, leaderboards, etc.).
- `src/data/sampleData.js` — sample students, coordinators, admins, events; organiser constant; localStorage helpers.
- `src/pages/` — `StudentDashboard`, `CoordinatorDashboard`, `AdminDashboard`, `EventDetails`, `Login`, `Home`, etc.
- `src/components/` — shared UI (e.g. event cards).
- Data is stored in the browser (localStorage); clearing storage resets to sample data on next load.

---

## Notes

- **Organiser** and coordinator **phone** numbers are defined in `src/data/sampleData.js` (e.g. `ORGANISER`, `SAMPLE_COORDINATORS[].phone`).
- **Roll no** is collected from students and shown in the coordinator leaderboard and participant flows.
- No backend: all state is in memory and persisted to localStorage for demo/testing.
