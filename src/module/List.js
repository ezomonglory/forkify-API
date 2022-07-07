import uniqid from "uniqid";

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(url, image, title, author) {
		const item = {
			id: uniqid(),
			url,
			image,
			title,
			author,
		};
		this.items.push(item);

		// store data in local storage
		this.storeData();
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex((el) => el.id === id);
		this.items.splice(index, 1);
		console.log(this.items);

		// store data in local storage
		this.storeData();
	}

	updateCount(id, newCount) {
		this.items.find((el) => el.id === id).count = newCount;
	}

	storeData() {
		localStorage.setItem("items", JSON.stringify(this.items));
	}

	readData() {
		const storage = JSON.parse(localStorage.getItem("items"));

		// restore likes from local storage
		if(storage) {
			this.items = storage;
		}

		return this.items.map((el) => {
			return el.id;
		});
	}
}
