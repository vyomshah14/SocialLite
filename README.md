# SocialLite 🚀

A modern, responsive, and feature-rich social media lite application built with React, Vite, and Tailwind CSS.

## 🌟 Features

- **Dynamic Feed:** A fully interactive feed with a sleek UI to view the latest posts.
- **Bento Post Grid:** Alternative "Bento" style grid layout for visualizing media and posts (`BentoFeed`, `BentoPostCard`).
- **User Profile:** Dedicated profile pages displaying user details, their posts, and activities.
- **Messaging:** Chat interface to connect and communicate with friends.
- **Friends & Search:** Comprehensive search to find users and a dedicated friends management page.
- **Notifications:** Keep track of recent interactions, friend requests, and updates.
- **Post Composer:** An intuitive component for drafting and publishing new posts.
- **Mobile-First Design:** Featuring a bottom mobile tab bar (`MobileTabs`) for seamless navigation on smaller screens.
- **Skeleton Loading States:** Providing a smooth user experience during data fetching.
- **Authentication:** Login and signup workflows (`Auth.jsx`).

## 💻 Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vyomshah14/SocialLite.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Mini-project
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```

### Build for Production

To create an optimized production build:
```bash
npm run build
```

## 📂 Project Structure

- `src/components/`: Core UI components including Feed, Profile, Messaging, Notifications, MobileTabs, etc.
- `src/pages/`: Main application pages like Authentication.
- `src/data/`: Mock data or initial state definitions for posts and bento posts.
- `src/App.jsx` & `src/main.jsx`: Application entry points.
