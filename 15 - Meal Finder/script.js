const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultsHeading = document.getElementById("results-heading"),
  single_mealEl = document.getElementById("single-meal");
console.log(mealsEl);
//Search Meal and fetch from Api
function searchMeal(e) {
  e.preventDefault();

  // Clear single meals
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        resultsHeading.innerHTML = `<h2>Search results for ${term}</h2>`;

        if (!data.meals) {
          resultsHeading.innerHTML = `<p>There are no search results. Try Again</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class= "meal">
               <img src = "${meal.strMealThumb}" alts="${meal.strMeal}"/>
               <div class ="meal-info" data-mealID = "${meal.idMeal}">
                     <h3>${meal.strMeal}</h3>
                </div>
            </div>
            `
            )
            .join("");
        }
      });
    //Clear Search
    search.value = "";
  } else {
    alert("Please enter a meal name");
  }
}

//Get Meal By Id
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal);

      addMealToDom(meal);
    });
}

//Add Meal To DOM
function addMealToDom(meal) {
  const ingredients = [];
  console.log(ingredients);

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class = "single-meal">
    <h1>${meal.strMeal}</h1>
        <img src = "${meal.strMealThumb}" alt ="${meal.strMeal}">
        <div class = "sing-neak-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>

    <div class = "main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    </div>

  </div>
  `;
}

submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
