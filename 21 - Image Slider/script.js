const cards = document.querySelectorAll(".slide");
const body = document.querySelector("body");

for (const slide of cards) {
  slide.classList.remove("active");
  slide.addEventListener("click", () => {
    clearActiveClasses();

    slide.classList.add("active");
    const currentImage =
      getComputedStyle(slide).getPropertyValue("background-image");
    changeBackgroundImage(currentImage);
  });
}

function clearActiveClasses() {
  cards.forEach((slide) => slide.classList.remove("active"));
}

function changeBackgroundImage(currentImage) {
  console.log(currentImage);
  body.style.backgroundImage = currentImage;
}
