import { Search } from "./module/Search";
import { elements, renderLoader, clearLoader } from "./view/dom";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as errorView from "./view/errorView";
import * as listView from "./view/listView";
import Recipe from "./module/Recipe";
import List from "./module/List";

const state = {};

// Search controller
const controlSearch = async () => {
	//1)Get query from view
	const query = searchView.getInput();

	if (query) {
		//2) New search object and add to state
		state.search = new Search(query);

		//3) Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

        // for mobile devices lets lets make ingredients none
        document.querySelector(".recipe").classList.add("d-none")
        document.querySelector(".search-results").classList.remove("d-none")
        


		try {
			//4) Search for recipes
			var err = await state.search.getResult();
			//5) Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (error) {
			errorView.error(elements.searchResList, err)
			clearLoader();
		}
	}
};
elements.searchForm.addEventListener("submit", (e) => {
	e.preventDefault();

	controlSearch();
});

elements.page.addEventListener("click", (e) => {
	const btn = e.target.closest(".btn--inline");
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

// Recipe Controller
const controlRecipe = async () => {
	//Get ID from url
	const id = window.location.hash.replace("#", "");

	if (id) {
		//prepare ui for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);
		if (state.search) searchView.highlightSelected(id);
		try {
			//create new recipe object
			state.recipe = new Recipe(id);

			//get recipe data and parse ingredient
			await state.recipe.getRecipe();

			state.recipe.parseIngredients();
			//calculate servings and times

			state.recipe.calcTime();

			state.recipe.calServings();
			//render recipee

			clearLoader();

			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			alert(error);
		}
	}
};

// window.addEventListener("hashchange", controlRecipe)
// window.addEventHListener("load", controlRecipe)

["hashchange", "load"].forEach((event) => {
	window.addEventListener(event, ()=> {
        controlRecipe()
        document.querySelector(".recipe").classList.remove("d-none")
        document.querySelector(".search-results").classList.add("d-none")
        document.querySelector(".bookmarks").classList.remove("show")

    });    
});

// List Controller
const controlList = () => {
	// create a list
	if (!state.List) state.List = new List();

	// add items into the list
	const Item = state.List.addItem(
		state.recipe.id,
		state.recipe.image,
		state.recipe.title,
		state.recipe.author,
	);
	// creating an array to recieive all IDs from the list
	const IDs = [];

	// render item to the UI
	listView.addItem(Item);

	// Pushing each IDs to the ID array
	IDs.push(Item.id);

	// deleting Bookmarked on click
	const el = document.querySelector(".times");
	el.addEventListener("click", (e) => {
		IDs.forEach((el) => {
			// delete item from array
			state.List.deleteItem(el);
			// delete item from UI
			listView.deleteItem(el);
		});
	});
};

/* EVENTS LISTENERES*/

// targeting the dom
elements.recipe.addEventListener("click", (e) => {
	const el = e.target.closest(".btn--round");
	if (el) {
		controlList();
	}
});

// Handling recipe buttons

elements.recipe.addEventListener("click", (e) => {
	if (e.target.matches(".btn--decrease-servings, .btn--decrease-servings *")) {
		// decreas servings
		if (state.recipe.servings > 1) {
			state.recipe.updateServings("dec");
		}
	} else if (
		e.target.matches(".btn--increase-servings, .btn--increase-servings *")
	) {
		//increase servings
		state.recipe.updateServings("inc");
	}

	recipeView.updateServingsIngredients(state.recipe);

	// console.log(state.recipe)
});

window.addEventListener("load", () => {
	state.List = new List();

	//  get stored data
	var IDs = state.List.readData();

	// render stored data on ui
	state.List.items.forEach((item) => {
		listView.addItem(item);
	});

	// deleting Bookmarked on click
	const el = document.querySelectorAll(".times");
	var arrel = Array.from(el);

	arrel.forEach((cur) => {
		cur.addEventListener("click", (e) => {
			console.log(e.target);
			var id = e.target.parentNode.parentNode.id;
			console.log(id);
			IDs.forEach((el) => {
				if (el === id) {
					// delete item from array
					state.List.deleteItem(el);
					// delete item from UI
					listView.deleteItem(el);
				}
			});
		});
	});
});


const rec = document.querySelector(".rec")
const ing = document.querySelector(".ing")

ing.addEventListener("click", ()=> {    
    document.querySelector(".search-results").classList.add("d-none")
    document.querySelector(".recipe").classList.remove("d-none")
    document.querySelector(".bookmarks").classList.remove("show")

})


rec.addEventListener("click", ()=> {
    document.querySelector(".recipe").classList.add("d-none")
    document.querySelector(".search-results").classList.remove("d-none")
    document.querySelector(".bookmarks").classList.remove("show")
})


document.querySelector(".nav__btn--bookmarks").addEventListener("click", ()=> {
    document.querySelector(".bookmarks").classList.toggle("show")
})