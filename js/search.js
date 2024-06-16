async function fetchData() {
  try {
    const responses = await Promise.all([
      fetch('../data/data.json'),
      fetch('../data/data.json'),
      fetch('../data/latest.json'),
    ]);
    const data = await Promise.all(responses.map(response => response.json()));
    const articles = data[0].articles;
    const features = data[1].features;
    const latest = data[2].latest;
    const combinedData = [...articles, ...features, ...latest];
    const normalizedData = combinedData.map(item => {
      if (item.title) {
        return {
          ...item,
          title: item.title.toLowerCase(),
          content: item.content ? item.content.toLowerCase() : '',
          category: item.category ? item.category.toLowerCase() : '',
        };
      } else if (item.name) {
        return {
          ...item,
          title: item.name.toLowerCase(),
          content: item.description ? item.description.toLowerCase() : '',
          category: '',
        };
      } else {
        return {
          ...item,
          title: '',
          content: item.content ? item.content.toLowerCase() : '',
          category: '',
        };
      }
    });
    return normalizedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

function searchJSON(data, query) {
  const results = [];
  const seenTitles = new Set();
  const seenCategories = new Set();
  data.forEach(item => {
    const title = item.title ? item.title : '';
    const content = item.content ? item.content : '';
    const category = item.category ? item.category : '';
    if (title.includes(query) && !seenTitles.has(title)) {
      results.push({ ...item, type: 'article' });
      seenTitles.add(title);
    }
    if (category.includes(query) && !seenCategories.has(category)) {
      results.push({ name: category, type: 'category' });
      seenCategories.add(category);
    }
  });
  return results;
}

async function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (!query) {
    alert('Please enter a search query');
    return;
  }
  try {
    const data = await fetchData();
    const results = searchJSON(data, query);
    console.log('Search results:', results);
    displayResults(results);
    localStorage.setItem('searchResults', JSON.stringify(results));
  } catch (error) {
    console.error('Error during search:', error);
    alert('Failed to perform search');
  }
}