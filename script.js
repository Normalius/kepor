// Zapis postępów do localStorage
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progressData = {};

    checkboxes.forEach((checkbox) => {
        progressData[checkbox.name] = checkbox.checked;
    });

    localStorage.setItem('activityProgress', JSON.stringify(progressData));
}

// Wczytanie postępów z localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('activityProgress');
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (progressData[checkbox.name] !== undefined) {
                checkbox.checked = progressData[checkbox.name];
            }
        });
    }
    updateChart();
}

// Funkcja do śledzenia postępów
function submitActivity() {
    saveProgress();
    updateChart();
}

// Aktualizacja wykresu aktywności
function updateChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progressData = [];
    checkboxes.forEach((checkbox, index) => {
        progressData.push(checkbox.checked ? 30 + index * 5 : 0);
    });

    progressChart.data.datasets[0].data = progressData;
    progressChart.update();
}

// Zapis kroków do localStorage
function saveSteps() {
    const stepsInputs = document.querySelectorAll('#stepsForm input[type="number"]');
    let stepsData = {};

    stepsInputs.forEach((input) => {
        stepsData[input.name] = input.value;
    });

    localStorage.setItem('stepsData', JSON.stringify(stepsData));
}

// Wczytanie kroków z localStorage
function loadSteps() {
    const savedSteps = localStorage.getItem('stepsData');
    if (savedSteps) {
        const stepsData = JSON.parse(savedSteps);
        const stepsInputs = document.querySelectorAll('#stepsForm input[type="number"]');
        stepsInputs.forEach((input) => {
            if (stepsData[input.name] !== undefined) {
                input.value = stepsData[input.name];
            }
        });
    }
    updateStepsChart();
}

// Funkcja do śledzenia kroków
function submitSteps() {
    saveSteps();
    updateStepsChart();
}

// Wykres kroków
const stepsCtx = document.getElementById('stepsChart').getContext('2d');
let stepsChart = new Chart(stepsCtx, {
    type: 'bar',
    data: {
        labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
        datasets: [{
            label: 'Liczba kroków',
            data: [10000, 10000, 10000, 10000, 10000, 10000, 10000],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
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

// Wykres postępów
const progressCtx = document.getElementById('progressChart').getContext('2d');
let progressChart = new Chart(progressCtx, {
    type: 'line',
    data: {
        labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
        datasets: [{
            label: 'Postępy w ćwiczeniach',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 2
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

// Ładowanie postępów i kroków przy starcie
window.onload = function() {
    loadProgress();
    loadSteps();
};
