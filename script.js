const journeys = [
    { id: 1, name: "Visapur Trek 2023", checkpoints: [
        { id: 1, x: 67.5, y: 87, images: ['./images/trek1.jpg', './images/trek2.jpg', './images/trek3.jpg','./images/trek4.jpg'] },
        { id: 2, x: 37, y: 75, images: ['./images/trek4.jpg', './images/trek5.jpg'] },
        { id: 3, x: 63.2, y: 62, images: ['./images/trek6.jpg', './images/trek7.jpg', './images/trek8.jpg'] },
        { id: 4, x: 46.5, y: 49.3, images: ['./images/trek9.jpg', './images/trek10.jpg'] }
    ]},
    { id: 2, name: "Mahabaleshwar Trip", checkpoints: [
        { id: 5, x: 20, y: 80, images: ['maha1.jpg', 'maha2.jpg'] },
        { id: 6, x: 40, y: 60, images: ['maha3.jpg', 'maha4.jpg', 'maha5.jpg'] },
        { id: 7, x: 60, y: 40, images: ['maha6.jpg', 'maha7.jpg'] }
    ]},
    { id: 3, name: "Go Goa Gone", checkpoints: [
        { id: 8, x: 30, y: 70, images: ['goa1.jpg', 'goa2.jpg', 'goa3.jpg'] },
        { id: 9, x: 50, y: 50, images: ['goa4.jpg', 'goa5.jpg'] },
        { id: 10, x: 70, y: 30, images: ['goa6.jpg', 'goa7.jpg', 'goa8.jpg'] }
    ]}
];

// Populate journey list
const journeyList = document.getElementById('journeyList');
journeys.forEach(journey => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = journey.name;
    li.onclick = () => selectJourney(journey.id);
    journeyList.appendChild(li);
});

// Select journey and display checkpoints
function selectJourney(journeyId) {
    const journey = journeys.find(j => j.id === journeyId);
    if (journey) {
        const map = document.getElementById('map');
        // Clear existing checkpoints
        map.querySelectorAll('.checkpoint').forEach(el => el.remove());
        // Add new checkpoints
        journey.checkpoints.forEach(checkpoint => {
            const checkpointEl = document.createElement('div');
            checkpointEl.className = 'checkpoint';
            checkpointEl.style.left = `${checkpoint.x}%`;
            checkpointEl.style.top = `${checkpoint.y}%`;
            checkpointEl.onclick = () => openImageModal(checkpoint.images);
            map.appendChild(checkpointEl);
        });
    }
}

// Open image modal
function openImageModal(images) {
    const carousel = document.querySelector('#imageCarousel .carousel-inner');
    carousel.innerHTML = '';
    images.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `<img src="${image}" class="d-block w-100" alt="Checkpoint image">`;
        carousel.appendChild(div);
    });
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}

// Make checkpoints responsive
window.addEventListener('resize', () => {
    const currentJourneyId = journeys.find(journey => 
        document.querySelector('.checkpoint') && 
        journey.checkpoints.some(cp => 
            cp.x === parseFloat(document.querySelector('.checkpoint').style.left) &&
            cp.y === parseFloat(document.querySelector('.checkpoint').style.top)
        )
    )?.id;

    if (currentJourneyId) {
        selectJourney(currentJourneyId);
    }
});

// Display the first journey by default
selectJourney(journeys[0].id);