export const error = (parent, err) => {
    if (err === 400 ){
      var eror = "Sorry couldn't find recipe with that name "
    }


    const markup = 
    `
    <div class="error">
            <div>
              <i class="fa-solid fa-triangle-exclamation fa-5x" ></i>
            </div>
            <p>${eror}. Please try searching for pasta, fish, tomato etc...</p>
          </div>

    `

    parent.insertAdjacentHTML("afterbegin", markup)
}