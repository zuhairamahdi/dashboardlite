// Load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all components
async function loadAllComponents() {
    await Promise.all([
        loadComponent('sidebarContainer', 'components/sidebar.html'),
        loadComponent('topbarContainer', 'components/topbar.html')
    ]);
    
    // Initialize event listeners after components are loaded
    initializeComponents();
}

// Initialize component event listeners and functions
function initializeComponents() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
        });
    }
}

// Mobile sidebar toggle (global function)
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar && backdrop) {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('hidden');
    }
}

// Submenu toggle (global function)
function toggleSubmenu() {
    const submenu = document.getElementById('submenu');
    const chevron = document.getElementById('chevron');
    if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.classList.toggle('rotate-180');
    }
}

// Notifications dropdown toggle (global function)
function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// User menu dropdown toggle (global function)
function toggleUserMenu() {
    const dropdown = document.getElementById('userMenuDropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsButton = event.target.closest('button[onclick="toggleNotifications()"]');
    
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    const userMenuButton = event.target.closest('button[onclick="toggleUserMenu()"]');
    
    if (notificationsDropdown && !notificationsDropdown.contains(event.target) && !notificationsButton) {
        notificationsDropdown.classList.add('hidden');
    }
    
    if (userMenuDropdown && !userMenuDropdown.contains(event.target) && !userMenuButton) {
        userMenuDropdown.classList.add('hidden');
    }
});

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadAllComponents);
