async function fetchQuestions() {
  const response = await fetch('../data/q.json'); // Assuming questions.json is in the same directory
  const data = await response.json();
  return data.questions;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayQuestions(questions) {
  const container = document.getElementById('question-container');
  container.innerHTML = ''; // Clear previous questions if any

  questions.slice(0, 15).forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';

    const questionText = document.createElement('p');
    questionText.className = 'question-label';
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    question.options.forEach(option => {
      const formCheck = document.createElement('div');
      formCheck.className = 'form-check';

      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.className = 'form-check-input';
      optionInput.name = `question-${index}`;
      optionInput.value = option.score;
      optionInput.id = `question-${index}-option-${option.score}`;

      const optionLabel = document.createElement('label');
      optionLabel.className = 'form-check-label';
      optionLabel.htmlFor = optionInput.id;
      optionLabel.textContent = option.option;

      formCheck.appendChild(optionInput);
      formCheck.appendChild(optionLabel);
      optionsContainer.appendChild(formCheck);
    });

    questionDiv.appendChild(optionsContainer);
    container.appendChild(questionDiv);
  });
}

function calculateScore() {
  const questionDivs = document.querySelectorAll('.question');
  let totalScore = 0;

  questionDivs.forEach(questionDiv => {
    const selectedOption = questionDiv.querySelector('input[type="radio"]:checked');
    if (selectedOption) {
      totalScore += parseInt(selectedOption.value);
    }
  });

  return totalScore;
}

document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const totalScore = calculateScore();
  displayResult(totalScore);
});

function displayResult(score) {
  const resultText = getResultText(score);
  document.getElementById('result-title').textContent = 'Your Result';
  document.getElementById('result-text').innerHTML = resultText; // Use innerHTML to allow HTML content
  document.getElementById('result-popup').classList.add('show');

  // Automatically close the popup after 5 seconds
  setTimeout(() => {
    document.getElementById('result-popup').classList.remove('show');
  }, 50000); // Changed to 5000 milliseconds (5 seconds)
}

function getResultText(score) {
  let result = '';
  if (score < 25) {
    result = `You got ${score} out of 75. Better luck next time! <img src="../image/convo.png" alt="Bad Result" style="max-width: 100%; height: auto;">`;
  } else if (score < 40) {
    result = `You got ${score} out of 75. Good job! <img src="../image/mood.png" alt="Average Result" style="max-width: 100%; height: auto;">`;
  } else {
    result = `You got ${score} out of 75. Excellent! <img src="../image/hos.png" alt="Good Result" style="max-width: 100%; height: auto;">`;
  }
  return result;
}

// Load questions and display a random set of 15
fetchQuestions()
  .then(questions => {
    const shuffledQuestions = shuffle(questions);
    displayQuestions(shuffledQuestions);
    localStorage.setItem('questions', JSON.stringify(shuffledQuestions)); // Store questions in localStorage
  })
  .catch(err => console.error('Error fetching questions:', err));

// Close popup button functionality
document.getElementById('close-popup-btn').addEventListener('click', function() {
  document.getElementById('result-popup').classList.remove('show');
});

// Share button functionality with customized template
document.getElementById('share-btn').addEventListener('click', function() {
  const score = calculateScore();
  const shareData = {
    title: 'My Questionnaire Result',
    text: getResultText(score).replace(/<img[^>]*>/g, ''), // Remove img tags for sharing text
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Shared successfully'))
      .catch((error) => {
        console.error('Error sharing:', error);
        alert('Sharing failed. Please try again.');
      });
  } else {
    // Fallback for browsers that do not support navigator.share
    const subject = `Questionnaire Result: ${shareData.title}`;
    const body = `I completed the questionnaire and got a score of ${score} out of 75.\n\n${shareData.text}\n\nCheck it out: ${shareData.url}`;
    const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the mail client in a new window
    window.open(shareUrl, '_blank');
  }
});

// Scroll to top when submitting the form (optional enhancement)
document.getElementById('submit-btn').addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Optional: Handle form reset
document.getElementById('question-form').addEventListener('reset', function() {
  document.getElementById('score-container').style.display = 'none';
});
