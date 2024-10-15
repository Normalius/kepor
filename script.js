document.addEventListener('DOMContentLoaded', () => {
    const activityForm = document.getElementById('activityForm');
    const notesInput = document.getElementById('notes');
    const goalStepsInput = document.getElementById('goalSteps');
    const goalTimeInput = document.getElementById('goalTime');
    const clearDataButton = document.getElementById('clearData');

    // Inicjalizacja wykresów z funkcjami strzałkowymi
    const stepsCtx = document.getElementById('stepsChart').getContext('2d');
    const timeCtx = document.getElementById('timeChart').getContext('2d');

    let stepsChart = initChart(stepsCtx, 'Kroki', 'bar', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)');
    let timeChart = initChart(timeCtx, 'Czas Ćwiczeń (minuty)', 'line', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 1)');

    // Rejestracja zdarzeń
    activityForm.addEventListener('submit', saveActivity);
    clearDataButton.addEventListener('click', clearData);

    // Wywołanie na starcie
    updateCharts();
    displayStats();
    displayNotes();

    // Funkcja inicjalizacji wykresu
    function initChart(ctx, label, type, bgColor, borderColor) {
        return new Chart(ctx, {
            type: type,
            data: {
                labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
                datasets: [{
                    label: label,
                    data: [],
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Funkcja zapisu aktywności
    async function saveActivity(event) {
        event.preventDefault();

        const day = document.getElementById('day').value;
        const steps = parseInt(document.getElementById('steps').value);
        const time = parseInt(document.getElementById('time').value);

        if (steps < 0 || time < 0) {
            alert("Liczba kroków i czas ćwiczeń nie mogą być ujemne!");
            return;
        }

        const notes = notesInput.value;
        const goalSteps = goalStepsInput.value ? parseInt(goalStepsInput.value) : null;
        const goalTime = goalTimeInput.value ? parseInt(goalTimeInput.value) : null;

        const activityData = await loadActivityData();

        activityData[day] = { steps, time, notes, goalSteps, goalTime };

        await saveActivityData(activityData);
        updateCharts();
        displayStats();
        displayNotes();
        activityForm.reset();
    }

    // Funkcje do zarządzania danymi z localStorage
    const loadActivityData = async () => {
        return JSON.parse(localStorage.getItem('activityData')) || {};
    };

    const saveActivityData = async (data) => {
        localStorage.setItem('activityData', JSON.stringify(data));
    };

    // Funkcja aktualizacji wykresów
    function updateCharts() {
        loadActivityData().then(activityData => {
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
        });
    }

    // Wyświetlanie statystyk
    function displayStats() {
        loadActivityData().then(activityData => {
            const statsContent = document.getElementById('statsContent');
            let totalSteps = 0;
            let totalTime = 0;

            for (let i = 1; i <= 7; i++) {
                const dayData = activityData[i] || { steps: 0, time: 0 };
                totalSteps += dayData.steps;
                totalTime += dayData.time;
            }

            statsContent.innerHTML = `
                <p>Łącznie kroki: ${totalSteps}</p>
                <p>Łączny czas ćwiczeń: ${totalTime} minut</p>`;
        });
    }

    // Wyświetlanie notatek
    function displayNotes() {
        loadActivityData().then(activityData => {
            const notesList = document.getElementById('notesList');
            notesList.innerHTML = '';

            for (let i = 1; i <= 7; i++) {
                const dayData = activityData[i];
                if (dayData && dayData.notes) {
                    notesList.innerHTML += `<p><strong>Dzień ${i}:</strong> ${dayData.notes}</p>`;
                }
            }
        });
    }

    // Czyszczenie danych
    function clearData() {
        localStorage.removeItem('activityData');
        updateCharts();
        displayStats();
        displayNotes();
        alert('Wszystkie dane zostały usunięte.');
    }

    // Motywacyjne cytaty
    const quotes = [
        "Nie czekaj na odpowiedni moment. Stwórz go!",
        "Małe kroki prowadzą do wielkich zmian.",
        "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
        "Nie ma nic bardziej motywującego niż postępy!",
        "Rób to, co kochasz, a nigdy nie będziesz musiał pracować."
    ];

    function displayQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById('motivationalQuote').innerText = quotes[randomIndex];
    }

    displayQuote();
});
