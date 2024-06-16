// Function to fetch data from JSON file
async function fetchData() {
  try {
    const response = await fetch('../data/blog.json'); // Ensure this path is correct
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Debug statement
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

// Function to display category articles
function displayCategoryArticles(categoryName, categories) {
  const categoryTitleElement = document.getElementById('category-title');
  const categoryArticlesContainer = document.getElementById('category-articles');
  const loadingElement = document.getElementById('loading');

  if (loadingElement) {
    loadingElement.style.display = 'none';
  }

  categoryArticlesContainer.innerHTML = '';

  const category = categories.find(cat => cat.name === categoryName);
  if (category) {
    categoryTitleElement.textContent = category.name;
    category.articles.forEach((article, index) => {
      const delay = (index + 1) * 100; // Adding delay for each article
      setTimeout(() => {
        const articleElement = createArticleElement(article.title, article.content);
        categoryArticlesContainer.appendChild(articleElement);
        articleElement.classList.add('fade-in');
      }, delay);
    });
  } else {
    categoryTitleElement.textContent = 'Category not found';
  }
  console.log('Category Name:', categoryName);
  console.log('Category:', category);

  // Show articles container with fade animation
  const categoryContainer = document.querySelector('.container');
  categoryContainer.classList.add('fade-in');
}

// Function to create article element
function createArticleElement(title, content) {
  const articleElement = document.createElement('a');
  articleElement.classList.add('list-group-item', 'list-group-item-action', 'mb-2', 'py-3', 'px-4');
  articleElement.href = `article.html?title=${encodeURIComponent(title)}`;

  let limitedContent = '';

  // Find the first text paragraph and limit it to 50 characters
  const firstTextParagraph = content.find(item => item.type === 'text');
  if (firstTextParagraph) {
    const textContent = firstTextParagraph.text;
    limitedContent = `<p>${textContent.substring(0, 50)}...</p>`;
  }

  articleElement.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="mb-0">${title}</h5>
      <small class="text-muted">Read more</small>
    </div>
    ${limitedContent}
  `;
  return articleElement;
}

// Function to display an ad element
function createAdElement() {
  const adElement = document.createElement('div');
  adElement.classList.add('ad-container', 'mb-2', 'py-3', 'px-4');
  adElement.innerHTML = `
    <div class="ad-placeholder">
      <!-- Google ad script goes here -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-xxxxxxxxxx"
           data-ad-slot="yyyyyyyyyy"
           data-ad-format="auto"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  `;
  return adElement;
}

const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('category');

const loadingElement = document.getElementById('category-title');
if (loadingElement) {
  loadingElement.textContent = 'Loading...';
}

fetchData()
  .then(data => {
    if (data) {
      displayCategoryArticles(categoryName, data.categories);
    } else {
      console.error('No data available');
      if (loadingElement) {
        loadingElement.textContent = 'Failed to load data';
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
    if (loadingElement) {
      loadingElement.textContent = 'Failed to load data';
    }
  });

// Function to create content elements including ads if available
function createContentElements(content) {
  const contentElements = [];

  content.forEach(item => {
    if (item.type === 'text') {
      const textElement = document.createElement('p');
      textElement.textContent = item.text;
      contentElements.push(textElement);
    } else if (item.type === 'image') {
      const imageElement = document.createElement('img');
      imageElement.src = item.url;
      imageElement.classList.add('img-fluid', 'mb-3');
      contentElements.push(imageElement);
    } else if (item.type === 'ad') {
      const adElement = createAdElement();
      contentElements.push(adElement);
    }
  });

  return contentElements;
}
