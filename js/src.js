document.addEventListener('DOMContentLoaded', function() {
    const articlesPerPage = 2;  // Number of articles per page
    let currentPage = 1;
    let articlesData;

    // Fetch the JSON data
    fetch('../data/featured.json')
        .then(response => response.json())
        .then(data => {
            articlesData = data;
            populateFeaturedArticle(data.featuredArticle);
            paginateArticles(data.latestArticles, currentPage, articlesPerPage);
            setupPagination(data.latestArticles, articlesPerPage);
        })
        .catch(error => console.error('Error fetching the articles:', error));

    function populateFeaturedArticle(article) {
        const featuredArticle = document.getElementById('featured-article');
        featuredArticle.innerHTML = `
            <img src="${article.image}" class="card-img-top" alt="${article.title}">
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.text}</p>
                <a href="${article.link}" class="btn btn-primary">Read more</a>
            </div>
        `;
    }

    function paginateArticles(articles, page, articlesPerPage) {
        const latestArticles = document.getElementById('latest-articles');
        latestArticles.innerHTML = '';

        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = Math.min(startIndex + articlesPerPage, articles.length);

        for (let i = startIndex; i < endIndex; i++) {
            const article = articles[i];
            const articleHTML = `
                <div class="col-md-6">
                    <div class="card mb-4">
                        <img src="${article.image}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.text}</p>
                            <a href="${article.link}" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </div>
            `;
            latestArticles.innerHTML += articleHTML;
        }
    }

    function setupPagination(articles, articlesPerPage) {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(articles.length / articlesPerPage);

        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageItem.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = i;
                paginateArticles(articlesData.latestArticles, currentPage, articlesPerPage);
                updatePagination(totalPages, currentPage);
            });
            pagination.appendChild(pageItem);
        }
    }

    function updatePagination(totalPages, currentPage) {
        const pageItems = document.querySelectorAll('.pagination .page-item');
        pageItems.forEach((item, index) => {
            item.className = 'page-item' + ((index + 1) === currentPage ? ' active' : '');
        });
    }
});
