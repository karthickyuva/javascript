export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResults: document.querySelector('.results__list'),
    searchLoader: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages')
};

export const elementString = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if (loader) { loader.parentElement.removeChild(loader); }
};