document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch data from JSON file
  async function fetchData() {
    try {
      const response = await fetch('../data/blog.json'); // Adjust path as necessary
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

  // Function to display article content
  function displayArticleContent(articleTitle, data) {
    const articleTitleElement = document.getElementById('article-title');
    const articleContentElement = document.getElementById('article-content');

    let articleFound = false;

    // Search for the article in trending articles
    data.trendingArticles.forEach(article => {
      if (article.title === articleTitle) {
        articleTitleElement.textContent = article.title;
        articleContentElement.innerHTML = parseContent(article.content);
        articleFound = true;
      }
    });

    // Search for the article in each category
    if (!articleFound) {
      data.categories.forEach(category => {
        category.articles.forEach(article => {
          if (article.title === articleTitle) {
            articleTitleElement.textContent = article.title;
            articleContentElement.innerHTML = parseContent(article.content);
            articleFound = true;
          }
        });
      });
    }

    if (!articleFound) {
      articleTitleElement.textContent = 'Article not found';
      articleContentElement.innerHTML = '';
    }

    // Show article container with fade animation
    const articleContainer = document.querySelector('.article-container');
    articleContainer.style.opacity = 0;
    setTimeout(() => {
      articleContainer.style.transition = 'opacity 1s ease';
      articleContainer.style.opacity = 1;
    }, 100);
  }

  // Function to parse content and handle images
  function parseContent(content) {
    let parsedContent = '';
    content.forEach(item => {
      if (item.type === 'text') {
        parsedContent += `<p>${item.text}</p>`;
      } else if (item.type === 'image') {
        parsedContent += `<img src="${item.url}" alt="Article Image">`;
      }
    });
    return parsedContent;
  }

  // Parse URL parameter to get the article title
  const urlParams = new URLSearchParams(window.location.search);
  const articleTitle = urlParams.get('title');

  const loadingElement = document.getElementById('article-title');
  loadingElement.textContent = 'Loading...';

  fetchData()
    .then(data => {
      if (data) {
        displayArticleContent(articleTitle, data);
      } else {
        console.error('No data available');
        loadingElement.textContent = 'Failed to load data';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      loadingElement.textContent = 'Failed to load data';
    });
});
