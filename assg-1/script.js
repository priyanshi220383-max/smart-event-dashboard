// targetting the elements
const eventForm = document.getElementById("eventForm");
const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const eventCategory = document.getElementById("eventCategory");
const eventDescription = document.getElementById("eventDescription");
const eventContainer = document.getElementById("eventContainer");
const clearAllBtn = document.getElementById("clearAllBtn");
const addSampleBtn = document.getElementById("addSampleBtn");
const demoContent = document.getElementById("demoContent");

const sampleEvents = [
    {
        title: "Web Development Workshop",
        date: "2026-12-04",
        category: "Workshop",
        description: "Hands-on webinar on modern web development techniques"
    },
    {
        title: "Cyber Security Conference",
        date: "2026-12-05",
        category: "Conference",
        description: "Exploring career pathways in cybersecurity and web development"
    }
];

// Create event card
function createEventCard(eventData) {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
        <button class="delete-btn">×</button>
        <h3>${eventData.title}</h3>
        <div class="date">${formatDate(eventData.date)}</div>
        <span class="category">${eventData.category}</span>
        <p>${eventData.description}</p>
    `;
    return card;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Show empty state
function showEmptyState() {
    if (!eventContainer.querySelector(".empty-state")) {
        const div = document.createElement("div");
        div.className = "empty-state";
        div.textContent = "No events yet. Add your first event!";
        eventContainer.appendChild(div);
    }
}

// Remove empty state
function removeEmptyState() {
    const emptyState = eventContainer.querySelector(".empty-state");
    if (emptyState) {
        emptyState.remove();
    }
}

// Add event to container
function addEvent(eventData) {
    removeEmptyState();
    const card = createEventCard(eventData);
    eventContainer.appendChild(card);
    
    // Add delete functionality to this specific card
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        card.remove();
        if (eventContainer.querySelectorAll(".event-card").length === 0) {
            showEmptyState();
        }
    });
}

// Form submission
eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const eventData = {
        title: eventTitle.value,
        date: eventDate.value,
        category: eventCategory.value,
        description: eventDescription.value
    };
    
    addEvent(eventData);
    eventForm.reset();
});

// Clear all events
clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all events?")) {
        eventContainer.innerHTML = "";
        showEmptyState();
    }
});

// Add sample events
addSampleBtn.addEventListener("click", () => {
    sampleEvents.forEach(eventData => addEvent(eventData));
});

// DOM manipulation demo
document.addEventListener("keydown", (e) => {
    demoContent.textContent = `You pressed: "${e.key}" `;
});

// Initializing statement
showEmptyState();