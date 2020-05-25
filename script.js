var	container = document.getElementById('container'),
	table = document.getElementById('table'),
	oSpan = document.createElement('span'),
 	xSpan = document.createElement('span'),
 	leftSpan = document.createElement('span'),
 	rightSpan = document.createElement('span'),
 	xShape = `
	 	<span id="x-span">
			<span id="left-x-span"></span>
			<span id="right-x-span"></span>
		</span>
	`,
	oShape = `<span id="o-span"></span>`,
	playerX = [],
	playerO = [],
	td = null,
	highlightBoxs = [],
	winningColor = '#80DA56',
	winnerDiv = document.getElementsByClassName('winner-div')[0],
	newGameBtn = document.getElementsByClassName('new-game-btn')[0],
	gameOver = false;

oSpan.id = 'o-span';
xSpan.id = 'x-span';
xSpan.classList.add('abs');
oSpan.classList.add('abs');
leftSpan.id = 'left-x-span';
rightSpan.id = 'right-x-span';
xSpan.appendChild(leftSpan);
xSpan.appendChild(rightSpan);

var curPlayer = xSpan;

// EVENTS
table.onmouseenter = function() {
	if (! gameOver) {
		container.appendChild(curPlayer);
	}
}

table.onmouseleave = function() {
	if (! gameOver) {
		container.removeChild(curPlayer);
	}
}

	table.onmousemove = function(e) {
	if (! gameOver) {
	  	curPlayer.style.left = (e.clientX - curPlayer.offsetWidth / 2) + 'px';
	  	curPlayer.style.top = (e.clientY - curPlayer.offsetHeight / 2) + 'px';
	}
}

table.onclick = function(e) {
	if (! gameOver) {
		var target = e.target;

		handleShapes(target);
	}
}

newGameBtn.onclick = function() {
	winnerDiv.innerHTML = "";

	highlightBoxs.forEach(function(num) {
		var box = document.getElementById(`box-${num}`);
		box.style.background = "";
	});

	Array.from(document.getElementsByTagName('td')).forEach(function(td) {
	  	td.innerHTML = "";
		td.style.background = "";
	});

	curPlayer = xSpan;
	playerX = [];
	playerO = [];
	highlightBoxs = [];
	gameOver = false;
}


// HELPERS
function handleShapes(target) {
	container.removeChild(curPlayer);
	
	td = target.closest('td');
	
	if (curPlayer.id == 'x-span') {
		if (td.innerHTML == "") {
			td.innerHTML = xShape;
		
			curPlayer = oSpan;

			checkWinner(playerX, "x");
		}
	} else {
		if (td.innerHTML == "") {
			td.innerHTML = oShape;

			curPlayer = xSpan;

			checkWinner(playerO, "o");
		}
	}

	container.appendChild(curPlayer);
	curPlayer.style.left = '-400px';
}

function checkWinner(player, winner) {
	var idArr = td.id.split('-');
	player.push(parseInt(idArr[1]));

	if (player.length >= 3) {
		if ((player.includes(1) && player.includes(2) && player.includes(3))) {
			highlightBoxs = [1, 2, 3];
		} else if (player.includes(4) && player.includes(5) && player.includes(6)) {
			highlightBoxs = [4, 5, 6];
		} else if (player.includes(7) && player.includes(8) && player.includes(9)) {
			highlightBoxs = [7, 8, 9];
		} else if (player.includes(1) && player.includes(4) && player.includes(7)) {
			highlightBoxs = [1, 4, 7];
		} else if (player.includes(2) && player.includes(5) && player.includes(8)) {
			highlightBoxs = [2, 5, 8];
		} else if (player.includes(3) && player.includes(6) && player.includes(9)) {
			highlightBoxs = [3, 6, 9];
		} else if (player.includes(1) && player.includes(5) && player.includes(9)) {
			highlightBoxs = [1, 5, 9];
		} else if (player.includes(3) && player.includes(5) && player.includes(7)) {
			highlightBoxs = [3, 5, 7];
		} else if (player.length == 5) {
			gameOver = true;
			winnerDiv.innerHTML = "No one wins";
			winnerDiv.style.color = 'red';

			Array.from(document.getElementsByTagName('td')).forEach(function(td) {
			  	td.style.background = '#dc0202';
			});
		}

		if (highlightBoxs.length > 0) {
			gameOver = true;

			highlightBoxs.forEach(function(num) {
				var box = document.getElementById(`box-${num}`);
				box.style.background = winningColor;

				if (winner == 'x') {
					Array.from(box.children[0].children).forEach(function(td) {
					  	td.style.backgroundColor = '#444';
					});

					winnerDiv.innerHTML = "Player <strong>X</strong> wins";
				} else if (winner == 'o') {
					box.children[0].style.borderColor = '#444';

					winnerDiv.innerHTML = "Player <strong>O</strong> wins";
				}
				
				winnerDiv.style.color = winningColor;
			});
		}
	}
}