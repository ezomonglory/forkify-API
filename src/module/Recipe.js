import axios from "axios";

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(
				`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`,
			);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.image = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {
			console.log(error);
			alert("something went wrong:(");
		}
	}

	calcTime() {
		//assuming for every 3 ingredients is 15 mins
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	calServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = [
			"tablespoons",
			"tablespoon",
			"ounces",
			"ounce",
			"teaspoons",
			"teaspoon",
			"cups",
			"pounds",
		];
		const unitsShort = [
			"tbsp",
			"tbsp",
			"oz",
			"oz",
			"tsp",
			"tsp",
			"cup",
			"pound",
		];
		const units = [...unitsShort, "kg", "g"];

		const newIngredients = this.ingredients.map((el) => {
			// uniform units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});

			//remove parenthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

			//parse ingredients into counts, unit and ingredients
			const arring = ingredient.split(" ");
			const unitIndex = arring.findIndex((el2) => units.includes(el2));
			let objIng;
			if (unitIndex > -1) {
				//there is a unit
				const arrCount = arring.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arring[0].replace("-", "+"));
				} else {
					count = eval(arrCount.slice(0, unitIndex).join("+"));
				}

				objIng = {
					count: count,
					unit: arring[unitIndex],
					ingredient: arring.slice(unitIndex + 1).join(" "),
				};
			} else if (parseInt(arring[0], 10)) {
				//there is no unit but theres a number
				objIng = {
					count: parseInt(arring[0], 10),
					unit: "",
					ingredient: arring.slice(1).join(" "),
				};
			} else if (unitIndex === -1) {
				// there is no unit and no number in first position
				objIng = {
					count: 1,
					unit: "",
					ingredient,
				};
			}
			return objIng;
		});

		this.ingredients = newIngredients;
	}

	updateServings(type) {
		// servings
		const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
		// ingredients
		this.ingredients.forEach((ing) => {
			ing.count *= newServings / this.servings;
		});
		this.servings = newServings;
	}
}

// o=2 n= 10 c=5
// c = 5 * 10/2
// c = 25
// 2=5
// 10=?