# React Task Manager 🤖

A modern, interactive Task Manager application built with React 19, Vite, and Tailwind CSS v4. This application features a beautiful UI with dark mode support, organized task groups, and a delightful Digital Helper that reacts to your actions.

![Project Banner](public/vite.svg) <!-- Replace with actual screenshot if available later -->

## ✨ Features

- **Smart Task Management**: Organize tasks into custom groups to keep your life sorted.
- **Interactive Digital Helper**: A friendly robot assistant that celebrates your wins, gets sad when you delete tasks, and keeps you company.
- **Theming**: Fully supported Light and Dark modes with a smooth toggle and persistent preference.
- **Fluid Animations**: Smooth transitions and Lottie animations for a premium feel.
- **Local Storage**: Your data persists automatically, so you never lose track of your tasks.
- **Responsive Design**: Looks great on desktop, tablet, and mobile.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Lottie React](https://lottiereact.com/)
- **Icons**: [Heroicons](https://heroicons.com/)

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-final-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal).

## 📖 Usage

### Managing Groups
- **Create**: Click the "+" tab to add a new task group (e.g., "Work", "Personal").
- **Switch**: Click on any group tab to view tasks for that specific category.
- **Delete**: Remove a group (and its tasks) using the trash icon in the group header. *Note: You cannot delete a group with uncompleted tasks.*

### Managing Tasks
- **Add**: Type your task in the input field and press Enter or click the "+" button.
- **Complete**: Click the circle checkbox to mark a task as done. Watch the robot celebrate! 🎉
- **Delete**: Click the trash icon to remove a task. The robot might be sad to see it go. 😢
- **Edit**: Double-click (or use the edit button) to modify task text.

### Themes
Toggle between Light ☀️ and Dark 🌙 modes using the switch in the top right corner.

## 📂 Project Structure

```
src/
├── assets/             # Static assets (images, animations)
│   └── animations/     # Lottie JSON files
├── components/         # Reusable React components
│   ├── BackgroundLayer.jsx
│   ├── DigitalHelper.jsx
│   ├── Footer.jsx
│   ├── GroupTabs.jsx
│   ├── TaskGroup.jsx
│   ├── TaskItem.jsx
│   └── ThemeToggle.jsx
├── App.jsx            # Main application component
├── index.css          # Global styles & Tailwind imports
└── main.jsx           # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
