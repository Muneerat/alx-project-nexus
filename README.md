# 🗳️ ProDev FE: Real-Time Online Poll System

## Project Overview

The **Real-Time Online Poll System** is an interactive web application designed to simulate a real-world platform where users can create, vote on, and view the live results of polls. This project emphasizes modern front-end development practices, focusing on **real-time data updates**, **efficient state management**, and **dynamic data visualization** to deliver a seamless user experience.

---

## 🎯 Project Goals

The primary objectives for developing this platform were to gain hands-on experience with:

* **API Integration:** Successfully fetch and display poll questions and real-time results from a backend API.
* **State Management:** Utilize **Redux** to efficiently manage complex application state, ensuring predictability and maintainability.
* **Dynamic Visualizations:** Implement a charting library to visually represent live poll results, updating charts without requiring a page refresh.
* **Type Safety:** Employ **TypeScript** across the codebase for enhanced type checking and maintainability.

---

## ✨ Key Features

| Feature Category | Description |
| :--- | :--- |
| **Poll Creation & Voting** | Users can create new polls with customizable options, submit their votes on active polls, and easily share them. |
| **Real-Time Results Display** | Poll results are fetched and displayed live as votes are submitted. |
| **Dynamic Visualizations** | Poll results are presented using engaging, responsive charts that update in real-time. |
| **Form Validation** | Robust validation on the poll creation form ensures data integrity and provides user-friendly error messages. |
| **Seamless UX** | The interface is intuitive, visually appealing, and delivers smooth, no-delay updates. |

---

## 🚀 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React/React Native** | Core library for building the component-based user interface. |
| **Redux Toolkit (RTK)** | Enterprise-grade toolset for scalable and predictable state management. |
| **TypeScript** | Adds static type checking to enhance code quality and reduce runtime errors. |
| **Charting Library** | Used for creating dynamic and responsive visualizations (e.g., Chart.js, Recharts, or Nivo). |
| **Vercel/Netlify** | Platform used for continuous deployment and public access. |

---

## 💻 Setup and Installation

Follow these steps to get a local copy of the project up and running.

### Prerequisites

* Node.js (v14+)
* npm or yarn

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [PROJECT_FOLDER_NAME]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your API endpoint:
    ```
    REACT_APP_API_BASE_URL=[YOUR_API_ENDPOINT]
    ```

4.  **Run the application:**
    ```bash
    npm start
    # OR
    yarn start
    ```
    The application should now be running at `http://localhost:3000`.

