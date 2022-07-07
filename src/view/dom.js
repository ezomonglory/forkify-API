export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResList: document.querySelector(".results"),
    searchRes: document.querySelector(".search-results"),
    page: document.querySelector(".pagination"),
    recId: document.querySelector(".preview"),
    recipe: document.querySelector(".recipe")
}

export const renderLoader = parent => {
    const spinner = `
     <div class="spinner">
          <div>
          <i class="fa-solid fa-arrow-rotate-right fa-5x"></i>
          </div>
        </div>
    `;

    parent.insertAdjacentHTML("afterbegin", spinner) 
}

export const clearLoader = () => {
    const loader = document.querySelector(".spinner")

    if (loader) {
        loader.parentElement.removeChild(loader)
    }
}
