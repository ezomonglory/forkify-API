
import axios from "axios"
import { error } from "../view/errorView"

export class Search {
    constructor (query) {
        this.query = query
    }
  
    async getResult() {
        try {            
          var res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`)
          this.result = res.data.recipes
          
          
        } catch(error) {
          console.log(error)
          console.log(error.response)
          let err = error.response.status
          return err
        }
      }

    
}

