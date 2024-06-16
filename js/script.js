// Fetch data and display content
async function fetchData() {
    try {
        const response = await fetch('data/blog.json'); // Adjust path as necessary
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debug statement
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to display popular categories
function displayPopularCategories(categories) {
    const popularCategoriesContainer = document.getElementById('popular-categories');
    popularCategoriesContainer.innerHTML = '';
    if (categories) {
        categories.forEach(category => {
            const categoryElement = createCategoryElement(category.name, category.url);
            popularCategoriesContainer.appendChild(categoryElement);
        });
    } else {
        console.error('No categories available'); // Debug statement
    }
}

// Function to create category element
function createCategoryElement(name, url) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category');
    categoryElement.innerHTML = `<a href="${url}" class="category-link">${name}</a>`;
    return categoryElement;
}

// Function to display trending articles
function displayTrendingArticles(articles) {
    const trendingArticlesContainer = document.getElementById('trending-articles');
    trendingArticlesContainer.innerHTML = '';
    if (articles) {
        articles.forEach(article => {
            const articleElement = createArticleElement(article.title, article.summary, article.url);
            trendingArticlesContainer.appendChild(articleElement);
        });
    } else {
        console.error('No articles available'); // Debug statement
    }
}

// Function to create article element
function createArticleElement(title, summary, url) {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');
    articleElement.innerHTML = ` 
        <h5><b><a href="${url}">${title}</a></b></h5>
        <p>${summary}</p>
        <a href="${url}" class="btn btn-primary">Read More</a>
    `;
    return articleElement;
}

// Function to display featured videos
function displayFeaturedVideos(videos) {
    const featuredVideosContainer = document.getElementById('featured-videos');
    featuredVideosContainer.innerHTML = '';
    if (videos) {
        videos.forEach(video => {
            const videoElement = createVideoElement(video.title, video.summary, video.videoUrl, video.url);
            featuredVideosContainer.appendChild(videoElement);
        });
    } else {
        console.error('No videos available'); // Debug statement
    }
}

// Function to create video element
function createVideoElement(title, summary, videoUrl, url) {
    const videoElement = document.createElement('div');
    videoElement.classList.add('video');
    videoElement.innerHTML = ` 
        <h5><b><a href="${url}">${title}</a></b></h5>
        <p>${summary}</p>
        <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen></iframe>
        </div>
        <a href="${url}" class="btn btn-primary mt-3">Watch More</a>
    `;
    return videoElement;
}

// Function to display categories
function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = '';
    if (categories) {
        categories.forEach(category => {
            const categoryElement = createCategoryElement(category.name, category.url);
            categoriesContainer.appendChild(categoryElement);
        });
    } else {
        console.error('No categories available'); // Debug statement
    }
}

// Function to search and filter articles
function searchArticles(articles, query) {
    return articles.filter(article => {
        const title = article.title.toLowerCase();
        const summary = article.summary.toLowerCase();
        return title.includes(query) || summary.includes(query);
    });
}

// Function to display search suggestions
function displaySearchSuggestions(suggestions) {
    const searchSuggestionsContainer = document.getElementById('search-suggestions');
    searchSuggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('search-suggestion');
        suggestionElement.textContent = suggestion.title;
        suggestionElement.addEventListener('click', () => {
            window.location.href = suggestion.url;
        });
        searchSuggestionsContainer.appendChild(suggestionElement);
    });
}

// Fetch data and display content
fetchData()
    .then(data => {
        if (data) {
            displayPopularCategories(data.categories);
            displayTrendingArticles(data.articles);
            displayFeaturedVideos(data.videos);
            displayCategories(data.categories);

            // Add event listener to search input
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filteredArticles = searchArticles(data.articles, query);
                displaySearchSuggestions(filteredArticles);
            });
        } else {
            console.error('No data available');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
