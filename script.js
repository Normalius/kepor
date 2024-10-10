// Funkcja do zapisu postępów do localStorage
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progressData = {};

    checkboxes.forEach((checkbox) => {
        progressData[checkbox.name] = checkbox.checked;  // Przechowujemy stan zaznaczeń
    });

    localStorage.setItem('activityProgress', JSON.stringify(progressData));  // Zapisujemy jako string w localStorage
}

// Funkcja do wczytania postępów z localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('activityProgress');
    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);  // Odczytujemy dane z localStorage

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (progressData[checkbox.name] !== undefined) {
                checkbox.checked = progressData[checkbox.name];  // Odtwarzamy stan checkboxów
            }
        });
    }
    updateChart();  // Zaktualizowanie wykresu na podstawie wczytanych danych
}

// Funkcja do śledzenia postępów i zapisywania ich
function submitActivity() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let completedDays = [];
    
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            completedDays.push(checkbox.parentNode.textContent.trim());
        }
    });

    if (completedDays.length > 0) {
        alert('Zaznaczone dni: ' + completedDays.join(', '));
    } else {
        alert('Nie zaznaczono żadnych dni.');
    }

    saveProgress();  // Zapisz postępy po kliknięciu
    updateChart();  // Zaktualizowanie wykresu po zapisaniu postępów
}

// Funkcja aktualizacji wykresu
function updateChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progressData = [];
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            progressData.push(30 + index * 5);  // przykładowe wartości
        } else {
            progressData.push(0);  // Jeśli dzień nie jest zaznaczony, wartość postępu to 0
        }
    });

    progressChart.data.datasets[0].data = progressData;
    progressChart.update();
}

// Wczytanie zapisanych danych po załadowaniu strony
window.onload = function() {
    loadProgress();
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
