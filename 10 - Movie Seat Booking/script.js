const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const unselect = document.getElementById("unselect");
let counter = 0;

populateUI();

seats.forEach((seat) => seat.addEventListener("click", selectedSeat));

// Save selected movie index and price
function setMovieData(index, price) {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", price);
}

movie.addEventListener("change", (e) => {
  setMovieData(e.target.selectedIndex, e.target.value);
  selectedSeat(e);
});

//Selected Seats
function selectedSeat(e) {
  isSelected = e.target.classList.toggle("selected");
  if (e.target.classList.contains("seat")) counter += isSelected ? 1 : -1;
  total.textContent = counter * movie.value;
  count.textContent = counter;
  saveCookie();
}

// Get selected Seats
function saveCookie() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
}

// Get data from local storage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
  updateTotal();
}

// Update seats selected and price on page load
function updateTotal() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null) {
    counter = selectedSeats.length;
    total.textContent = counter * movie.value;
    count.textContent = counter;
  } else {
    counter = 0;
    total.textContent = "0";
    count.textContent = "0";
  }
}

//Unselect all seats
unselect.addEventListener("click", unselectSeats);
function unselectSeats() {
  counter = 0;
  updateSeats();
}

function updateSeats() {
  total.textContent = counter * movie.value;
  count.textContent = counter;
  seats.forEach((e) => {
    e.className = "seat";
  });
}
