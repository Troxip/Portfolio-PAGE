const num = document.querySelectorAll("li");
const results = document.querySelector(".result");
const dummy = document.querySelector(".dummy");
let firstClick = true;

num.forEach((element) => {
  element.addEventListener("click", function () {
    //Reset Dummy (Only on first click)
    if (firstClick) {
      dummy.textContent = "";
      firstClick = false;
    }
    //Reset Number Color
    results.style.color = "black";

    //Calculator
    if (results.value && isNaN(parseInt(results.value.charAt(0)))) {
      results.value = "";
      dummy.textContent = "";
    }

    if (element.innerHTML == "=") {
      if (results.value === "") {
      } else {
        results.value = eval(results.value);
        results.style.color = "#2ecc71";
        dummy.textContent = `${dummy.textContent}=${results.value}`;
      }
    } else {
      if (element.innerHTML === "C") {
        results.value = "";
        dummy.textContent = "";
      } else {
        results.value += element.innerHTML;
        dummy.textContent += element.innerHTML;
      }

      if (element.innerHTML == "DEL") {
        //Delete from Value
        results.value = results.value.slice(0, -4);

        //Delete from Dummy
        dummy.textContent = dummy.textContent.slice(0, -4);
      }
    }
  });
});
