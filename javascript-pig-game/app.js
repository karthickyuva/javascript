/*
 GAME RULES:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

 */

var scores, roundedScore, activePlayer, gamePlaying;

	// Init function New/Start Game
	init();

	document.querySelector('.btn-roll').addEventListener('click', function () {
		if (gamePlaying) {
			// Random number
			var dice = Math.floor(Math.random() * 6 + 1);
			var diceDom = document.querySelector('.dice');

			// Display Result
			diceDom.style.display = 'block';
			diceDom.src = 'dice-' + dice + '.png';

			//Update the rounded score if the rolled number is NOT 1
			document.querySelector('#current-' + activePlayer).innerHTML = roundedScore;

			if (dice !== 1) {
				// Add Score
				// roundedScore = roundedScore + dice;
				roundedScore += dice;
				document.getElementById('current-' + activePlayer).textContent = roundedScore;
			} else {
				// Next Player
				nextPlayer();
			}
		}

	});


	document.querySelector('.btn-hold').addEventListener('click', function () {
		if (gamePlaying) {
			// Add current score to Global score
			scores[activePlayer] += roundedScore;

			// Update the UI
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

			// Check if the player won the game
			if (scores[activePlayer] >= 20) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;
			} else {
				//Next Player
				nextPlayer();
			}
		}

	});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundedScore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	//Set Active Player

	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}
	document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	gamePlaying = true;
	scores = [0, 0];
	roundedScore = 0;
	activePlayer = 0;
	// var dice = Math.floor(Math.random() * 6 + 1);
	// console.log(dice);

	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}