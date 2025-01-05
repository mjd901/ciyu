// 加载 JSON 数据
fetch('data.json')
   .then(response => response.json())
   .then(data => {
        let currentQuestionIndex = 0;
        const questionContainer = document.getElementById('question-container');
        const answerInput = document.getElementById('answer-input');
        const checkButton = document.getElementById('check-button');
        const nextButton = document.getElementById('next-button');
        const viewAnswerButton = document.getElementById('view-answer-button');
        const resultMessage = document.getElementById('result-message');
        const answerDisplay = document.getElementById('answer-display');

        // 显示题目函数（先展示成语）
        function displayQuestion() {
            const currentQuestion = data[currentQuestionIndex];
            questionContainer.textContent = `成语：${currentQuestion.word}`;
            answerDisplay.textContent = ''; // 清空之前的答案显示
        }

        // 检查答案函数
        function checkAnswer() {
            const currentQuestion = data[currentQuestionIndex];
            const userAnswer = answerInput.value.trim();
            if (userAnswer === currentQuestion.meaning) {
                resultMessage.textContent = '回答正确！';
            } else {
                resultMessage.textContent = `回答错误，正确答案是：${currentQuestion.meaning}`;
            }
        }

        // 切换到下一题函数
        function nextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < data.length) {
                displayQuestion();
                answerInput.value = '';
                resultMessage.textContent = '';
            } else {
                questionContainer.textContent = '题目已全部完成！';
                answerInput.disabled = true;
                checkButton.disabled = true;
                nextButton.disabled = true;
                viewAnswerButton.disabled = true;
            }
        }

        // 查看答案函数
        function viewAnswer() {
            const currentQuestion = data[currentQuestionIndex];
            answerDisplay.textContent = `答案：${currentQuestion.meaning}`;
        }

        displayQuestion();

        checkButton.addEventListener('click', checkAnswer);
        nextButton.addEventListener('click', nextQuestion);
        viewAnswerButton.addEventListener('click', viewAnswer);
    })
   .catch(error => console.error('加载数据出错：', error));