document.getElementById('activityForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pobierz dane z formularza
    const day = document.getElementById('day').value;
    const steps = document.getElementById('steps').value;
    const time = document.getElementById('time').value;

    // Zapisz dane w localStorage
    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};
    activityData[day] = { steps: parseInt(steps), time: parseInt(time) };
    localStorage.setItem('activityData', JSON.stringify(activityData));

    // Aktualizuj wykresy
    updateCharts();
});

// Inicjalizacja wykresów
const stepsCtx = document.getElementById('stepsChart').getContext('2d');
const timeCtx = document.getElementById('timeChart').getContext('2d');

let stepsChart = new Chart(stepsCtx, {
    type: 'bar',
    data: {
        labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
        datasets: [{
            label: 'Kroki',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let timeChart = new Chart(timeCtx, {
    type: 'line',
    data: {
        labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
        datasets: [{
            label: 'Czas ćwiczeń (minuty)',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Funkcja do aktualizacji wykresów
function updateCharts() {
    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};

    const stepsData = [];
    const timeData = [];

    for (let i = 1; i <= 7; i++) {
        const dayData = activityData[i] || { steps: 0, time: 0 };
        stepsData.push(dayData.steps);
        timeData.push(dayData.time);
    }

    stepsChart.data.datasets[0].data = stepsData;
    stepsChart.update();

    timeChart.data.datasets[0].data = timeData;
    timeChart.update();
}

// Załaduj dane z localStorage przy starcie
window.onload = updateCharts;
