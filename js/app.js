
const eventListeners = () => {

        const showBtn = document.getElementById("show-btn");
        const questionCard = document.querySelector(".question-card");
        const closeBtn = document.querySelector(".close-btn");
        const form = document.getElementById("question-form");
        const feedback = document.querySelector(".feedback");
        const questionInput = document.getElementById("question-input");
        const answerInput = document.getElementById("answer-input");
        const questionList = document.getElementById("questions-list");
        let data = [];
        let id = 1;

        const ui = new UI();

        showBtn.addEventListener('click', () => {
            ui.showQuestion(questionCard);
        });

        closeBtn.addEventListener('click', () => {
            ui.hideQuestion(questionCard);
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const questionValue = questionInput.value;
            const answerValue = answerInput.value;

            if(questionValue === '' || answerValue === '') {
                feedback.classList.add('showItem', 'alert-danger');
                feedback.textContent = 'cannot add empty values';

                setTimeout(() => {
                    feedback.classList.remove("alert-danger", "showItem");
                }, 2000);
            } else {
                const question = new Question(id, questionValue, answerValue)
                data.push(question);
                id++;
                console.log(question);
                ui.addQuestion(questionList, question);
                ui.clearFields(questionInput, answerInput);
            }
        });

        questionList.addEventListener('click', (event) => {
            event.preventDefault();
            if(event.target.classList.contains('delete-flashcard')) {

                let id = event.target.dataset.id;
                questionList.removeChild(
                    event.target.parentElement.parentElement.parentElement);

                    let tempData = data.filter(item => {
                        return item.id !== +id;
                    });

                    data = tempData;

            } else if (event.target.classList.contains('show-answer')) {

                event.target.nextElementSibling.classList.toggle('showItem');

            } else if (event.target.classList.contains('edit-flashcard')) {

                let id = event.target.dataset.id;

                questionList.removeChild(
                    event.target.parentElement.parentElement.parentElement);

                ui.showQuestion(questionCard);

                const tempQuestion = data.filter(item => {
                    return item.id === +id;
                });

                let tempData = data.filter(item => {
                    return item.id !== +id;
                });

                data = tempData;
                
                questionInput.value = tempQuestion[0].title;
                answerInput.value = tempQuestion[0].answer;
            }
        });
    }

class UI {
    constructor() {

    }

    showQuestion(element) {
        element.classList.add('showItem');
    }

    hideQuestion(element) {
        element.classList.remove('showItem');
    }

    clearFields(questionInput, answerInput) {
        questionInput.value = '';
        answerInput.value = '';
    }

    addQuestion(element, question) {

        console.log(question);

        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `<div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${question.title}</h4>
        <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
        <h5 class="answer mb-3">${question.answer}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
   
         <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
         <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
        </div>
       </div>`;

       element.appendChild(div);
    }

}

class Question {
    constructor(id, title, answer) {
        this.id = id;
        this.title = title;
        this.answer = answer;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
})