# Mini Blog Dashboard

A small **Mini Blog Dashboard** built with **React, Vite and Tailwind CSS**.

It implements the requirements from the assignment:

- View a list of posts
- Search & filter posts
- View post details with author info
- Create a new post (simulated via JSONPlaceholder)
- Toggle between light & dark theme (stored in `localStorage`)
- Clean, responsive UI with Tailwind

## Tech Stack

- React 18 (functional components + hooks)
- Vite
- React Router
- Tailwind CSS
- JSONPlaceholder API

## Features

### Posts List Page (`/`)

- Fetches posts from `https://jsonplaceholder.typicode.com/posts`
- Fetches users from `https://jsonplaceholder.typicode.com/users`
- Displays posts in a responsive grid with:
  - Title
  - Snippet of body
  - Author badge
- Includes:
  - **Search bar** (filter by title text)
  - **Filter by user** (dropdown: All authors / User 1–10)
- Handles:
  - Loading states
  - Error states
- Uses reusable components: `PostList`, `PostCard`, `SearchBar`, `FilterDropdown`.

### Post Detail Page (`/posts/:id`)

- When you click on a post card:
  - Shows full title and body
  - Fetches and displays author info from `https://jsonplaceholder.typicode.com/users/:id`
- Includes a **"Back to list"** button.

### Create Post Page (`/create`)

- Simple form with fields:
  - Title (text)
  - Body (textarea)
  - Author (dropdown populated from `/users`)
- Basic validation:
  - All fields required
  - Error messages displayed under each invalid field
- On submit:
  - Sends `POST` request to `https://jsonplaceholder.typicode.com/posts`
  - Shows success message
  - Adds the new post to a local list stored in `localStorage` so it appears in the Posts list even though the remote API does not persist it.

### Theme Toggle

- Light / Dark mode toggle in the header.
- Theme is saved to `localStorage` under the key `mini-blog-theme`.
- Applies `dark` class to `<html>` element so Tailwind's `dark:` styles work.
- Persists across refresh.

### State Management & Hooks

- Uses React hooks: `useState`, `useEffect`.
- Custom hooks:
  - `useFetch(url, options)` for loading data, tracking `loading` and `error`.
  - `useTheme()` for theme handling and persistence.
- UI state:
  - Search text
  - Selected user filter
  - Theme
  - Form fields and validation errors

### Error & Loading Handling

- `Loader` component for showing a small spinner + message.
- `ErrorMessage` component for nice inline error display.

### Styling & UX

- Tailwind CSS used for layout and styling.
- Responsive grid using `grid` and breakpoints:
  - 1 column on mobile
  - 2–3 columns on larger screens
- Simple hover effects on cards.
- Consistent spacing, fonts, and colors.

## Project Structure

```
src/
  components/
    Layout/
      Layout.jsx
    ErrorMessage.jsx
    Loader.jsx
    PostCard.jsx
    PostList.jsx
    SearchBar.jsx
    FilterDropdown.jsx
    ThemeToggle.jsx
  hooks/
    useFetch.js
    useTheme.js
  pages/
    PostsList.jsx
    PostDetail.jsx
    CreatePost.jsx
  styles/
    index.css
  App.jsx
  main.jsx
tailwind.config.js
postcss.config.js
vite.config.js
index.html
```

## How to Run

Make sure you have **Node.js >= 18** installed.

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

## Assumptions & Limitations

- Uses JSONPlaceholder, which is a fake API:
  - `POST /posts` does not persist on the server.
  - To make new posts visible in the UI, they are stored locally in `localStorage` and merged into the posts list.
- No global state manager like Redux is used; everything is handled with React hooks, as requested.
- Authentication and real backend are out of scope for this assignment.
