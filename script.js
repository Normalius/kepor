document.addEventListener("DOMContentLoaded", () => {
    const activityForm = document.getElementById("activityForm");
    const progressChart = document.getElementById("progressChart").getContext("2d");
    let activities = JSON.parse(localStorage.getItem("activities")) || [];
    
    // Chart.js setup
    const chart = new Chart(progressChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Czas Treningu (min)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Dzień' } },
                y: { title: { display: true, text: 'Czas (min)' } }
            }
        }
    });

    // Load existing activities and update chart
    function loadActivities() {
        activities.forEach(activity => {
            chart.data.labels.push(activity.day);
            chart.data.datasets[0].data.push(activity.duration);
        });
        chart.update();
    }

    // Add activity
    activityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const activity = document.getElementById("activity").value;
        const duration = parseInt(document.getElementById("duration").value);
        const day = `Dzień ${activities.length + 1}`;

        activities.push({ activity, duration, day });
        localStorage.setItem("activities", JSON.stringify(activities));

        // Update chart
        chart.data.labels.push(day);
        chart.data.datasets[0].data.push(duration);
        chart.update();

        // Reset form
        activityForm.reset();
    });

    // Reset progress
    document.getElementById("resetProgress").addEventListener("click", () => {
        localStorage.removeItem("activities");
        activities = [];
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        chart.update();
    });

    loadActivities();
});
