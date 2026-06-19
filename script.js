const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const watchAdBtn = document.getElementById("watchAd");

let score = 0;
let lives = 5;

function updateUI() {
    scoreText.textContent = score;
    livesText.textContent = lives;
}

function moveBox() {
    const maxX = gameArea.clientWidth - box.clientWidth;
    const maxY = gameArea.clientHeight - box.clientHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    box.style.left = x + "px";
    box.style.top = y + "px";
}

// Correct click
box.addEventListener("click", function (event) {
    event.stopPropagation();

    score++;
    updateUI();
    moveBox();
});

// Wrong click
gameArea.addEventListener("click", function () {

    lives--;
    updateUI();

    if (lives <= 0) {

        const continueGame = confirm(
            "Game Over!\n\nScore: " + score +
            "\n\nWatch an Ad to Continue with 2 Lives?"
        );

        if (continueGame) {

            watchAdBtn.disabled = true;

            let seconds = 5;
            watchAdBtn.textContent = "Watching Ad... " + seconds;

            const adTimer = setInterval(function () {

                seconds--;

                watchAdBtn.textContent = "Watching Ad... " + seconds;

                if (seconds <= 0) {

                    clearInterval(adTimer);

                    lives = 2;
                    updateUI();

                    alert("Ad Completed! +2 Lives");

                    watchAdBtn.disabled = false;
                    watchAdBtn.textContent = "📺 Watch Ad (+1 Life)";
                }

            }, 1000);

        } else {

            alert("Final Score: " + score);

            score = 0;
            lives = 5;

            updateUI();
            moveBox();
        }
    }
});

// Watch Ad button (+1 Life)
watchAdBtn.addEventListener("click", function () {

    if (lives >= 5) {
        alert("Lives are already full!");
        return;
    }

    watchAdBtn.disabled = true;

    let seconds = 5;
    watchAdBtn.textContent = "Watching Ad... " + seconds;

    const adTimer = setInterval(function () {

        seconds--;

        watchAdBtn.textContent = "Watching Ad... " + seconds;

        if (seconds <= 0) {

            clearInterval(adTimer);

            lives++;
            updateUI();

            alert("Ad Completed! +1 Life");

            watchAdBtn.disabled = false;
            watchAdBtn.textContent = "📺 Watch Ad (+1 Life)";
        }

    }, 1000);
});

// Start game
moveBox();
updateUI();