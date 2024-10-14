// Zapisanie danych w LocalStorage
function saveSteps(day, steps) {
    let stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData[day] = steps;
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
}

// Załadowanie danych z LocalStorage
function loadSteps() {
    let stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    let stepsArray = [];

    for (let i = 1; i <= 7; i++) {
        stepsArray.push(stepsData[`day${i}`] || 0);
    }

    updateStepsChart(stepsArray); // Wywołanie funkcji updateStepsChart
}

// Funkcja aktualizująca wykres z krokami
function updateStepsChart(stepsData) {
    const ctx = document.getElementById('stepsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Steps',
                data: stepsData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
}

// Funkcja przypisywania kroków
function assignSteps(day, steps) {
    saveSteps(day, steps);
    loadSteps(); // Załadowanie i aktualizacja wykresu po dodaniu kroków
}

// Nasłuchiwanie na kliknięcie przycisku dodawania kroków
document.getElementById('saveStepsButton').addEventListener('click', function () {
    const day = document.getElementById('daySelector').value;
    const steps = parseInt(document.getElementById('stepsInput').value);

    if (!isNaN(steps)) {
        assignSteps(day, steps);
    } else {
        alert('Please enter a valid number of steps.');
    }
});

// Inicjalizacja wykresu po załadowaniu strony
window.onload = function () {
    loadSteps(); // Załadowanie danych i wykresu przy starcie
};
