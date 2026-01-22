# Product Requirements Document (PRD): React Task Manager

## 1. Introduction
This document outlines the specifications for a React-based Task Manager application. The app aims to provide a simple, clean interface for managing daily tasks with persistence, adhering to modern React practices.

## 2. Goals
- Build a functional task management application.
- Use **React 19** with **Vite**.
- Implement styling with **Tailwind CSS**.
- Ensure state persistence using **LocalStorage**.
- Strict adherence to no external state management libraries (no Redux/Zustand).

## 3. Technology Stack
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS
- **Language**: JavaScript
- **State Management**: React Hooks (`useState`, `useEffect` only)
- **Persistence**: Browser LocalStorage

## 4. Component Architecture
The application will consist of at least the following components:

1.  **`App`**
    - Main container.
    - Holds the `tasks` state and `filter` state.
    - Contains handler functions (`addTask`, `toggleTask`, `deleteTask`, `editTask`, `setFilter`).
    - Manages persistence (reading/writing to LocalStorage).

2.  **`TaskInput`**
    - A controlled form component to add new tasks.
    - Props: `onAddTask` (function).

3.  **`TaskList`**
    - Renders the list of tasks based on the current filter.
    - Props: `tasks` (array), `onToggle`, `onDelete`, `onEdit`.

4.  **`TaskItem`**
    - Represents an individual task.
    - Displays text and checkbox.
    - Handles "Edit Mode" local state to allow text modification.
    - Props: `task` (object), `onToggle`, `onDelete`, `onEdit`.

5.  **`Footer` (Stats/Controls)**
    - Displays the count of **active** tasks.
    - Contains filter buttons (All, Active, Completed).
    - Highlights the currently active filter.
    - Props: `activeCount` (number), `currentFilter` (string), `onSetFilter` (function).

## 5. Data Structures

### Task Interface
```typescript
interface Task {
  id: string;        // UUID or Date.now()
  text: string;      // Content of the task
  isCompleted: boolean; // Status
}
```

### Filter Types
- `all`
- `active`
- `completed`

## 6. Functional Requirements

### 6.1 Add Task
- **Input**: User types text into `TaskInput`.
- **Action**: Pressing "Enter" or clicking a "Add" button creates a new task.
- **Validation**: Prevent adding empty tasks.
- **Result**: New task is added to the top or bottom of the list with `isCompleted: false`.

### 6.2 Toggle Status
- **Action**: Clicking the checkbox of a `TaskItem`.
- **Result**: Toggles `isCompleted` between `true` and `false`.
- **Visual**: Completed tasks should be visually distinct (e.g., strikethrough).

### 6.3 Edit Task
- **Action**: User can enter an "edit mode" on a `TaskItem` (e.g., double-click or edit button).
- **Result**: Text becomes an input field. Saving updates the task text.

### 6.4 Delete Task
- **Action**: Clicking a "Delete" button on a `TaskItem`.
- **Result**: Implementation removes the task from the state permanently.

### 6.5 Filtering
- **Options**:
    - **Show All**: Display all tasks.
    - **Show Active**: Display only `isCompleted === false`.
    - **Show Completed**: Display only `isCompleted === true`.
- **Visual Request**: The active filter button must be visually highlighted to indicate selection.

### 6.6 Counter
- Displays the number of remaining active tasks (e.g., "3 items left").

### 6.7 Persistence
- **On Load**: Application checks LocalStorage for saved tasks.
- **On Change**: Any addition, edit, deletion, or toggle updates LocalStorage.

## 7. Styling Guidelines
- Use **Tailwind CSS** for all styling.
- Design should be responsive (mobile-friendly).
- Clean, modern aesthetic.

---
*Generated based on user specifications.*
