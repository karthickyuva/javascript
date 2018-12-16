import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInputs = () => {
    elements.searchInput.value = "";
};

export const clearSearhResults = () => {
    elements.searchResults.innerHTML = "";
    elements.searchResPages.innerHTML = "";
}

const limitRecipeTitle = (title, limit) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }

            return (acc + cur.length);
        }, 0);

        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markUp = `
    <li>
        <a class="likes__link" href="#${recipe.recipe_id}">
            <figure class="likes__fig">
                <img src=${recipe.image_url} alt=${recipe.title}>
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(recipe.title, 20)}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    elements.searchResults.insertAdjacentHTML('beforeend', markUp);
};

const displayButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1) {
        // Button goes to next page
        button = displayButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `${displayButton(page, 'next')} ${displayButton(page, 'prev')}`;
    } else if (page === pages && pages > 1) {
        // Button goes to prev page
        button = displayButton(page, 'prev');

    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // Results Pagination
    renderButtons(page, recipes.length, resPerPage);
};