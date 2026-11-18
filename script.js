// COMMUNITY WELLNESS ACTIVITIES

const activities = [
    {
        id: 1,
        name: "Community Morning Walk",
        category: "Movement",
        icon: "🌿",
        date: "21 November 2026",
        time: "7:00 AM - 8:00 AM",
        location: "Rose Garden, Ludhiana",
        organizer: "Ananya Mehta",
        description: "Enjoy a peaceful morning walk and connect with people in your community.",
        accessibility: "Flat walking path. Comfortable shoes recommended."
    },

    {
        id: 2,
        name: "Mindful Breathing Session",
        category: "Mindfulness",
        icon: "🧘",
        date: "22 November 2026",
        time: "9:00 AM - 10:00 AM",
        location: "Community Hall, Ludhiana",
        organizer: "Rohan Kapoor",
        description: "Learn simple breathing exercises in a calm and welcoming environment.",
        accessibility: "Seated participation is available."
    },

    {
        id: 3,
        name: "Tea and Talk Gathering",
        category: "Social",
        icon: "☕",
        date: "24 November 2026",
        time: "5:00 PM - 6:00 PM",
        location: "Model Town, Ludhiana",
        organizer: "Simran Patel",
        description: "Meet new people, share conversations and build genuine connections.",
        accessibility: "Indoor seating available."
    },

    {
        id: 4,
        name: "Beginner Yoga Session",
        category: "Movement",
        icon: "🌱",
        date: "26 November 2026",
        time: "6:30 AM - 7:30 AM",
        location: "Leisure Valley Park",
        organizer: "Ananya Mehta",
        description: "Participate in beginner-friendly yoga and gentle physical activities.",
        accessibility: "Outdoor activity. Adapted movements can be discussed."
    },

    {
        id: 5,
        name: "Creative Journaling Workshop",
        category: "Learning",
        icon: "✍️",
        date: "28 November 2026",
        time: "11:00 AM - 12:00 PM",
        location: "Community Learning Centre",
        organizer: "Simran Patel",
        description: "Explore creativity through writing and simple journaling exercises.",
        accessibility: "Tables and chairs are available."
    },

    {
        id: 6,
        name: "Community Garden Activity",
        category: "Social",
        icon: "🌻",
        date: "29 November 2026",
        time: "8:00 AM - 9:00 AM",
        location: "Green Community Garden",
        organizer: "Ananya Mehta",
        description: "Spend time outdoors while participating in a community gardening activity.",
        accessibility: "Seated tasks can be arranged with the organizer."
    }
];


// DISPLAY ACTIVITIES

const activityContainer = document.getElementById("activityContainer");

function displayActivities(list) {

    activityContainer.innerHTML = "";

    document.getElementById("noResults").hidden = list.length !== 0;

    list.forEach(function(activity) {

        const card = document.createElement("div");

        card.className = "activity-card";

        card.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>

            <span class="category">${activity.category}</span>

            <h3>${activity.name}</h3>

            <p>📅 ${activity.date}</p>

            <p>⏰ ${activity.time}</p>

            <p>📍 ${activity.location}</p>

            <p>Organized by: ${activity.organizer}</p>

            <button class="details-btn">
                View Details
            </button>
        `;

        // VIEW ACTIVITY DETAILS

        card.querySelector(".details-btn").addEventListener("click", function() {

            alert(
                "Activity: " + activity.name +
                "\n\nDescription: " + activity.description +
                "\n\nSchedule: " + activity.date +
                ", " + activity.time +
                "\n\nLocation: " + activity.location +
                "\n\nOrganizer: " + activity.organizer +
                "\n\nAccessibility: " + activity.accessibility
            );

        });

        activityContainer.appendChild(card);

    });

}


// SEARCH ACTIVITIES

const search = document.getElementById("search");

search.addEventListener("input", filterActivities);


// FILTER ACTIVITIES BY CATEGORY

const category = document.getElementById("category");

category.addEventListener("change", filterActivities);


function filterActivities() {

    const searchValue = search.value.toLowerCase();

    const selectedCategory = category.value;

    const filteredActivities = activities.filter(function(activity) {

        const matchesSearch =
            activity.name.toLowerCase().includes(searchValue) ||
            activity.location.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            activity.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayActivities(filteredActivities);

}


// POPULATE REGISTRATION DROPDOWN

const activitySelect = document.getElementById("activity");

activities.forEach(function(activity) {

    const option = document.createElement("option");

    option.value = activity.id;

    option.textContent = activity.name;

    activitySelect.appendChild(option);

});


// GET SAVED REGISTRATIONS

function getRegistrations() {

    return JSON.parse(
        localStorage.getItem("wellnestRegistrations") || "[]"
    );

}


// DISPLAY REGISTRATIONS

function displayRegistrations() {

    const container = document.getElementById("myRegistrations");

    const registrations = getRegistrations();

    container.innerHTML = "";

    if (registrations.length === 0) {

        container.innerHTML = "<p>No registrations yet.</p>";

        return;

    }

    registrations.forEach(function(registration) {

        const card = document.createElement("div");

        card.className = "saved-card";

        const title = document.createElement("h3");
        title.textContent = registration.activity;

        const name = document.createElement("p");
        name.textContent = "Name: " + registration.name;

        const reminder = document.createElement("p");
        reminder.textContent = registration.reminder
            ? "Reminder preference: Enabled"
            : "Reminder preference: Disabled";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Registration";

        removeButton.addEventListener("click", function() {

            removeRegistration(registration.id);

        });

        card.appendChild(title);
        card.appendChild(name);
        card.appendChild(reminder);
        card.appendChild(removeButton);

        container.appendChild(card);

    });

}


// REGISTRATION FORM

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const selectedId = Number(activitySelect.value);

    const selectedActivity = activities.find(function(activity) {

        return activity.id === selectedId;

    });

    const reminder = document.getElementById("reminder").checked;

    if (!selectedActivity) {

        document.getElementById("message").textContent =
            "Please select an activity.";

        return;

    }

    const registrations = getRegistrations();

    const alreadyRegistered = registrations.some(function(registration) {

        return registration.email.toLowerCase() === email.toLowerCase() &&
               registration.activityId === selectedId;

    });

    if (alreadyRegistered) {

        document.getElementById("message").textContent =
            "You are already registered for this activity.";

        return;

    }

    const newRegistration = {

        id: Date.now(),

        name: name,

        email: email,

        activity: selectedActivity.name,

        activityId: selectedId,

        reminder: reminder

    };

    registrations.push(newRegistration);

    localStorage.setItem(
        "wellnestRegistrations",
        JSON.stringify(registrations)
    );

    document.getElementById("message").textContent =
        "Registration completed successfully!";

    registrationForm.reset();

    displayRegistrations();

});


// REMOVE REGISTRATION

function removeRegistration(id) {

    const registrations = getRegistrations();

    const updatedRegistrations = registrations.filter(function(registration) {

        return registration.id !== id;

    });

    localStorage.setItem(
        "wellnestRegistrations",
        JSON.stringify(updatedRegistrations)
    );

    displayRegistrations();

}


// INITIALIZE WEBSITE

displayActivities(activities);

displayRegistrations();