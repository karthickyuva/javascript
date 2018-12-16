import Search from './models/Search';
import * as searchView from './views/SearchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
const controlSearch = async () => {
const searchInput =  document.querySelector('.search__field').value;
    // 1) Get query from view
    const query = searchInput;
    if (query) {
        // 2) New search
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInputs();
        searchView.clearSearhResults();
        renderLoader(elements.searchLoader);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.recipes);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
 });

 elements.searchResPages.addEventListener('click', e => {
     const btn = e.target.closest('.btn-inline');
     if (btn) {
         const goTo = parseInt(btn.dataset.goto, 10);
         searchView.clearSearhResults();
         searchView.renderResults(state.search.recipes, goTo);
     }
 });
