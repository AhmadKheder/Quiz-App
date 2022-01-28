const questions = [
  {
    questionId: "question1",
    question: "1First question First question First question?",
    options: {
      option1:
        " 111 option1 sit amet consectetur 111 option1 sit amet consectetur 111 option1 sit amet consectetur 111 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: " 111 option1 sit amet consectetur",
      option3: "111 option1 consectetur adipisicing elit.",
      option4: "111 option1 Cumoluptate! Delectus placeat",
    },
    type: "select",
    rightAnswers: ["option1"],
    inputType: "radio",
  },
  {
    questionId: "question2",
    question: "2First question First question First question?",
    options: {
      option1:
        " 222 option1  sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "222 option1 sit amet consectetur",
      option3: "222 option1 consectetur adipisicing elit.",
      option4: "222 option1 Cumoluptate! Delectus placeat",
    },
    type: "select",
    inputType: "radio",

    rightAnswers: ["option2"],
  },
  {
    questionId: "question3",
    question: "3First question First question First question?",

    options: {
      option1:
        "333 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "333 option1 sit amet consectetur",
      option3: "333 option1 consectetur adipisicing elit.",
      option4: "333 option1 Cumoluptate! Delectus placeat",
    },
    type: "multiSelect",
    inputType: "checkbox",

    rightAnswers: ["option1", "option2"],
  },
  {
    questionId: "question4",
    question: "4First question First question First question?",

    options: {
      option1:
        " 444 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "444 option1 sit amet consectetur",
      option3: "444 option1 consectetur adipisicing elit.",
      option4: "444 option1 Cumoluptate! Delectus placeat",
    },
    type: "multiSelect",
    inputType: "checkbox",

    rightAnswers: ["option1", "option3"],
  },
  {
    questionId: "question5",
    question: "Text Area Question?",
    type: "text",
    rightAnswers: ["Hello World"],
    inputType: "text",
  },
];

const nextBtn = document.querySelector("#next-btn");
let totoalStudentAnswer = [];

// move to next question
let currentQuestionIndex = 0;
const nextQuestionHandler = () => {
  answerHandler();
  unCheckInputs();
  let newIndex = currentQuestionIndex + 1;
  const lastQindex = questions.length - 1;
  if (newIndex == lastQindex) {
    nextBtn.innerText = "Finish";
  }
  if (questions.length == newIndex) {
    examResult();
    clearInterval(countDown);
    // window.location.href = "/";

    return;
  }

  currentQuestionIndex++;
  renderHtmlContentByQuestionType(questions[currentQuestionIndex]);
};

const answerHandler = () => {
  const answerOptions = Array.from(document.getElementsByName("Answer"));
  const currentQuestion = questions[currentQuestionIndex];

  if (
    currentQuestion.inputType === "checkbox" ||
    currentQuestion.inputType === "radio"
  ) {
    const answerValue = {
      questionId: currentQuestion.questionId,
      answers: answerOptions
        .map((x) => {
          if (x.checked) {
            return x.value;
          }
        })
        .filter((item) => item),
    };

    totoalStudentAnswer = [...totoalStudentAnswer, answerValue];
  }

  if (currentQuestion.inputType === "text") {
    const answerValue = {
      questionId: currentQuestion.questionId,
      answers: answerOptions[0].value,
    };
    totoalStudentAnswer = [...totoalStudentAnswer, answerValue];
  }
};

renderHtmlContentByQuestionType(questions[currentQuestionIndex]);

function renderHtmlContentByQuestionType(question) {
  const questionText = document.getElementById("question");

  const questionContent = document.getElementById("question-content");
  let result;
  switch (question.type) {
    case "select":
    case "multiSelect": {
      const optionsList = Object.values(question.options);
      result = optionsList
        .map((optionTitle, index) => {
          questionText.innerHTML = question.question;

          return `<div class="answerOption qCard">
                    <input type='${
                      question.inputType
                    }' name="Answer" id="option-${
            index + 1
          }" value='${optionTitle}' />
                    <label id="option-label-${index + 1}">${optionTitle}</label>
                </div>`;
        })
        .join("");

      break;
    }

    case "text": {
      result = `
                <textarea  placeholder="Type your answer..." class="txtArea" name="Answer" id="txtArea" cols="30" rows="10"></textarea>
            `;
      break;
    }
  }
  questionContent.innerHTML = result;
}
const unCheckInputs = () => {
  let answerOptions = document.getElementsByName("Answer");
  answerOptions.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });
};

const examResult = () => {
  let gradeResult = 0;
  let rightAnswersTotalCount = 0;
  totoalStudentAnswer.map((x, idx) => {
    const studentAnswe = x.answers;
    let correctAnswerIds = questions[idx].rightAnswers;
    rightAnswersTotalCount += correctAnswerIds.length;
    let studentAnswer = Array.from(x.answers);

    switch (questions[idx].inputType) {
      case "radio":
      case "checkbox":
        let optionsListObj = questions[idx].options;
        let optionsListArr = [];
        for (let op in optionsListObj) {
          optionsListArr.push(op);
        }

        correctAnswerIds.forEach((val, idx) => {
          if (studentAnswer.includes(optionsListObj[val])) {
            console.log("Somthis");
            gradeResult++;
          } else {
            console.log("Not");
          }
          x.answers;
        });
      case "text":
        if (correctAnswerIds.toString() == x.answers) {
          gradeResult++;
        }
        break;

      default:
        break;
    }
  });
  console.log("Default :??? ", rightAnswersTotalCount);
  console.log("gradeResult", gradeResult);
  testScore(rightAnswersTotalCount, gradeResult);
  // x.some(item => y.includes(item))
};
const testScore = (totalGrade, studentGrade) => {
  const percentageRusult = Math.round((studentGrade / totalGrade) * 100);
  popUpScore(percentageRusult);
  alert(`You Got a: ${percentageRusult} Out of 100`);
};

const mainTag = document.getElementById("main");
// console.log(maintag);
function popUpScore(percentageRusult) {
  console.log("inside popUpScore function ", percentageRusult);

  const fullMarkImoji = `  <div class="gradeContainer">
  <h1 class="grade">you got ${percentageRusult}%</h1>
  <a title="Go to Home Page" href="/index.html">
  <div class="emoje smile"></div>
  <div class="eye"></div>
  <div class="eye eye1"></div>
  </a>
</div>`;
  const goodMarkImoji = `  <div class="gradeContainer">
<h1 class="grade">you got ${percentageRusult}%</h1>
<a  title="Go to Home Page" href="/index.html">
<img class="imojiImg" src="/images/smiling-face.png" alt="smiling-face.png">

</a>
</div>`;

  const lowMarkImoji = `  <div class="gradeContainer">
<h1 class="grade">you got ${percentageRusult}%</h1>
<a   title="Go to Home Page" href="/index.html">
<img class="imojiImg" src="/images/sadImoji.png" alt="sadImoji.png">



</a>
</div>`;
  if (percentageRusult == 100) {
    mainTag.innerHTML = fullMarkImoji;
  } else if (percentageRusult <= 100 && percentageRusult >= 50) {
    mainTag.innerHTML = goodMarkImoji;
  } else {
    mainTag.innerHTML = lowMarkImoji;
  }
}

/////COUNTDOWNTIMER

const timetxt = document.getElementById("time");
let seconds = 600;
const countDown = setInterval(function () {
  decreaser();
}, 1000);

const decreaser = () => {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  if (seconds < 10 && minutes < 10) {
    timetxt.innerHTML = `   0${minutes} : 0${remainSeconds}`;
  } else if (minutes < 10) {
    timetxt.innerHTML = `  0${minutes} : ${remainSeconds}`;
  } else {
    timetxt.innerHTML = `   ${minutes} : 0${remainSeconds}`;
  }
  if (seconds > 0) {
    seconds -= 1;
  } else if (minutes > 0 && seconds == 0) {
    minutes -= 1;
  } else if (minutes == 0 && seconds == 0) {
    clearInterval(countDown);
  }
};
