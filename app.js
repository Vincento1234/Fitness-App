// src/app.js

document.getElementById("login-link").addEventListener("click", showLogin);
document.getElementById("workout-log-link").addEventListener("click", showWorkoutLog);
document.getElementById("dashboard-link").addEventListener("click", showDashboard);

let workoutPlan = []; // Store user-selected exercises

function showLogin() {
    document.getElementById("content").innerHTML = `
        <h2>Login</h2>
        <form>
            <input type="text" placeholder="Username" /><br>
            <input type="password" placeholder="Password" /><br>
            <button>Login</button>
        </form>
    `;
}

function showWorkoutLog() {
    document.getElementById("content").innerHTML = `
        <h2>Log Your Workout</h2>
        <div id="exercise-selector">
            <h3>Select Exercises</h3>
            <select id="exercise-category" onchange="updateExerciseList()">
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="legs">Legs</option>
                <option value="arms">Arms</option>
                <option value="shoulders">Shoulders</option>
                <option value="core">Core</option>
                <option value="cardio">Cardio</option>
            </select>
            <select id="exercise-list"></select>
            <button onclick="addExercise()">Add Exercise</button>
        </div>
        <div id="custom-exercise">
            <h3>Create a Custom Exercise</h3>
            <input type="text" id="custom-exercise-name" placeholder="Exercise Name" />
            <button onclick="addCustomExercise()">Add Custom Exercise</button>
        </div>
        <div id="workout-summary">
            <h3>Workout Plan Summary</h3>
            <ul id="workout-plan-list"></ul>
            <button onclick="saveWorkoutPlan()">Save Workout Plan</button>
        </div>
    `;

    updateExerciseList(); // Initialize exercise list based on default category
}

// Predefined exercises for each category
const exercises = {
    chest: ["Bench Press", "Incline Dumbbell Press", "Chest Fly"],
    back: ["Pull Up", "Lat Pulldown", "Row"],
    legs: ["Squat", "Leg Press", "Lunge"],
    arms: ["Bicep Curl", "Tricep Extension", "Hammer Curl"],
    shoulders: ["Shoulder Press", "Lateral Raise", "Front Raise"],
    core: ["Crunch", "Plank", "Russian Twist"],
    cardio: ["Running", "Cycling", "Jump Rope"]
};

// Update the exercise list based on selected category
function updateExerciseList() {
    const category = document.getElementById("exercise-category").value;
    const exerciseList = document.getElementById("exercise-list");
    exerciseList.innerHTML = ""; // Clear previous options

    exercises[category].forEach(exercise => {
        const option = document.createElement("option");
        option.value = exercise;
        option.textContent = exercise;
        exerciseList.appendChild(option);
    });
}

// Add selected exercise to workout plan
function addExercise() {
    const exercise = document.getElementById("exercise-list").value;
    workoutPlan.push(exercise);
    updateWorkoutPlan();
}

// Add custom exercise to workout plan
function addCustomExercise() {
    const customExercise = document.getElementById("custom-exercise-name").value;
    if (customExercise) {
        workoutPlan.push(customExercise);
        document.getElementById("custom-exercise-name").value = ""; // Clear input
        updateWorkoutPlan();
    }
}

// Update the workout summary display
function updateWorkoutPlan() {
    const workoutPlanList = document.getElementById("workout-plan-list");
    workoutPlanList.innerHTML = ""; // Clear previous list

    workoutPlan.forEach((exercise, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = exercise;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
            workoutPlan.splice(index, 1); // Remove exercise from array
            updateWorkoutPlan(); // Update display
        };
        listItem.appendChild(removeButton);
        workoutPlanList.appendChild(listItem);
    });
}

// Save the workout plan (for now, just log it to console)
function saveWorkoutPlan() {
    console.log("Workout Plan:", workoutPlan);
    alert("Workout Plan saved!");
}
