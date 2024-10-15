document.addEventListener('DOMContentLoaded', function() {
    const activityForm = document.getElementById('activityForm');
    const clearDataButton = document.getElementById('clearData');
    const ctxSteps = document.getElementById('stepsChart').getContext('2d');
    const ctxTime = document.getElementById('timeChart').getContext('2d');

    const stepsChart = new Chart(ctxSteps, {
        type: 'bar',
        data: {
            labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
            datasets: [{
                label: 'Liczba Kroków',
                data: new Array(7).fill(0),
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

    const timeChart = new Chart(ctxTime, {
        type: 'bar',
        data: {
            labels: ['Dzień 1', 'Dzień 2', 'Dzień 3', 'Dzień 4', 'Dzień 5', 'Dzień 6', 'Dzień 7'],
            datasets: [{
                label: 'Czas Ćwiczeń (min)',
                data: new Array(7).fill(0),
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

    const getActiveDayData = () => {
        return {
            steps: JSON.parse(localStorage.getItem('activityData')) || new Array(7).fill(0),
            time: JSON.parse(localStorage.getItem('timeData')) || new Array(7).fill(0),
        };
    };

    const updateCharts = () => {
        const { steps, time } = getActiveDayData();
        stepsChart.data.datasets[0].data = steps;
        stepsChart.update();

        timeChart.data.datasets[0].data = time;
        timeChart.update();
    };

    const displayNotes = (notes) => {
        const notesList = notes.map((note, index) => `
            <li>
                Dzień ${index + 1}: ${note || 'Brak'}
                <button onclick="editNote(${index})">Edytuj</button>
            </li>`).join('');
        document.getElementById('notesList').innerHTML = `<ul>${notesList}</ul>`;
    };

    window.editNote = function(index) {
        const notesData = JSON.parse(localStorage.getItem('notesData')) || [];
        const noteToEdit = notesData[index];

        document.getElementById('day').value = index + 1; // Ustaw dzień
        document.getElementById('notes').value = noteToEdit || ''; // Ustaw notatkę

        const activityData = JSON.parse(localStorage.getItem('activityData')) || [];
        const timeData = JSON.parse(localStorage.getItem('timeData')) || [];

        document.getElementById('steps').value = activityData[index] || 0;
        document.getElementById('time').value = timeData[index] || 0;
    };

    activityForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const day = document.getElementById('day').value - 1; // Indeks dnia
        const steps = parseInt(document.getElementById('steps').value);
        const time = parseInt(document.getElementById('time').value);
        const notesInput = document.getElementById('notes');
        const notes = notesInput.value;

        // Walidacja danych wejściowych
        if (isNaN(steps) || steps < 0) {
            alert("Liczba kroków musi być liczbą nieujemną.");
            return;
        }
        if (isNaN(time) || time < 0 || time > 1440) {
            alert("Czas ćwiczeń musi być liczbą między 0 a 1440 minutami.");
            return;
        }

        // Zapisz kroki i czas do localStorage
        let activityData = JSON.parse(localStorage.getItem('activityData')) || new Array(7).fill(0);
        let timeData = JSON.parse(localStorage.getItem('timeData')) || new Array(7).fill(0);
        let notesData = JSON.parse(localStorage.getItem('notesData')) || [];

        activityData[day] = steps;
        timeData[day] = time;

        // Zapisz notatki
        if (notes) {
            notesData[day] = notes;
        }

        localStorage.setItem('activityData', JSON.stringify(activityData));
        localStorage.setItem('timeData', JSON.stringify(timeData));
        localStorage.setItem('notesData', JSON.stringify(notesData));

        // Wyświetl nowe statystyki
        updateCharts();
        displayStatistics(activityData, timeData);
        displayNotes(notesData);
        showMotivationalQuote();
        activityForm.reset();
    });

    clearDataButton.addEventListener('click', () => {
        localStorage.removeItem('activityData');
        localStorage.removeItem('timeData');
        localStorage.removeItem('notesData');
        stepsChart.data.datasets[0].data = new Array(7).fill(0);
        timeChart.data.datasets[0].data = new Array(7).fill(0);
        stepsChart.update();
        timeChart.update();
        document.getElementById('notesList').innerHTML = '';
        document.getElementById('statsContent').innerHTML = '';
    });

    const displayStatistics = (steps, time) => {
        const totalSteps = steps.reduce((acc, curr) => acc + curr, 0);
        const totalTime = time.reduce((acc, curr) => acc + curr, 0);
        const averageSteps = (totalSteps / steps.length).toFixed(2);
        const averageTime = (totalTime / time.length).toFixed(2);

        const statsContent = `
            <p>Całkowite Kroki: ${totalSteps}</p>
            <p>Całkowity Czas (min): ${totalTime}</p>
            <p>Średnie Kroki na Dzień: ${averageSteps}</p>
            <p>Średni Czas na Dzień (min): ${averageTime}</p>
        `;
        document.getElementById('statsContent').innerHTML = statsContent;
    };

    const showMotivationalQuote = () => {
        const quotes = [
            "Nie musisz być wielki, aby zacząć, ale musisz zacząć, aby być wielki.",
            "Twoje ciało może osiągnąć wszystko, co umysł może wyobrazić.",
            "Nie czekaj na idealny moment, weź moment i spraw, aby był idealny."
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('motivationalQuote').innerText = quote;
    };

    updateCharts(); // Inicjalizuj wykresy
    displayStatistics(getActiveDayData().steps, getActiveDayData().time);
    displayNotes(JSON.parse(localStorage.getItem('notesData')) || []);
});
