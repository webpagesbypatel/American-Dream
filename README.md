<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a75e1c46-7034-452f-9c6a-a2f66f3bfc8e

## Run Locally

To run this application locally on your laptop, follow these steps:

### 1. Prerequisites
Ensure you have Node.js (version 18 or higher) installed on your machine. You can check your version by running `node -v` in your terminal.

### 2. Download the project
Export the project as a ZIP file from the Settings menu in the top right corner of the AI Studio interface, then extract it to a folder on your laptop.

### 3. Run the commands
Open your terminal (Command Prompt, Terminal, or PowerShell), navigate to the project folder, and run:

```bash
# 1. Install all required dependencies
npm install

# 2. Start the development server
npm run dev
```

### 4. View the App
Once the server starts, you will see a URL in your terminal (usually http://localhost:3000 or http://localhost:5173). Open that link in your browser to view your application.

### Important Notes
- **Environment Variables**: If your app uses external APIs (like Gemini or Firebase), make sure to create a `.env` file in the root directory and add your API keys there (refer to `.env.example` if it exists).
- **Port 3000**: In this environment, the app is configured to run on port 3000. If you run it locally, Vite might default to 5173 unless specified otherwise in `vite.config.ts`.
