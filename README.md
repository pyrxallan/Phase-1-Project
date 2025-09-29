# Phase-1-Project

Moringa School Club Hub 🏫
A modern, responsive Single Page Application (SPA) for managing and discovering school clubs at Moringa School. Built with HTML, CSS, and JavaScript, this platform helps students explore clubs, view events, and register for their interests.

https://img.shields.io/badge/Moringa-School%2520Club%2520Hub-green
https://img.shields.io/badge/JavaScript-ES6+-yellow
https://img.shields.io/badge/API-JSONPlaceholder-blue

🌟 Features
Core Functionality
Club Directory: Browse all available school clubs with detailed information

Smart Search & Filter: Find clubs by name, description, or category

Event Calendar: View upcoming club events and activities

Online Registration: Easy sign-up form for club membership

Responsive Design: Works perfectly on desktop, tablet, and mobile devices

User Experience

Single Page Application: No page reloads, smooth transitions

Modal Club Details: Click any club for more information

Real-time Form Validation: Ensure proper registration data

Notification System: Get feedback on your actions

Technical Features
Public API Integration: Fetches data from JSONPlaceholder API

Async/Await Operations: Handles all API calls asynchronously

Event-Driven Architecture: Multiple event listeners for interactivity

Array Methods: Utilizes map, filter, and forEach for data manipulation

Local Storage: Saves registrations locally


🛠️ Technology Stack
Frontend: HTML5, CSS3, JavaScript (ES6+)

API: JSONPlaceholder (REST API)

Styling: CSS Grid, Flexbox, CSS Variables

Icons: Emoji icons for visual appeal

Font: Inter font family

📋 Project Requirements Met
✅ Single Page Application - No page reloads or redirects
✅ Public API Integration - Uses JSONPlaceholder API
✅ 3+ Distinct Event Listeners:

Click events (navigation, club cards, modal)

Input event (search functionality)

Change event (category filter)

Submit event (registration form)
✅ Array Iteration Methods - map(), filter(), forEach()
✅ Async/Await Operations - All API calls are asynchronous
✅ JSON Communication - Data fetched and handled as JSON
✅ DRY Code Principles - Reusable functions and components

🎯 Installation & Setup
Prerequisites
A modern web browser

Local server (for development)

Internet connection (for API calls)

Quick Start
Clone the repository

bash
git clone https://github.com/your-username/moringa-club-hub.git
cd moringa-club-hub
Run with a local server

bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server


Browse Clubs: View all available clubs on the main page

Search & Filter: Use the search bar and category filter to find specific clubs

View Details: Click any club card to see detailed information

Check Events: Navigate to the Events tab to see upcoming activities

Register: Fill out the registration form to join clubs

For Club Leaders:
The platform provides visibility for your club

Students can easily find and join your activities

Event announcements reach interested students

🔧 API Endpoints Used
The application uses JSONPlaceholder API for demonstration:

GET /posts - Fetches club data (transformed to club format)

POST /posts - Simulates registration submissions

🎨 Customization
Adding New Clubs
Edit the loadFallbackData() method in script.js to add new clubs:


Styling Customization
Modify CSS variables in styles.css:

css
:root {
    --moringa-green: #00B140;
    --moringa-blue: #0056B3;
    /* Add your custom colors */
}
🌐 Browser Support
Chrome 60+

Firefox 55+

Safari 12+

Edge 79+

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Moringa School for the inspiration and branding

JSONPlaceholder for providing free fake API data

Inter font for the beautiful typography

All contributors who help improve this project

📞 Support
If you have any questions or need help with setup:

Create an Issue

Check the FAQ section

Contact the development team

Built with ❤️ for Moringa School Community

Discover • Grow • Transform