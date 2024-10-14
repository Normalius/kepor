// Pobrane elementy DOM
const activityForm = document.getElementById('activityForm');
const notesInput = document.getElementById('notes');
const goalStepsInput = document.getElementById('goalSteps');
const goalTimeInput = document.getElementById('goalTime');
const clearDataButton = document.getElementById('clearData');

// Ustawienia wykresów
const stepsCtx = document.getElementById('stepsChart').getContext('2d');
const timeCtx = document.getElementById('timeChart').getContext('2d');

// Motywacyjne cytaty
const quotes = [
    "Nie czekaj na odpowiedni moment. Stwórz go!",
    "Małe kroki prowadzą do wielkich zmian.",
    "Sukces to suma małych wysiłków powtarzanych dzień po dniu.",
    "Nie ma nic bardziej motywującego niż postępy!",
    "Rób to, co kochasz, a nigdy nie będziesz musiał pracować."
];

// Utworzenie i konfiguracja wykresów
const stepsChart = new Chart(stepsCtx, {
    type: 'bar',
    data: {
        labels: Array.from({ length: 7 }, (_, i) => `Dzień ${i + 1}`),
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
            y: { beginAtZero: true }
        }
    }
});

const timeChart = new Chart(timeCtx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 7 }, (_, i) => `Dzień ${i + 1}`),
        datasets: [{
            label: 'Czas Ćwiczeń (minuty)',
            data: [],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        scales: { y: { beginAtZero: true } }
    }
});

// Zdarzenia
activityForm.addEventListener('submit', saveActivity);
clearDataButton.addEventListener('click', clearData);
document.addEventListener('DOMContentLoaded', () => {
    updateCharts();
    displayStats();
    displayNotes();
    displayQuote();
});

// Funkcja do zapisywania aktywności
const saveActivity = (event) => {
    event.preventDefault();

    const day = document.getElementById('day').value;
    const steps = parseInt(document.getElementById('steps').value);
    const time = parseInt(document.getElementById('time').value);

    if (steps < 0 || time < 0) {
        return alert("Liczba kroków i czas ćwiczeń nie mogą być ujemne!");
    }

    const notes = notesInput.value;
    const goalSteps = goalStepsInput.value ? parseInt(goalStepsInput.value) : null;
    const goalTime = goalTimeInput.value ? parseInt(goalTimeInput.value) : null;

    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};
    activityData[day] = { steps, time, notes, goalSteps, goalTime };
    
    localStorage.setItem('activityData', JSON.stringify(activityData));
    updateCharts();
    displayStats();
    displayNotes();
    activityForm.reset();
};

// Funkcja do aktualizacji wykresów
const updateCharts = () => {
    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};

    const stepsData = [];
    const timeData = [];

    for (let i = 1; i <= 7; i++) {
        const dayData = activityData[i] || { steps: 0, time: 0 };
        stepsData.push(dayData.steps);
        timeData.push(dayData.time);
    }

    stepsChart.data.datasets[0].data = stepsData;
    timeChart.data.datasets[0].data = timeData;

    stepsChart.update();
    timeChart.update();
};

// Funkcja do wyświetlania statystyk
const displayStats = () => {
    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};
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
        <p>Łączny czas ćwiczeń: ${totalTime} minut</p>
    `;
};

// Funkcja do wyświetlania notatek
const displayNotes = () => {
    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    for (let i = 1; i <= 7; i++) {
        const dayData = activityData[i];
        if (dayData?.notes) {
            notesList.innerHTML += `<p><strong>Dzień ${i}:</strong> ${dayData.notes}</p>`;
        }
    }
};

// Funkcja do czyszczenia danych
const clearData = () => {
    localStorage.removeItem('activityData');
    updateCharts();
    displayStats();
    displayNotes();
    alert('Wszystkie dane zostały usunięte.');
};

// Motywacyjne cytaty
const displayQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('motivationalQuote').innerText = quotes[randomIndex];
};

// Udostępnianie postępów
const shareProgress = async () => {
    const activityData = JSON.parse(localStorage.getItem('activityData')) || {};
    const progress = Object.entries(activityData)
        .map(([day, data]) => `Dzień ${day}: ${data.steps} kroków, ${data.time} min`)
        .join('\n');

    const shareText = `Oto moje postępy:\n${progress}`;
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Moje postępy w wyzwaniu!',
                text: shareText
            });
            console.log('Udostępniono pomyślnie');
        } catch (error) {
            console.error('Błąd podczas udostępniania:', error);
        }
    } else {
        alert(shareText);
    }
};

// Zmiana kolorów wykresów
const changeChartColors = () => {
    const stepsColor = prompt("Podaj kolor dla wykresu kroków (np. rgba(75, 192, 192, 1)):");
    const timeColor = prompt("Podaj kolor dla wykresu czasu (np. rgba(153, 102, 255, 1)):");

    stepsChart.data.datasets[0].backgroundColor = stepsColor;
    stepsChart.data.datasets[0].borderColor = stepsColor;
    timeChart.data.datasets[0].backgroundColor = timeColor;
    timeChart.data.datasets[0].borderColor = timeColor;

    stepsChart.update();
    timeChart.update();
};
