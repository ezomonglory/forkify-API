export const addItem = (item) => {
    document.querySelector(".btn--round").innerHTML = '<i class="fa-solid fa-bookmark fa-2x" style="color:white;"></i>'
    
    const markup = `
    <li class="preview" id=${item.id}>
        <a class="preview__link" href="#${item.url}">
            <figure class="preview__fig">
            <img src="${item.image}" alt="${item.title}" />
            </figure>
            <div class="preview__data">
            <h2 class="preview__name">
            ${item.title}
            </h2>
            <p class="preview__publisher">${item.author}</p>
            </div>
            <div class="times" >
            x
          </div>
        </a>
    </li>
    `;
	const el = document.querySelector(".message");
    if (el) {
        el.parentNode.removeChild(el);
    }
    
    document.querySelector(".bookmarks__list").insertAdjacentHTML("afterbegin", markup)
};

export const deleteItem = (id) => {
    const el = document.querySelector(`#${id}`)
    if (el){
        el.parentNode.removeChild(el)
    }
    document.querySelector(".btn--round").innerHTML = '<i class="fa-regular fa-bookmark fa-2x" style="color:white;"></i>'
};
