const questions = [
  {
    question: "1First question First question First question?",
    qeustionCategory: true,
    options: {
      option1:
        " 111 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: " 111 option1 sit amet consectetur",
      option3: "111 option1 consectetur adipisicing elit.",
      option4: "111 option1 Cumoluptate! Delectus placeat",
    },
    rightAnswers: [this.option1],
  },
  {
    question: "2First question First question First question?",
    qeustionCategory: true,

    options: {
      option1:
        " 222 option1  sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "222 option1 sit amet consectetur",
      option3: "222 option1 consectetur adipisicing elit.",
      option4: "222 option1 Cumoluptate! Delectus placeat",
    },
    rightAnswers: [this.option2],
  },
  {
    question: "3First question First question First question?",
    qeustionCategory: false,

    options: {
      option1:
        " 333 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "333 option1 sit amet consectetur",
      option3: "333 option1 consectetur adipisicing elit.",
      option4: "333 option1 Cumoluptate! Delectus placeat",
    },
    rightAnswers: [this.option1, this.option2],
  },
  {
    question: "4First question First question First question?",
    qeustionCategory: false,

    options: {
      option1:
        " 444 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "444 option1 sit amet consectetur",
      option3: "444 option1 consectetur adipisicing elit.",
      option4: "444 option1 Cumoluptate! Delectus placeat",
    },
    rightAnswers: [this.option1, this.option3],
  },
];

const rightAnswers = {
  qeustion1: [questions[0].options.option1],
  qeustion2: [questions[1].options.option2],
  qeustion3: [questions[2].options.option1, questions[2].options.option2],
  qeustion4: [questions[3].options.option1, questions[3].options.option3],
};

const question = document.getElementById("question");
const option1 = document.getElementById("option1-label");
const option2 = document.getElementById("option2-label");
const option3 = document.getElementById("option3-label");
const option4 = document.getElementById("option4-label");

const allOptions = document.querySelectorAll("input");

const nextBtn = document.querySelector("#next-btn");

let studentAnswer = [];

// change question content
const htmlTemplate = (questionIdx) => {
  question.innerText = questionIdx.question;
  option1.innerText = questionIdx.options.option1;
  option2.innerText = questionIdx.options.option2;
  option3.innerText = questionIdx.options.option3;
  option4.innerText = questionIdx.options.option4;
};

const renderQuestion = (questionIdx) => {
  htmlTemplate(questionIdx);
  // switch radio to checkbox & vise versa
  if (question.qeustionCategory) {
    allOptions.forEach((inputTag) => {
      inputTag.type = "radio";
    });
  } else {
    allOptions.forEach((inputTag) => (inputTag.type = "checkbox"));
  }
};

// move to next question
let currentQuestionIndex = 0;

const nextQuestionHandler = () => {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    renderQuestion(questions[currentQuestionIndex]);
    nextBtn.innerText = "Next";
  } else if (currentQuestionIndex == questions.length) {
    nextBtn.innerText = "Finish";
  }
};
renderQuestion(questions[currentQuestionIndex]);
