// Function to fetch data from JSON file
async function fetchData() {
  try {
    const response = await fetch('data.json'); // Adjust path as necessary
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to populate content based on page type
function populateContent(pageType, data) {
  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = '';

  if (pageType === 'resources') {
    data.resources.forEach(resource => {
      const resourceElement = document.createElement('div');
      resourceElement.classList.add('resource-item', 'mb-4');
      resourceElement.innerHTML = `
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <a href="${resource.link}" class="btn btn-primary">Read More</a>
      `;
      contentContainer.appendChild(resourceElement);
    });
  } else if (pageType === 'blog') {
    data.blogPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post', 'mb-4');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="blogPost.html?title=${encodeURIComponent(post.title)}" class="btn btn-primary">Read More</a>
      `;
      contentContainer.appendChild(postElement);
    });
  }
}

// Determine page type from URL
const urlParams = new URLSearchParams(window.location.search);
const pageType = urlParams.get('page') || 'resources';

// Fetch data and populate content
fetchData()
  .then(data => {
    if (data) {
      populateContent(pageType, data);
    } else {
      console.error('No data available');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Event listener for search
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value;
  window.location.href = `search.html?query=${encodeURIComponent(query)}`;
});
