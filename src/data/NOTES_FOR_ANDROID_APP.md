
# Notes for Building the Adhkar Android App

This document provides the necessary data, assets, and guidelines to build a native Android app based on the existing web application.

## 1. Core Functionality

The Android app should replicate the core features of the web app:

1.  **Category Selection Screen:** A main screen (like a `RecyclerView` or `LazyColumn` in Jetpack Compose) that displays all the Adhkar categories. Each item should show the category name and a corresponding icon.
2.  **Adhkar Tracker Screen:** When a user taps a category, it should navigate to a tracker screen. This screen displays one Dhikr at a time.
    *   It must show the Dhikr content, its repetition count, description, and reference.
    *   A progress bar should indicate the user's progress through the list of Adhkar in that category.
    *   The user taps the screen to increment the counter for the current Dhikr.
    *   When the count for a Dhikr is reached, the app should play a short sound (`single-completion.mp3`) and provide haptic feedback (vibrate).
    *   After a brief delay, it should automatically move to the next Dhikr.
    *   When all Adhkar in a category are completed, a completion message should be displayed, and a special sound (`completion-sound.mp3`) should be played.
3.  **My Adhkar (Custom Adhkar):**
    *   A dedicated section for users to add, view, and delete their own custom Adhkar.
    *   This data should be stored locally on the device using a database like `Room` or `SharedPreferences`.
    *   The functionality should include a form to add a new Dhikr (content, count, description, reference) and a list to display and manage saved Adhkar.
4.  **Dark/Light Theme:** The app should support both light and dark themes, respecting the system's theme setting by default.

## 2. Data Source

All the necessary Adhkar data has been consolidated into a single JSON file: `android_app_data.json`.

*   **Location:** `/src/data/android_app_data.json`
*   **Action:** You should copy this file into your Android project's `assets` folder. You can then parse this JSON file using a library like `Gson` or `Moshi` to populate your app's database or in-memory data structures.

### Data Structure (`Dhikr` object)

Each Dhikr object in the JSON file has the following structure:

```json
{
  "id": 1,
  "category": "morning",
  "content": "...",
  "count": 1,
  "description": "...",
  "reference": "..."
}
```

*   `id`: A unique integer identifier.
*   `category`: A string indicating which category the Dhikr belongs to.
*   `content`: The main text of the Dhikr (the prayer).
*   `count`: The number of times the Dhikr should be repeated.
*   `description`: Additional information or the virtue of the Dhikr.
*   `reference`: The source of the Dhikr (e.g., "رواه مسلم").

## 3. Required Assets

### a. Icons

The web app uses `lucide-react` icons. For the Android app, you should use a standard icon pack like **Material Design Icons**. Here is a mapping of the categories to suggested Material icons:

| Category Name        | Web Icon      | Suggested Material Icon Name |
| -------------------- | ------------- | ---------------------------- |
| أذكار الصباح        | Sunrise       | `wb_sunny`                   |
| أذكار المساء        | Sunset        | `brightness_3` or `nightlight` |
| أذكار النوم          | Moon          | `bedtime`                    |
| أذكار بعد الصلاة    | HandPlatter   | `pending_actions` or `playlist_add_check` |
| دخول/خروج المنزل   | HomeIcon      | `home`                       |
| الطعام والشراب     | Utensils      | `restaurant`                 |
| دخول/خروج المسجد  | Landmark      | `mosque` or `account_balance` |
| الركوب               | Car           | `directions_car`             |
| لبس الثوب            | Shirt         | `checkroom`                  |
| دخول/خروج الخلاء  | Bath          | `wc`                         |
| أدعية الهم والحزن   | Smile         | `sentiment_satisfied` or `mood`|
| أدعية الرزق          | Sprout        | `local_florist` or `spa`   |
| وصايا نبوية          | Star          | `star`                       |
| أذكاري              | ListPlus      | `playlist_add`               |

The `KaabaIcon` used in the header is a custom SVG. You can get the SVG code from `/src/components/icons.tsx` and import it into your Android project as a Vector Drawable.

### b. Audio Files

The app uses two audio files for feedback:

1.  `completion-sound.mp3`: Played when the entire list of Adhkar is completed.
2.  `single-completion.mp3`: Played when a single Dhikr's counter is completed.

*   **Location:** Both files are in the `/public/` directory of the web project.
*   **Action:** You need to copy these two files into your Android project's `res/raw` directory to use them with `MediaPlayer` or `SoundPool`.

## 4. Firebase Configuration (For a Separate Android Build)

You requested a new Firebase build. You will need to create a new Firebase project or add an Android app to your existing one in the [Firebase Console](https://console.firebase.google.com/).

Once you create the Android app in Firebase, you will be prompted to download a `google-services.json` file. Place this file in the `app` module (directory) of your Android project.

Here is a **sample** `google-services.json` structure for your reference. **Do not use this sample directly.** You must download your own unique file from your Firebase project.

```json
{
  "project_info": {
    "project_number": "123456789012",
    "project_id": "adhkar-app-android",
    "storage_bucket": "adhkar-app-android.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:123456789012:android:a1b2c3d4e5f6a7b8c9d0e1",
        "android_client_info": {
          "package_name": "com.example.adhkarapp"
        }
      },
      "oauth_client": [],
      "api_key": [
        {
          "current_key": "YOUR_ANDROID_API_KEY_FROM_FIREBASE"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": []
        }
      }
    }
  ],
  "configuration_version": "1"
}

```

**Next Steps in Firebase:**
While the current app doesn't use Firebase services heavily, you can plan to use them in the Android version for:
*   **Analytics:** To understand user behavior.
*   **Remote Config:** To update Adhkar data without releasing a new app version.
*   **Firestore/Realtime Database:** To sync custom Adhkar across devices (if you add user authentication).

Good luck with the development of your Android app!

    