document.addEventListener("DOMContentLoaded", () => {
    const seatingAreas = document.getElementById("seating-areas");
    const bookingModal = document.getElementById("booking-modal");
    const closeButton = document.querySelector(".close-button");
    const confirmButton = document.getElementById("confirm-button");
    const cancelButton = document.getElementById("cancel-button");
    const nameInput = document.getElementById("name-input");
    const dateInput = document.getElementById("booking-date");

    const totalSeats = 23; // Adjust total number of seats based on your layout
    let selectedSeat = null;
    let currentDate = dateInput.value;
    const bookings = {};

    function openBookingModal(seat) {
        if (!seat.classList.contains("booked")) {
            selectedSeat = seat;
            bookingModal.style.display = "block";
        }
    }

    function updateSeatsView() {
        currentDate = dateInput.value;
        if (!bookings[currentDate]) {
            bookings[currentDate] = Array(totalSeats).fill(null);
        }
        const seats = seatingAreas.getElementsByClassName("seat");
        for (let i = 0; i < seats.length; i++) {
            const seat = seats[i];
            const seatIndex = seat.dataset.seatNumber - 1;
            const booking = bookings[currentDate][seatIndex];
            if (booking) {
                seat.classList.add("booked");
                seat.innerText = `${booking.name}`;
            } else {
                seat.classList.remove("booked");
                seat.innerText = `Seat ${seatIndex + 1}`;
            }
        }
    }

    function attachSeatListeners() {
        const seats = seatingAreas.getElementsByClassName("seat");
        for (let i = 0; i < seats.length; i++) {
            seats[i].addEventListener("click", () => openBookingModal(seats[i]));
        }
    }

    closeButton.addEventListener("click", () => {
        bookingModal.style.display = "none";
    });

    cancelButton.addEventListener("click", () => {
        bookingModal.style.display = "none";
    });

    confirmButton.addEventListener("click", () => {
        if (selectedSeat && nameInput.value.trim()) {
            const seatIndex = selectedSeat.dataset.seatNumber - 1;
            bookings[currentDate][seatIndex] = { name: nameInput.value };
            updateSeatsView(); // Update view after booking
            bookingModal.style.display = "none";
            nameInput.value = "";
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target === bookingModal) {
            bookingModal.style.display = "none";
        }
    });

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    updateSeatsView();
    attachSeatListeners();
});
