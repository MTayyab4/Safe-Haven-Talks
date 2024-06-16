
// Configuration
const articlesPerPage = 3;
const articlesContainer = document.getElementById('articles-container');
const paginationContainer = document.getElementById('pagination-container');

// Fetch articles data from JSON
fetch('../data/latest.json')
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;
    const totalPages = Math.ceil(articles.length / data.perPage);

    // Function to render articles for a given page
    function renderArticles(page) {
      articlesContainer.innerHTML = ''; // Clear previous articles
      const start = (page - 1) * data.perPage;
      const end = start + data.perPage;
      const paginatedArticles = articles.slice(start, end);

      paginatedArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('col-md-4');
        articleElement.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${article.image}" class="card-img-top" alt="${article.title}">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.content.substring(0, 50)}...</p>
              <a href="${article.link}" class="btn btn-primary">Read More</a>
            </div>
          </div>
        `;
        articlesContainer.appendChild(articleElement);
      });
    }

    // Function to render pagination
    function renderPagination() {
      paginationContainer.innerHTML = ''; // Clear previous pagination
      for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
          e.preventDefault();
          renderArticles(i);
          setActivePage(i);
        });
        paginationContainer.appendChild(pageItem);
      }
    }

    // Function to set the active page
    function setActivePage(page) {
      const pageItems = paginationContainer.querySelectorAll('.page-item');
      pageItems.forEach(item => item.classList.remove('active'));
      pageItems[page - 1].classList.add('active');
    }

    // Initial render
    renderArticles(1);
    renderPagination();
    setActivePage(1);
  })
  .catch(error => console.error('Error fetching articles:', error));

