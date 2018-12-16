import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = 'd4a37280d1221e5c3a9833a7fa62f337';
        try {
            const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = result.data.recipes;
            // console.log('result', this.recipes);
        } catch(error) {
            alert(error);
        }
        
    }
}