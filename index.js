let currentQuestionIndex = 0;
let questions = [];

const questionText = document.getElementById('question');
const answerButtons = document.querySelectorAll('.btn');
const nextButton = document.getElementById('next-btn');

fetch('https://opentdb.com/api.php?amount=50&category=15&difficulty=easy&type=multiple')
    .then(Response => Response.json())
    .then(data => {
        questions = data.results;
        showQuestion();
    })
    .catch(error => console.error(error))


    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.innerHTML = decodeHTML(question.question);

        const answers = [...question.incorrect_answers];
        const correctIndex = Math.floor(Math.random() * 4);
        answers.splice(correctIndex, 0, question.correct_answer);

        answerButtons.forEach((btn, index) => {
            btn.innerHTML = decodeHTML(answers[index]);
            btn.onclick = () => {
                if (index === correctIndex) {
                    btn.style.backgroundColor = 'lightgreen';
                }
                else {
                    btn.style.backgroundColor = 'salmon';
                    answerButtons[correctIndex].style.backgroundColor = 'lightgreen';
                }
                answerButtons.forEach(b => b.disabled = true);

            };
            btn.style.backgroundColor = '';
            btn.disabled = false;
        })
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        }
        else {
            alert('Next');
            location.reload();
        }
    });

    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }