# How to Deploy Your Next.js Application

This guide provides the steps to deploy your Adhkar application to a live web server. This project is a standard Next.js application and is best deployed on a platform that supports Node.js environments.

The recommended and most straightforward option is **Firebase App Hosting**, as this project is already configured for it. An excellent free alternative is **Vercel**.

## Key Concepts

You don't need to generate or export special files for deployment. The process works like this:
1.  You push your project's code to a Git repository (like GitHub).
2.  You connect a hosting provider (like Vercel or Firebase) to your GitHub repository.
3.  The hosting provider automatically pulls your code, runs the build command (`npm run build`), and deploys the optimized result to its global network.

---

## Step 1: Push Your Code to GitHub

Before you can deploy, your project's code needs to be in a GitHub repository. If you've never used Git or GitHub, follow these steps carefully.

1.  **Create a GitHub Account:** If you don't have one, sign up at [https://github.com](https://github.com).

2.  **Install Git:** You need to have Git installed on your computer. You can download it from [git-scm.com](https://git-scm.com/).

3.  **Create a New Repository on GitHub:**
    *   On your GitHub account, click the `+` icon in the top-right corner and select "New repository".
    *   Give your repository a name (e.g., `rafiq-app`).
    *   Choose "Public" so you can deploy it for free.
    *   **IMPORTANT:** Do NOT initialize the repository with a README, .gitignore, or license. Keep it empty.
    *   Click "Create repository".

4.  **Upload Your Code from Your Computer:**
    *   Open a terminal or command prompt on your computer.
    *   Navigate to your project's folder. It's the folder that contains `package.json`, `src`, etc.
    *   Now, run the following commands one by one. After creating your repository on GitHub, it will show you a URL. Copy it and use it in the command below where it says `YOUR_GITHUB_REPOSITORY_URL`.

    ```bash
    # Initializes a new Git repository in your project folder.
    git init
    ```

    ```bash
    # Adds all the project files to be tracked by Git.
    git add .
    ```

    ```bash
    # Commits (saves) the files with a message.
    git commit -m "First commit: Initial project setup"
    ```
    
    ```bash
    # Sets the main branch name to 'main'.
    git branch -M main
    ```

    ```bash
    # Connects your local repository to the one you created on GitHub.
    # Make sure to replace the URL with your own.
    git remote add origin YOUR_GITHUB_REPOSITORY_URL
    ```
    
    ```bash
    # Pushes (uploads) your code to the GitHub repository.
    git push -u origin main
    ```

After running these commands, refresh your GitHub repository page. You should see all your project files there. Now you are ready for the next step!

---

## Step 2 (Option A): Deploy to Vercel (Recommended Free Option)

Vercel is the company that created Next.js, and it offers a seamless deployment experience.

1.  **Sign up for Vercel:** Go to [https://vercel.com](https://vercel.com) and sign up with your GitHub account. It's free.
2.  **Import Project:** From your Vercel dashboard, click "Add New... > Project".
3.  **Select GitHub Repository:** Find and select the `rafiq-app` repository you just pushed your code to.
4.  **Deploy:** Vercel will automatically detect that it's a Next.js project and configure all the build settings for you. Simply click the "Deploy" button.

Your app will be built and deployed, and you will be provided with a live URL (e.g., `rafiq-app.vercel.app`) that you can share with everyone.

---

## Step 2 (Option B): Deploy to Firebase App Hosting

Your project contains a file named `apphosting.yaml`, which pre-configures it for Firebase App Hosting.

1.  **Go to the Firebase Console:** Visit [https://console.firebase.google.com/](https://console.firebase.google.com/) and sign in with your Google account.

2.  **Create a Firebase Project:**
    *   Click "Add project".
    *   Give your project a name (e.g., "Rafiq PWA") and follow the on-screen steps.

3.  **Navigate to App Hosting:**
    *   Once your project is created, look for the "Build" section in the left-hand menu.
    *   Click on **App Hosting**.

4.  **Create a Backend and Connect GitHub:**
    *   Follow the wizard to create a new backend.
    *   It will ask you to connect to GitHub. Authorize Firebase to access your repositories.
    *   Select the GitHub repository you created in Step 1.

5.  **Deploy:**
    *   Firebase will automatically detect your `apphosting.yaml` file and configure the deployment settings.
    *   Finalize the setup. Firebase will begin building and deploying your application.

After a few minutes, your site will be live on a `*.web.app` URL. You can also connect a custom domain through the Firebase console.
