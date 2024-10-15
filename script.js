document.addEventListener('DOMContentLoaded', function() {
    const activityForm = document.getElementById('activityForm');
    const notesInput = document.getElementById('notes');
    const goalStepsInput = document.getElementById('goalSteps');
    const goalTimeInput = document.getElementById('goalTime');
    const clearDataButton = document.getElementById('clearData');

    // Ustawienia wykresów
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
                label: 'Czas (minuty)',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
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

    // Zapis aktywności
    activityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const day = document.getElementById('day').value;
        const steps = document.getElementById('steps').value;
        const time = document.getElementById('time').value;
        const goalSteps = goalStepsInput.value || 10000; // Domyślny cel: 10000 kroków
        const goalTime = goalTimeInput.value || 60; // Domyślny cel: 60 minut

        // Aktualizacja wykresów
        stepsChart.data.datasets[0].data[day - 1] = steps;
        timeChart.data.datasets[0].data[day - 1] = time;
        stepsChart.update();
        timeChart.update();

        // Dodanie notatek do sekcji
        const notesList = document.getElementById('notesList');
        const noteItem = document.createElement('div');
        noteItem.textContent = `Dzień ${day}: ${notesInput.value || 'Brak notatek'}`;
        notesList.appendChild(noteItem);

        // Wyświetlenie cytatu motywacyjnego
        const motivationalQuote = document.getElementById('motivationalQuote');
        axios.get('https://api.quotable.io/random')
            .then(response => {
                motivationalQuote.textContent = `Motywacyjny cytat: "${response.data.content}" - ${response.data.author}`;
            })
            .catch(error => {
                motivationalQuote.textContent = 'Nie udało się pobrać cytatu motywacyjnego.';
            });

        // Wyświetlenie statystyk
        const statsContent = document.getElementById('statsContent');
        const stepsDifference = steps - goalSteps;
        const timeDifference = time - goalTime;
        statsContent.innerHTML = `
            <p>Kroki: ${steps} (${stepsDifference >= 0 ? 'Powyżej celu' : 'Poniżej celu'})</p>
            <p>Czas: ${time} minut (${timeDifference >= 0 ? 'Powyżej celu' : 'Poniżej celu'})</p>
        `;
    });

    // Wyczyść dane
    clearDataButton.addEventListener('click', function() {
        stepsChart.data.datasets[0].data = [];
        timeChart.data.datasets[0].data = [];
        stepsChart.update();
        timeChart.update();
        document.getElementById('notesList').innerHTML = '';
        document.getElementById('statsContent').innerHTML = '';
        document.getElementById('motivationalQuote').innerHTML = '';
    });
});
