let score = 0;
let streak = 0;
let timeLeft = 60;
let timerId = null;

function startTimer() {

    clearInterval(timerId);
    timeLeft = 60;
    document.getElementById("timer").innerHTML = timeLeft;

    timerId = setInterval(() => {

        timeLeft--;
        document.getElementById("timer").innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            document.getElementById("answer").disabled = true;
            document.getElementById("message").innerHTML = "⏰ Time's up!";
        }

    }, 1000);
}

async function loadQuestion() {

    const response = await fetch("/api/question");
    const data = await response.json();

    document.getElementById("question").innerHTML = data.question;
}

async function submitAnswer() {

    if (timeLeft <= 0) {
        return;
    }

    let answer = document.getElementById("answer").value;

    const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            answer
        })
    });

    const result = await response.json();

    if (result.correct) {

        streak++;
        score = result.points;

        document.getElementById("btc").innerHTML = result.satoshis + " sats";
        document.getElementById("message").innerHTML = "✅ Correct";

    } else {

        streak = 0;
        document.getElementById("message").innerHTML = "❌ Wrong";
    }

    document.getElementById("score").innerHTML = score;
    document.getElementById("streak").innerHTML = streak;
    document.getElementById("answer").value = "";

    loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {

    loadQuestion();
    startTimer();

    document.getElementById("answer").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            submitAnswer();
        }
    });
});
