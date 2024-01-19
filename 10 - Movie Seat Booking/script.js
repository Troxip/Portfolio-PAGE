const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");

const seats = document.querySelectorAll(".row .seat:not(.occupied)");

seats.forEach((seat) => seat.addEventListener("click", selectedSeat));
movie.addEventListener("change", selectedSeat);
let counter = 0;

function selectedSeat(e) {
  isSelected = e.target.classList.toggle("selected");
  if (e.target.classList.contains("seat")) counter += isSelected ? 1 : -1;
  count.textContent = counter;
  total.textContent = counter * +movie.value;
}
