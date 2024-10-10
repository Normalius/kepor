// Funkcja do zapisu postępów do localStorage
function saveProgress(progressData) {
    localStorage.setItem('activityProgress', JSON.stringify(progressData));  // Zapisujemy jako string w localStorage
}

// Funkcja do wczytania postępów z localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('activityProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};  // Odczytujemy dane z localStorage lub zwracamy pusty obiekt
}

// Funkcja do aktualizacji checkboxów na podstawie postępów
function updateCheckboxes(progressData) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = !!progressData[checkbox.name];  // Odtwarzamy stan checkboxów
    });
}

// Funkcja śledzenia postępów i ich zapisu
function trackAndSaveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progressData = {};

    checkboxes.forEach((checkbox) => {
        progressData[checkbox.name] = checkbox.checked;
    });

    saveProgress(progressData);  // Zapisz postępy po kliknięciu
}

// Funkcja aktualizacji wykresu
function updateChart(progressData) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let chartData = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            chartData.push(30 + index * 5);  // przykładowe wartości
        } else {
            chartData.push(0);  // Jeśli dzień nie jest zaznaczony, wartość postępu to 0
        }
    });

    progressChart.data.datasets[0].data = chartData;
    progressChart.update();
}

// Wczytanie zapisanych danych po załadowaniu strony
window.onload = function() {
    const progressData = loadProgress();
    updateCheckboxes(progressData);
    updateChart(progressData);  // Aktualizujemy wykres na podstawie zapisanych postępów
};

// Tworzenie wykresu
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
        datasets: [{
            label: 'Postępy w aktywności',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: 'rgba(41, 128, 185, 1)',
            backgroundColor: 'rgba(41, 128, 185, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Resetowanie postępów po zakończeniu wyzwania (opcjonalne)
function resetProgress() {
    localStorage.removeItem('activityProgress');
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    updateChart({});  // Resetowanie wykresu
}
