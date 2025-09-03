# Rafiq App - AI Development Prompt

## 1. Project Overview

This is a Progressive Web App (PWA) built with Next.js (App Router), TypeScript, and Tailwind CSS. It serves as a digital companion for daily Islamic supplications (Adhkar). The entire user interface is in Arabic and designed with a right-to-left (RTL) layout. The app's name is "Rafiq" (Companion).

## 2. Core Features to Maintain

When making any changes, you MUST preserve the following core functionalities:

1.  **Main Category Screen (`/src/app/page.tsx`):**
    *   Displays a grid of Adhkar categories (e.g., Morning, Evening, Sleep).
    *   Each category is a `Card` component with a `lucide-react` icon and a title.
    *   Clicking a category navigates the user to its specific tracker page (e.g., `/morning`).

2.  **Adhkar Tracker (`/src/components/AdhkarTracker.tsx`):**
    *   This is the primary user interaction screen.
    *   It displays one Dhikr at a time from a given category.
    *   **Functionality:**
        *   Displays the Dhikr `content`, `description`, and `reference`.
        *   Shows a counter for the current Dhikr (`currentCount` vs `dhikr.count`).
        *   A main `Progress` bar at the top shows overall progress through the category's Adhkar list.
        *   Users tap the main card to increment the counter.
        *   **Audio/Haptic Feedback:**
            *   When a single Dhikr's count is complete, the app MUST play `/public/single-completion.mp3` and trigger a short vibration.
            *   When ALL Adhkar in a category are finished, it MUST play `/public/completion-sound.mp3` and a longer vibration.
    *   **Animation:** Uses `framer-motion` for smooth transitions between Adhkar cards.

3.  **My Adhkar (Custom Supplications) (`/src/app/my-adhkar/page.tsx`):**
    *   Allows users to create, view, and delete their own custom Adhkar.
    *   This data **MUST** be persisted locally in the browser's Local Storage.
    *   The implementation relies on the `useLocalStorage` hook found in `/src/hooks/use-local-storage.ts`.
    *   Provides a "Start Reading" button that launches the `AdhkarTracker` component with the user's custom list.

4.  **PWA Functionality:**
    *   The app is a PWA. It includes a `manifest.json` and a service worker setup via Next.js defaults.
    *   The `PwaInstaller` component provides a button to install the app, which is integrated into the main `Header`.

## 3. Technical Stack & Coding Guidelines

*   **Framework:** Next.js (App Router). Use Server Components by default.
*   **Language:** TypeScript. Use it for all new components and logic.
*   **Styling:** Tailwind CSS and ShadCN UI components.
    *   All UI components are from `/src/components/ui/`.
    *   The app's theme (colors, fonts, etc.) is defined in `/src/app/globals.css`. Adhere to the existing color variables (e.g., `bg-primary`, `text-foreground`). Do not use hardcoded colors.
    *   The primary font is 'Alegreya' from Google Fonts, configured in `RootLayout`.
*   **Icons:** Use icons from the `lucide-react` library ONLY.
*   **Data Source:** All Adhkar data is stored in TypeScript files within the `/src/data/` directory. The data structure is defined in `/src/data/types.ts`.
*   **State Management:** For simple client-side state, use React hooks (`useState`, `useEffect`). For local persistence, use the existing `useLocalStorage` hook.
*   **Layout:** The application is strictly Right-to-Left (RTL) for Arabic. Ensure all styling and layout changes respect this. The `dir="rtl"` attribute is set on the `<html>` tag in `src/app/layout.tsx`.

## 4. Example Change Request

**User:** "Please add a new Dhikr to the 'أدعية الرزق' (Prayers for Sustenance) category."

**Correct AI Action:**
1.  Acknowledge the request.
2.  Identify the correct file to modify: `/src/data/rizq.ts`.
3.  Create a new `Dhikr` object with a unique `id`, the correct `category` ('rizq'), and the content provided by the user.
4.  Add this new object to the `rizqAdhkar` array within the file.
5.  Respond with the `<changes>` block containing the full, updated content of `/src/data/rizq.ts`.
