# Kajwala


<p align="center">
  <img src="https://i.ibb.co.com/fGk1MqS5/Screenshot-2025-11-19-093605.png" alt="Banner" height="800" width="800" />
</p>

**Live Site:** (https://kajwala.netlify.app/)


## Description
Kajwala is a full-stack service marketplace platform where users can browse, book, and manage various handyman and home services. Service providers can track their bookings, revenue, and ratings. The platform is fully responsive with smooth animations and interactive analytics dashboards.

## Key Features
- **User Authentication:** Secure login and registration using Firebase.  
- **Profile Management:** Users can update their profile photo, name, and view last login information.  
- **Service Management:** Providers can add, update, and delete services.  
- **Booking System:** Users can book services, view booking history, and providers can manage bookings.  
- **Interactive Charts:** Analytics dashboards using Recharts to visualize service data and revenue distribution.  
- **RESTful Backend:** Full CRUD API built with Express.js and MongoDB.  
- **Search & Filter:** Services can be searched and filtered by price range.  
- **Notifications:** Real-time notifications using React Hot Toast for user actions.  
- **Responsive Design:** Fully responsive layout using TailwindCSS and DaisyUI components.  
- **Smooth Animations:** Interactive UI elements powered by Framer Motion.  
- **Alerts & Modals:** SweetAlert2 integration for confirmations and feedback.  

## Tech Stack
- **Frontend:** React, TailwindCSS, DaisyUI, Framer Motion, Lucide React, React Router  
- **Backend:** Node.js, Express.js, MongoDB, REST APIs  
- **Authentication:** Firebase Auth  
- **Data Fetching:** Axios  
- **Charts & Analytics:** Recharts  
- **Notifications:** React Hot Toast  
- **Build Tools & Dev:** Vite, ESLint  


💻 Install on Your Device

Follow these steps to set up the Kajwala Client project locally:

* 1. Clone the repository:- https://github.com/ArmanMirDeV/Kajwala-Client.git
* 2. Install dependencies
* npm install
* 3. Run the development server
* npm run dev

## Dependencies

The project uses the following dependencies (from `package.json`):

```json
{
  "name": "kajwala-client1",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "axios": "^1.13.2",
    "daisyui": "^5.4.7",
    "firebase": "^12.5.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.553.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.9.5",
    "recharts": "^3.4.1",
    "sweetalert2": "^11.26.3",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }
}
