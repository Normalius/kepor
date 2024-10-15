document.addEventListener('DOMContentLoaded', () => {
    let points = 0;
    const stepGoal = 10000;
    let stepsToday = 0;
    let weightData = [];
    
    // Dark Mode Toggle
    const toggleThemeBtn = document.getElementById('toggle-theme');
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Calculate Calories
    document.getElementById('calorie-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const activity = document.getElementById('activity').value;
        const duration = Number(document.getElementById('duration').value);
        const weight = Number(document.getElementById('weight').value);
        const calories = calculateCalories(activity, duration, weight);
        document.getElementById('calories-burned').textContent = calories.toFixed(2);
    });

    function calculateCalories(activity, duration, weight) {
        const METs = {
            walking: 3.5,
            running: 7,
            cycling: 6
        };
        return METs[activity] * 3.5 * weight / 200 * duration;
    }

    // Weight Tracking
    document.getElementById('weight-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const weightEntry = Number(document.getElementById('weight-entry').value);
        weightData.push(weightEntry);
        updateWeightChart(weightData);
    });

    function updateWeightChart(weightData) {
        const ctx = document.getElementById('weightChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: weightData.map((_, index) => `Day ${index + 1}`),
                datasets: [{
                    label: 'Weight (kg)',
                    data: weightData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                }]
            }
        });
    }

    // Daily Challenge
    document.getElementById('complete-challenge').addEventListener('click', () => {
        points += 10;
        document.getElementById('points').textContent = points;
        alert('Challenge Completed! You earned 10 points.');
    });

    // Step Tracker (mock data for now)
    document.getElementById('steps-today').textContent = stepsToday;
    document.getElementById('step-goal').textContent = stepGoal;

    // Weekly Progress (mock chart data)
    const ctx = document.getElementById('activityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Steps',
                data: [8000, 10000, 12000, 9000, 7000, 13000, 10000],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
});
