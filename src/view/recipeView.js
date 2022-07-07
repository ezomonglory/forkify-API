import { elements, renderLoader, clearLoader } from "./dom";
import { Fraction } from "../Fraction";

export const clearRecipe = ()=> {
    elements.recipe.innerHTML = ""
}

const formatCount = (count)=> {

    if (count){
        // 0.5 = 1/2
        // 2.5 = 2 1/2

        const newCount = Math.round(count * 10000) / 10000
        const [ind, dec] = newCount.toString().split(".").map(el=> parseInt(el, 10));

        if(!dec){
            return newCount 
        }

        if(ind === 0){
           const fr = new Fraction(newCount) 
           return `${fr.numerator}/ ${fr.denominator}`
        }
        else {
            const fr = new Fraction(newCount - ind)
            return `${ind} ${fr.numerator}/${fr.denominator}`
        }


    }
    
        return "?"
    
}

const createIngredients = (ingredients) =>
`
<li class="recipe__ingredient">
    <svg class="recipe__icon">
     <use href="icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${formatCount(ingredients.count)}</div>
    <div class="recipe__description">
    <span class="recipe__unit">${ingredients.unit}</span>
    ${ingredients.ingredient}
    </div>
</li>
`;

export const renderRecipe = (recipe) => {
	const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${
		recipe.title
	}" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${recipe.title}</span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <div class="recipe__info-icon">
                <i class="fa-solid fa-clock " style="color:#f09f96;"></i>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
								recipe.time
							}</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <div class="recipe__info-icon">
                <i class="fa-solid fa-user" style="color:#f09f96"></i>
              </div>
              <span class="recipe__info-data recipe__info-data--people">${
								recipe.servings
							}</span>
              <span class="recipe__info-text">servings</span>
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--decrease-servings">
                  <div>
                    <i class="fa-solid fa-circle-minus fa-1x" style="color:#f09f96"></i>
                  </div>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <div>
                    <i class="fa-solid fa-circle-plus" style="color:#f09f96"></i>
                  </div>
                </button>
              </div>
            </div>
            <div class="recipe__user-generated">
              <svg>
                <use href="icons.svg#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
            <i class="fa-regular fa-bookmark fa-2x" style="color:white;"></i>
            </button>
          </div>
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">

                ${recipe.ingredients.map((el) => createIngredients(el)).join('')}
            
            </ul>
          </div>
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
								recipe.author
							}</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${recipe.url}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        
        </div>
        </div>
        
        `;
	elements.recipe.insertAdjacentHTML("afterbegin", markup);
};


export const updateServingsIngredients = (recipe)=> {
  // update servings
  document.querySelector(".recipe__info-data--people").textContent = recipe.servings;

  // update ingredients
  const countElements = Array.from(document.querySelectorAll(".recipe__quantity"));
  countElements.forEach((el, i)=>{
    el.textContent = formatCount(recipe.ingredients[i].count)
  })
}