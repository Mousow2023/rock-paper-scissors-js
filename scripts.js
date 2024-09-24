let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

console.log(score);
let playerMove = '';
let intervalId;
let isAutoPlaying = false;

// Pick the move of the computer
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber <= 1 / 3) {
    return 'rock';
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      getGameResult(pickComputerMove());
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// Output game result
function getGameResult(personMove) {
  const robotMove = pickComputerMove();
  result = '';

  if (personMove === 'rock') {
    if (robotMove === 'rock') {
      result = `It's a Tie`;
    } else if (robotMove === 'paper') {
      result = 'You lose';
    } else if (robotMove === 'scissors') {
      result = 'You Win';
    }

  } else if (personMove === 'paper') {
    if (robotMove === 'rock') {
      result = `You Win`;
    } else if (robotMove === 'paper') {
      result = `It's a Tie`;
    } else if (robotMove === 'scissors') {
      result = 'You lose';
    }

  } else if (personMove === 'scissors') {
    if (robotMove === 'rock') {
      result = `You lose`;
    } else if (robotMove === 'paper') {
      result = 'You Win';
    } else if (robotMove === 'scissors') {
      result = `It's a Tie`;
    }
  }

  if (result === 'You Win') {
    score.wins++;
  } else if (result === 'You lose') {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img class="move-icon" src="images/${playerMove}-emoji.png" alt="">
<img class="move-icon" src="images/${robotMove}-emoji.png" alt="">
Computer`;
  updateScore();

  return `You picked ${personMove}, computer picked ${robotMove}. ${result}
Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`
}

// Reset Score
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score')
  updateScore();
  return;
}

// Update the score
function updateScore() {
  const scoreElement = document.querySelector('.js-score');
  scoreElement.innerHTML = `Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`;
}