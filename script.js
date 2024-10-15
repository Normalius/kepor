// Licznik kroków
const saveStepsBtn = document.getElementById('save-steps');
const stepSummary = document.getElementById('step-summary');

saveStepsBtn.addEventListener('click', () => {
    const dailySteps = parseInt(document.getElementById('daily-steps').value) || 0;
    const goalSteps = parseInt(document.getElementById('goal-steps').value) || 0;
    
    localStorage.setItem('dailySteps', dailySteps);
    localStorage.setItem('goalSteps', goalSteps);
    
    displayStepSummary();
});

function displayStepSummary() {
    const dailySteps = localStorage.getItem('dailySteps');
    const goalSteps = localStorage.getItem('goalSteps');
    
    stepSummary.innerHTML = `Dzisiaj zrobione kroki: ${dailySteps}. Cel kroków: ${goalSteps}.`;
}

// Kalendarz
$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: [],
        editable: true,
        eventLimit: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        dayClick: function(date) {
            const eventTitle = prompt('Wpisz nazwę treningu:');
            if (eventTitle) {
                $('#calendar').fullCalendar('renderEvent', {
                    title: eventTitle,
                    start: date,
                    allDay: true
                });
            }
        }
    });
});

// Wykresy
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz.'],
        datasets: [{
            label: 'Zrobione kroki',
            data: [2000, 4000, 3000, 5000, 7000, 6000, 8000], // Przykładowe dane
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Podsumowanie treningu
const saveNotesBtn = document.getElementById('save-notes');
const savedNotes = document.getElementById('saved-notes');

saveNotesBtn.addEventListener('click', () => {
    const notes = document.getElementById('training-notes').value;
    const existingNotes = localStorage.getItem('trainingNotes') || '';
    
    localStorage.setItem('trainingNotes', existingNotes + notes + '\n');
    displaySavedNotes();
});

function displaySavedNotes() {
    const notes = localStorage.getItem('trainingNotes');
    savedNotes.innerHTML = notes.replace(/\n/g, '<br/>');
}
