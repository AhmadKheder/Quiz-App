const questions = [
  {
    questionId: "question1",
    question: "1First question First question First question?",
    options: {
      option1:
        " 111 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
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
  //   () => {},
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
    // console.log("the studnt answers is:", totoalStudentAnswer);
    examResult();
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

    // console.log({ answerValue });

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

          return `<div class="answerOption">
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

const highestGrade = 100;
const oneQuestionGrade = highestGrade / questions;
const oneOptionOfAnswersGrade = oneQuestionGrade / questions.options;

const examResult = () => {
  // console.log(totoalStudentAnswer, "151515151");

  let gradeResult = 0;
  let rightAnswersTotalCount = 0;
  totoalStudentAnswer.map((x, idx) => {
    // const correctAnswer = questions.find( (q) => q.questionId === x.questionId ).rightAnswers;
    const studentAnswe = x.answers;
    let correctAnswerIds = questions[idx].rightAnswers;
    rightAnswersTotalCount += correctAnswerIds.length;
    let studentAnswer = Array.from(x.answers);

    switch (questions[idx].inputType) {
      // case "radio":
      //   if (questions[idx].options[correctAnswerIds] == x.answers[0]) {
      //     console.log(`q${idx} is correct `);
      //     gradeResult++;
      //   } else {
      //     console.log(`q${idx} is not correct `);
      //   }
      //   break;
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

        // if (
        //   questions[idx].options[correctAnswerIds[0]] == x.answers[0] &&
        //   questions[idx].options[correctAnswerIds[1]] == x.answers[1] &&
        //   x.answers.length == 2
        // ) {
        //   console.log(`q${idx} is correct `);
        // } else {
        //   console.log(`q${idx} is not correct `);
        // }
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
  alert(`You Got a: ${percentageRusult} Out of 100`);
};
