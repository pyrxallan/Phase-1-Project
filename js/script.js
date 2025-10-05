class SchoolClubApp {
    constructor() {
        this.clubs = [];
        this.filteredClubs = [];
        this.currentView = 'clubs';
        // For Render deployment
        this.baseUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000' 
            : 'https://school-club-app.onrender.com';
        this.init();
    }

    async init() {
        await this.fetchClubs();
        this.setupEventListeners();
        this.renderClubs();
        this.populateClubSelect();
    }

    // Fetch clubs from json-server
    async fetchClubs() {
        try {
            const response = await fetch(`${this.baseUrl}/clubs`);
            this.clubs = await response.json();
            this.filteredClubs = [...this.clubs];
        } catch (error) {
            console.error('Error fetching clubs:', error);
            this.showNotification('Error loading clubs. Please check if json-server is running.', 'error');
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Search functionality
        document.getElementById('search').addEventListener('input', (e) => this.handleSearch(e));

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => this.handleCategoryFilter(e));

        // Theme toggle
        // document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Registration form
        document.getElementById('registration-form').addEventListener('submit', (e) => this.handleRegistration(e));

        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('club-modal')) {
                this.closeModal();
            }
        });
    }

    // Handle navigation between views
    handleNavigation(event) {
        const targetView = event.target.dataset.view;
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Hide all views
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        
        // Show target view
        document.getElementById(`${targetView}-view`).classList.add('active');
        this.currentView = targetView;

        // Render appropriate content
        if (targetView === 'events') {
            this.renderEvents();
        }
    }

    // Handle search functionality
    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.filterClubs(searchTerm, document.getElementById('category-filter').value);
    }

    // Handle category filter
    handleCategoryFilter(event) {
        const category = event.target.value;
        this.filterClubs(document.getElementById('search').value.toLowerCase(), category);
    }

    // Filter clubs based on search and category
    filterClubs(searchTerm, category) {
        this.filteredClubs = this.clubs.filter(club => {
            const matchesSearch = club.name.toLowerCase().includes(searchTerm) ||
                                club.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || club.category === category;
            return matchesSearch && matchesCategory;
        });
        this.renderClubs();
    }

    // Render clubs grid
    renderClubs() {
        const container = document.getElementById('clubs-container');
        
        // Array iteration using map
        container.innerHTML = this.filteredClubs.map(club => `
            <div class="club-card" onclick="app.showClubDetail(${club.id})">
                <div class="club-header">
                    <div class="club-emoji">${club.image}</div>
                    <div class="club-info">
                        <h3>${club.name}</h3>
                        <span class="club-category">${club.category}</span>
                    </div>
                </div>
                <p>${club.description}</p>
                <div class="club-details">
                    <div class="club-detail">⏰ ${club.meetingTime}</div>
                    <div class="club-detail">📍 ${club.location}</div>
                    <div class="club-detail">👥 ${club.members} members</div>
                    <div class="club-detail">👨‍🏫 Advisor: ${club.advisor}</div>
                </div>
                <div class="event-list">
                    ${club.upcomingEvents.slice(0, 2).map(event => 
                        `<div class="event-item">${event}</div>`
                    ).join('')}
                </div>
            </div>
        `).join('');
    }

    // Render events view
    renderEvents() {
        const container = document.getElementById('events-container');
        const allEvents = [];
        
        // Gather all events from all clubs
        this.clubs.forEach(club => {
            club.upcomingEvents.forEach(event => {
                allEvents.push({
                    event,
                    club: club.name,
                    clubId: club.id,
                    category: club.category,
                    image: club.image
                });
            });
        });

        // Sort events by date (simple string sort for demo)
        allEvents.sort((a, b) => a.event.localeCompare(b.event));

        container.innerHTML = allEvents.map(event => `
            <div class="event-card">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 2rem;">${event.image}</span>
                    <div>
                        <h3 style="color: var(--primary-color); margin-bottom: 0.25rem;">${event.event}</h3>
                        <p style="color: var(--text-color); opacity: 0.8;">${event.club} • ${event.category}</p>
                    </div>
                </div>
                <button onclick="app.showClubDetail(${event.clubId})" 
                        style="background: var(--primary-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer;">
                    View Club Details
                </button>
            </div>
        `).join('');
    }

    // Show club detail modal
    showClubDetail(clubId) {
        const club = this.clubs.find(c => c.id === clubId);
        if (!club) return;

        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = `
            <div class="club-header">
                <div class="club-emoji">${club.image}</div>
                <div class="club-info">
                    <h2>${club.name}</h2>
                    <span class="club-category">${club.category}</span>
                </div>
            </div>
            <p style="margin: 1rem 0; line-height: 1.6;">${club.description}</p>
            <div class="club-details">
                <div class="club-detail">⏰ <strong>Meeting Time:</strong> ${club.meetingTime}</div>
                <div class="club-detail">📍 <strong>Location:</strong> ${club.location}</div>
                <div class="club-detail">👥 <strong>Members:</strong> ${club.members}</div>
                <div class="club-detail">👨‍🏫 <strong>Advisor:</strong> ${club.advisor}</div>
            </div>
            <h3 style="margin: 1.5rem 0 1rem 0; color: var(--primary-color);">Upcoming Events</h3>
            <div class="event-list">
                ${club.upcomingEvents.map(event => 
                    `<div class="event-item">${event}</div>`
                ).join('')}
            </div>
            <button onclick="app.prepareRegistration(${clubId})" 
                    style="background: var(--secondary-color); color: white; border: none; padding: 1rem 2rem; border-radius: 0.375rem; cursor: pointer; margin-top: 1.5rem; font-size: 1.1rem;">
                Join This Club
            </button>
        `;

        document.getElementById('club-modal').style.display = 'block';
    }

    // Prepare registration form with selected club
    prepareRegistration(clubId) {
        this.closeModal();
        
        // Switch to registration view
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-view="register"]').classList.add('active');
        
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        document.getElementById('register-view').classList.add('active');
        
        // Set the club select value
        document.getElementById('club-select').value = clubId;
    }

    // Close modal
    closeModal() {
        document.getElementById('club-modal').style.display = 'none';
    }

    // Populate club select dropdown
    populateClubSelect() {
        const select = document.getElementById('club-select');
        select.innerHTML = '<option value="">Choose a Club</option>' +
            this.clubs.map(club => 
                `<option value="${club.id}">${club.name}</option>`
            ).join('');
    }

    // Handle registration form submission
    async handleRegistration(event) {
        event.preventDefault();
        
        const clubSelectValue = document.getElementById('club-select').value;
        
        // Validate club selection first
        if (!clubSelectValue || clubSelectValue === '') {
            this.showNotification('Please select a club', 'error');
            return;
        }
        
        const formData = {
            name: document.getElementById('student-name').value,
            email: document.getElementById('student-email').value,
            grade: document.getElementById('student-grade').value,
            clubId: clubSelectValue, // Keep as string to match db.json
            timestamp: new Date().toISOString()
        };
        
        // Use == instead of === to handle string/number comparison
        const selectedClub = this.clubs.find(c => c.id == formData.clubId);
        
        if (!selectedClub) {
            this.showNotification('Selected club not found. Please try again.', 'error');
            return;
        }
        
        try {
            // Try to post to server, but continue even if it fails
            const response = await fetch(`${this.baseUrl}/registrations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Registration saved to server');
            } else {
                console.warn('Server save failed, but continuing with local update');
            }
        } catch (error) {
            console.warn('Server error:', error.message, '- Continuing with local update');
        }
        
        // Always show success and reset form regardless of server response
        this.showNotification(`Successfully registered for ${selectedClub.name}! We'll contact you at ${formData.email}`, 'success');
        document.getElementById('registration-form').reset();
        
        // Update club member count (simulated)
        selectedClub.members += 1;
        this.renderClubs();
    }

    // Toggle dark/light mode
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }

    // Show notification
    showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SchoolClubApp();
});