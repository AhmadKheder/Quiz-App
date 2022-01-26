const questions = [
  {
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
    question: "3First question First question First question?",

    options: {
      option1:
        " 333 option1 sit amet consectetur adipisicing elit.  Cumoluptate! Delectus placeat i",
      option2: "333 option1 sit amet consectetur",
      option3: "333 option1 consectetur adipisicing elit.",
      option4: "333 option1 Cumoluptate! Delectus placeat",
    },
    type: "multiSelect",
    inputType: "checkbox",

    rightAnswers: ["option1", "option2"],
  },
  {
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
    examResult();
    return;
  }

  currentQuestionIndex++;
  renderHtmlContentByQuestionType(questions[currentQuestionIndex]);
};

const answerHandler = () => {
  let singleAnswer = {};
  let answerOptions = document.getElementsByName("Answer");
  answerOptions.forEach((op, idx) => {
    if (op.checked) {
      singleAnswer[op.id] = op.value;
    } else if (op.type == "textarea") {
      singleAnswer = { [op.id]: op.value };
    }
  });
  totoalStudentAnswer[currentQuestionIndex] = singleAnswer;
  //   console.log(totoalStudentAnswer);
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
const allRightAnswers = [];
questions.forEach((ele) => {
  allRightAnswers.push(ele.rightAnswers);
});

const examResult = () => {
  console.log(totoalStudentAnswer, "151515151");
  console.log(allRightAnswers);
  totoalStudentAnswer.forEach((ele) => {
    console.log(ele);
    for (let element in ele) {
      let arbitaryvariable = allRightAnswers.every((ele) => {
        ele.forEach((answer, index) => {
          console.log(answer, "answer");
          console.log(ele[index], "ele[index]");

          return (
            toString(ele[index]).toUpperCase() == toString(answer).toUpperCase()
          );
        });
      });
      console.log(element);
      console.log(arbitaryvariable);
    }
  });

  //   totoalStudentAnswer.e;

  // let examGrade

  // x.some(item => y.includes(item))
};
function checkingAnswer(answer) {
  allRightAnswers;
}

// const renderQuestion = (currentQuestion) => {
//     // estimatedTime();
//     htmlTemplate(currentQuestion);

//     switch (currentQuestion.type) {
//         case "select":
//             {
//                 allOptions.forEach((inputTag) => {
//                     inputTag.type = "radio";
//                 });
//                 break;
//             }
//         case "multiSelect":
//             {
//                 allOptions.forEach((inputTag) => (inputTag.type = "checkbox"));
//                 break;
//             }

//         case "text":
//             {
//                 txtArea.style.display = "flex";
//                 inputDivs.style.display = "none";
//                 break;
//             }
//     }
// };

// // change question content
// const htmlTemplate = (questionIdx) => {
//     question.innerText = questionIdx.question;
//     if (questionIdx.options) {
//         option1.innerText = questionIdx.options.option1;
//         option2.innerText = questionIdx.options.option2;
//         option3.innerText = questionIdx.options.option3;
//         option4.innerText = questionIdx.options.option4;

//         //
//         inputOption1.value = questionIdx.options.option1;
//         inputOption2.value = questionIdx.options.option2;
//         inputOption3.value = questionIdx.options.option3;
//         inputOption4.value = questionIdx.options.option4;
//     } else {
//         displayContentSwitcher();
//     }
// };

//   console.log(answerOptions);
//   for (let opp of answerOptions) {
//     if (opp.checked) {
//       console.log(opp);

//       let wow = opp.id;
//       singleAnswer = { wow: opp.value };
//       //   singleAnswer.value = opp.value;
//     } else if (opp.type == "text") {
//       console.log(opp);

//       let wow = opp.id;
//       singleAnswer = { wow: opp.value };
//       //   singleAnswer = { opp };
//     }
//   }
