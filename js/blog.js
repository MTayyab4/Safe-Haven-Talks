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
      const articleElement = createArticleElement(article.title, article.content);
      trendingArticlesContainer.appendChild(articleElement);
    });
  } else {
    console.error('No articles available'); // Debug statement
  }
}

// Function to create article element
function createArticleElement(title, content) {
  const articleElement = document.createElement('div');
  articleElement.classList.add('article');
  articleElement.innerHTML = ` 
    <h5><b><a href="article.html?title=${encodeURIComponent(title)}">${title}</a></b></h5>
    ${parseContent(content)}
  `;
  return articleElement;
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

// Function to display featured videos
function displayFeaturedVideos(videos) {
  const featuredVideosContainer = document.getElementById('featured-videos');
  featuredVideosContainer.innerHTML = '';
  if (videos) {
    videos.forEach(video => {
      const videoElement = createVideoElement(video.title, video.url);
      featuredVideosContainer.appendChild(videoElement);
    });
  } else {
    console.error('No videos available'); // Debug statement
  }
}

// Function to create video element
function createVideoElement(title, url) {
  const videoElement = document.createElement('div');
  videoElement.classList.add('video');
  videoElement.innerHTML = ` 
    <h5><b>${title}</b></h5>
    <iframe width="100%" height="auto" src="${url}" frameborder="0" allowfullscreen></iframe>
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

// Fetch data and display content
fetchData()
  .then(data => {
    if (data) {
      displayPopularCategories(data.popularCategories);
      displayTrendingArticles(data.trendingArticles);
      displayFeaturedVideos(data.featuredVideos);
      displayCategories(data.categories);
    } else {
      console.error('No data available');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
