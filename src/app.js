// 質問データ（名前を動的に挿入）
const questionsTemplate = [
    { text: "{あなた}の好きな食べ物は？", choices: ["寿司", "ピザ", "ラーメン", "カレー", "ハンバーガー"] },
    { text: "{相手}の好きな食べ物は？", choices: ["寿司", "ピザ", "ラーメン", "カレー", "ハンバーガー"] },
    { text: "{あなた}の趣味は？", choices: ["映画鑑賞", "読書", "スポーツ", "旅行", "音楽"] },
    { text: "{相手}の趣味は？", choices: ["映画鑑賞", "読書", "スポーツ", "旅行", "音楽"] },
    { text: "{あなた}の好きな色は？", choices: ["赤", "青", "緑", "黄色", "紫"] },
    { text: "{相手}の好きな色は？", choices: ["赤", "青", "緑", "黄色", "紫"] }
];

let questions = [];
let currentQuestionIndex = 0;
let user1Answers = [];
let user2Answers = [];
let yourName = "";
let partnerName = "";

// 要素の取得
const nameContainer = document.getElementById("name-container");
const yourNameInput = document.getElementById("your-name");
const partnerNameInput = document.getElementById("partner-name");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesContainer = document.getElementById("choices-container");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-button");

// 名前を取得して質問を開始
startButton.addEventListener("click", () => {
    yourName = yourNameInput.value.trim();
    partnerName = partnerNameInput.value.trim();

    if (!yourName || !partnerName) {
        alert("名前を入力してください！");
        return;
    }

    // 質問データに名前を反映
    questions = questionsTemplate.map((q) => ({
        ...q,
        text: q.text.replace("{あなた}", yourName).replace("{相手}", partnerName)
    }));

    // 名前入力フォームを非表示にして質問を表示
    nameContainer.style.display = "none";
    questionContainer.style.display = "block";
    showQuestion();
});

// 質問を表示
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.text;

        // 選択肢をクリア
        choicesContainer.innerHTML = "";

        // 選択肢を生成
        currentQuestion.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.classList.add("choice-button");
            button.addEventListener("click", () => handleChoice(choice));
            choicesContainer.appendChild(button);
        });
    } else {
        calculateScore();
    }
}

// 選択肢が選ばれたときの処理
function handleChoice(choice) {
    if (currentQuestionIndex % 2 === 0) {
        // 偶数インデックスは自分の回答
        user1Answers.push(choice);
    } else {
        // 奇数インデックスは相手の回答
        user2Answers.push(choice);
    }
    currentQuestionIndex++;
    showQuestion();
}

// スコアを計算
function calculateScore() {
    let score = 0;
    for (let i = 0; i < user1Answers.length; i++) {
        if (user1Answers[i] === user2Answers[i]) {
            score++;
        }
    }

    const percentage = Math.round((score / user1Answers.length) * 100);
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultElement.textContent = `${yourName}さんと${partnerName}さんの仲良し度: ${percentage}%！`;
}

// 再スタート
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    user1Answers = [];
    user2Answers = [];
    nameContainer.style.display = "block";
    questionContainer.style.display = "none";
    resultContainer.style.display = "none";
    yourNameInput.value = "";
    partnerNameInput.value = "";
});