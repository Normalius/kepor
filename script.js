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
}

function updateChart() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let progressData = [];
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            progressData.push(30 + index * 5); // przykładowe wartości
        } else {
            progressData.push(0); // Jeśli dzień nie jest zaznaczony, wartość postępu to 0
        }
    });

    progressChart.data.datasets[0].data = progressData;
    progressChart.update();
}

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
