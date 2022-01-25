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
  {
    question: "Text Area Question?",
    qeustionCategory: "textAreaQ",

    rightAnswers: ["Hello World"],
  },
];
// All Right Answers
const rightAnswers = {
  qeustion1: [questions[0].options.option1],
  qeustion2: [questions[1].options.option2],
  qeustion3: [questions[2].options.option1, questions[2].options.option2],
  qeustion4: [questions[3].options.option1, questions[3].options.option3],
  qeustion5: [questions[4].rightAnswers],
};
// Target Each Single Element
const question = document.getElementById("question");
const option1 = document.getElementById("option1-label");
const option2 = document.getElementById("option2-label");
const option3 = document.getElementById("option3-label");
const option4 = document.getElementById("option4-label");

const inputOption1 = document.getElementById("option1");
const inputOption2 = document.getElementById("option2");
const inputOption3 = document.getElementById("option3");
const inputOption4 = document.getElementById("option4");
const inputDivs = document.getElementsByClassName("answer-option");
const txtArea = document.getElementById("txtArea");
const allOptions = document.querySelectorAll("input");

const nextBtn = document.querySelector("#next-btn");

const renderQuestion = (questionIdx) => {
  // estimatedTime();
  htmlTemplate(questionIdx);
  // switch radio to checkbox & vise versa
  if (
    questionIdx.qeustionCategory &&
    questionIdx.qeustionCategory != "textAreaQ"
  ) {
    allOptions.forEach((inputTag) => {
      inputTag.type = "radio";
    });
  } else if (
    !questionIdx.qeustionCategory &&
    questionIdx.qeustionCategory != "textAreaQ"
  ) {
    allOptions.forEach((inputTag) => (inputTag.type = "checkbox"));
  } else if (questionIdx.qeustionCategory == "textAreaQ") {
    displayContentSwitcher();
    //invoke function that chenge all checkboxs&radio to be hidden and textArea to be displayed
  }
};

const examResult = () => {
  if (totoalStudentAnswer == questions.allAnswers) {
    console.log("###RESULT: ");
  } else {
    console.log("??????????RESULT: ");
  }
  console.log("RESULT: ");
  console.log(totoalStudentAnswer);
};

// change question content
const htmlTemplate = (questionIdx) => {
  question.innerText = questionIdx.question;
  if (questionIdx.options) {
    option1.innerText = questionIdx.options.option1;
    option2.innerText = questionIdx.options.option2;
    option3.innerText = questionIdx.options.option3;
    option4.innerText = questionIdx.options.option4;

    //
    inputOption1.value = questionIdx.options.option1;
    inputOption2.value = questionIdx.options.option2;
    inputOption3.value = questionIdx.options.option3;
    inputOption4.value = questionIdx.options.option4;
  } else {
    // console.log("no options");
    displayContentSwitcher();
  }
};

// move to next question
let currentQuestionIndex = 0;
const nextQuestionHandler = () => {
  unCheckInputs();
  let newIndex = currentQuestionIndex + 1;
  const lastQindex = questions.length - 1;
  if (newIndex == lastQindex) {
    console.log("Finifs ----newIndex");
    nextBtn.innerText = "Finish";
  }
  console.log(newIndex);
  if (questions.length == newIndex) {
    examResult();
    return;
  }
  console.log(newIndex);

  currentQuestionIndex++;
  renderQuestion(questions[currentQuestionIndex]);
};
//uncheck boxes&radios eachNext-btn
const unCheckInputs = () => {
  let answerOptions = document.getElementsByName("Answer");
  answerOptions.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });
};
//Picking Answers
let totoalStudentAnswer = [];
const answerHandler = () => {
  let singleAnswer = [];
  let answerOptions = document.getElementsByName("Answer");
  answerOptions.forEach((op, idx) => {
    if (op.checked) {
      singleAnswer.push(op.value);
    } else if (!op.checked && op.checked) {
      singleAnswer.push(op.value);
    }
  });
  totoalStudentAnswer[currentQuestionIndex] = singleAnswer;
};

// Hide and Display Questions Contenet
const displayContentSwitcher = () => {
  if (txtArea.style.display == "none") {
    txtArea.style.display = "flex";
    // inputDivs.style.display = "none";
    inputOption1.style.display = "none";
    inputOption2.style.display = "none";
    inputOption3.style.display = "none";
    inputOption4.style.display = "none";
    option1.style.display = "none";
    option2.style.display = "none";
    option3.style.display = "none";
    option4.style.display = "none";
  } else {
    txtArea.style.display = "none";
    // inputDivs.style.display = "flex";

    inputOption1.style.display = "flex";
    inputOption2.style.display = "flex";
    inputOption3.style.display = "flex";
    inputOption4.style.display = "flex";
    option1.style.display = "flex";
    option2.style.display = "flex";
    option3.style.display = "flex";
    option4.style.display = "flex";
  }
};
renderQuestion(questions[currentQuestionIndex]);
