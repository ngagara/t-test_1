const cards = document.querySelectorAll(".card");
const MAX_RENDER_NODE_DEPARTURE_TIME = 3;

export const departureTimeMock = [{
        card_id: 1,
        departure_time: ["11:00", "12:00", "13:00", "14:00", "16:00"]
    },
    {
        card_id: 2,
        departure_time: ["12:00", "12:00", "12:00", "13:00", "15:00"]
    },
    {
        card_id: 3,
        departure_time: ["12:00", "12:00", "12:00"]
    },
];

const addMoreDepartureTimes = (e) => {
    cards.forEach((card) => {
        departureTimeMock.forEach((mock) => {
            if (card.id == e.target.id && e.target.id == mock.card_id) {

                const nodeDepartureTime = card.querySelector(".checklist__departure-time");
                const departureTime = nodeDepartureTime.querySelectorAll(".checklist__time");

                nodeDepartureTime.querySelector(".more").removeEventListener("click", addMoreDepartureTimes);

                departureTime.forEach(time => time.remove());

                mock.departure_time.forEach((time) => {
                    const departureTime = document.createElement("li");
                    departureTime.classList.add("checklist__time");
                    departureTime.textContent = time
                    nodeDepartureTime.appendChild(departureTime);
                })
            }
        })
    })
}

const createAddMoreTimesButton = (id) => {
    const addButton = document.createElement("li");
    addButton.setAttribute("id", id);
    addButton.classList.add("checklist__time", "more");
    addButton.textContent = "еще..."
    addButton.addEventListener("click", addMoreDepartureTimes)
    return addButton
}

cards.forEach((card) => {
    departureTimeMock.forEach((mock) => {
        if (card.id == mock.card_id) {

            const nodeDepartureTime = card.querySelector(".checklist__departure-time");
            const slice = mock.departure_time.slice(0, MAX_RENDER_NODE_DEPARTURE_TIME);
            const addButtonState = mock.departure_time.length > MAX_RENDER_NODE_DEPARTURE_TIME;

            slice.forEach((time) => {
                const departureTime = document.createElement("li");
                departureTime.classList.add("checklist__time");
                departureTime.textContent = time
                nodeDepartureTime.appendChild(departureTime);
            })
            if (addButtonState) {
                const addButton = createAddMoreTimesButton(card.id);
                nodeDepartureTime.appendChild(addButton);
            }
        }
    })
})