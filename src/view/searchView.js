import {elements} from "./dom"

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
  elements.searchInput.value = ""
}

export const clearResults = () => {
  elements.searchResList.innerHTML = ''
  elements.page.innerHTML = "";
}

export const highlightSelected = (id)=> {
  
  const resultArr = Array.from(document.querySelectorAll(".preview__link"))
  resultArr.forEach((el)=> {
    el.classList.remove("preview__link--active")
  })
  
  document.querySelector(`a[href*="${id}"]`).classList.add("preview__link--active")
}



const renderRecipe = recipe => {
    const markup = `
    <li class="preview">
    <a class="preview__link" href="#${recipe.recipe_id}">
      <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup)
}
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page-1) * resPerPage;
  const end = page * resPerPage
  const lt = recipes.length
    recipes.slice(start, end).forEach(renderRecipe);


    //render pagination
    renderButtons(page, lt, resPerPage);
}


const createButtons = (page, type) => `
 <button class="btn--inline pagination__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
    <span>Page ${type === "prev" ? page - 1 : page + 1} </span>
</button>

`;

const renderButtons = (page, numResult, resPerPage) => {
  const pages = Math.ceil(numResult/resPerPage);

    let button;
  if (page === 1 && pages > 1)  {
    button = createButtons(page, "next")
  } else if (page < pages) {
    button =`
      ${createButtons(page, "prev")}
      ${createButtons(page, "next")}
    `

  } else if (page === pages && pages > 1) {
    button = createButtons(page, "prev")
  }
  elements.page.insertAdjacentHTML("afterbegin", button)
}


// document.querySelectorAll(".preview").forEach((item)=> {          
//     item.addEventListener("click", (e)=> {
//         alert("item clicked")
//         console.log(e.target)
//         document.querySelector(".search-results").classList.add("d-none")
//         document.querySelector(".recipe").classList.remove("d-none")
//     })
// })





