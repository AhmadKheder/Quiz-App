interface QuestionFormat{
    
    questionId: string,
    question: string,
    options: {
      option1: string,
      option2: string,
      option3: string,
      option4: string,
    },
    type: string,
    rightAnswers: string[],
    inputType: string,
  
}
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
]as QuestionFormat[];

type AnswerType  ={questionId:string, answers:string[]};
let totoalStudentAnswer : AnswerType[] = [] ;

function home() {
  window.location.href = "https://ahmadkheder.github.io/Quiz-App/";
}
const inputContainers = document.getElementsByClassName("answerOption ");

function colorUncheckRadios() :void{
  const answerOptions = Array.from(document.querySelectorAll("input")!);
  answerOptions.forEach((radio) => {
    if (!radio.checked) {
        let tempParent : HTMLElement = radio.parentElement!;
        tempParent.style.borderColor = "#c9c9c9";
    }
  });
}

function checkInput(div:string, input:number):void {
  const singleSelectedDiv  = document.getElementById(`${div}`)!;
  const singleSelectedInput  = document.getElementById(`${input}`) as HTMLInputElement;
  if (singleSelectedInput.checked) {
    singleSelectedDiv.style.borderColor = "#c9c9c9";
    singleSelectedInput.checked = false;
  } else {
    singleSelectedDiv.style.borderColor = "#634ba5";
    singleSelectedInput.checked = true;
    colorUncheckRadios();
  }
}
const questionsLength : number = Object.keys(questions).length;
const mainTag = document.getElementById("main")!;
const timetxt = document.getElementById("time")!;
let seconds = 600;
const progressBar = document.getElementById("acheived")!;
const nextBtn = document.querySelector("#next-btn") as HTMLButtonElement;

let currentQuestionIndex :number= 0;
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
    return;
  }

  currentQuestionIndex++;
  renderHtmlContentByQuestionType(questions[currentQuestionIndex] as QuestionFormat) ;
};

const answerHandler = () => {
  const answerOptions  = Array.from(document.getElementsByName("Answer") );
  const currentQuestion = questions[currentQuestionIndex];

  if (
    currentQuestion.inputType === "checkbox" ||
    currentQuestion.inputType === "radio"
  ) {
    let answerValue= {
      questionId: currentQuestion.questionId,
      answers : answerOptions
        .map((x) => {
        
          if ((x as HTMLInputElement).checked) {
            // x.style.borderColor.parent() = "#634ba5";
            return (x as HTMLInputElement).value;
          }
        })
        .filter((item) => item)
    };
    totoalStudentAnswer = [...totoalStudentAnswer, answerValue  as AnswerType];
  }

  if (currentQuestion.inputType === "text") {
    const answerValue = {
      questionId: currentQuestion.questionId,
      answers: (answerOptions[0] as HTMLInputElement).value,
    };
    totoalStudentAnswer  = [...totoalStudentAnswer, answerValue as any];
  }
};

function renderHtmlContentByQuestionType(question:any) {
    
  increaseProgressBypercentage(currentQuestionIndex);
  const questionText = document.getElementById("question")!;

  const questionContent:HTMLDivElement  = document.getElementById("question-content") as HTMLDivElement;
  let result :any;
  switch (question.type) {
    case "select":
    case "multiSelect": {
        let opObj:Object = question.options;
        const optionsList:string[] =[] ;
        for (let op in opObj){
            optionsList.push(question.options[op]);
        }
      result = optionsList
        .map((optionTitle, index) => {
          questionText.innerHTML = question.question;

          return `<div  onClick="checkInput('${index}div',${index})" id="${index}div" class="answerOption qCard">
                    <input type='${
                      question.inputType
                    }' name="Answer" id='${index}' value='${optionTitle}' />
                    <label for=${specifyLabelForString(
                      question.inputType,
                      index
                    )} id="option-label-${index + 1}">${optionTitle}</label>
                </div>`;
        })
        .join("");

      break;
    }

    case "text": {
      questionText.innerHTML = question.question;
      result  = `
                <textarea  placeholder="Type your answer..." class="txtArea" name="Answer" id="txtArea" cols="30" rows="10"></textarea>
            `;
      break;
    }
  }
  questionContent.innerHTML = result;
}

function specifyLabelForString(type:string, index:number) {
  switch (type) {
    case "radio":
      return "Answer";
      break;
    case "checkbox":
      return `Answer${index + 1}`;
      break;

    default:
      console.log("type", type);
      break;
  }
}
const unCheckInputs = () => {
  let answerOptions = document.getElementsByName("Answer");
  answerOptions.forEach((input) => {
    if ((input as HTMLInputElement).checked) {
        (input as HTMLInputElement).checked = false;
    }
  });
};
type optionsListObj ={
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};
const examResult = () => {
  let gradeResult = 0;
  let rightAnswersTotalCount : number = 0;
  console.log('totoalStudentAnswer',totoalStudentAnswer);
  totoalStudentAnswer.map((x:AnswerType, idx:number) => {
    let correctAnswerIds : String[] = (questions[idx].rightAnswers) ;
    rightAnswersTotalCount += correctAnswerIds.length;
    
    let studentAnswer: String[] = x.answers ;

    switch (questions[idx].inputType) {
      case "radio":
      case "checkbox":

        let optionsListObj :optionsListObj = (questions[idx].options);
        correctAnswerIds.forEach((val:String, idx) => {
          if (studentAnswer.includes(optionsListObj[val])) {
            gradeResult++;
          } else {
            console.log("Not");
          }
          x.answers;
        });
      case "text":
        if (correctAnswerIds == x.answers) {
          gradeResult++;
        }
        break;

      default:
        break;
    }
  });

  testScore(rightAnswersTotalCount, gradeResult);
};
const testScore = (totalGrade:number, studentGrade:number) => {
  const percentageRusult:number = Math.round((studentGrade / totalGrade) * 100);
  popUpScore(percentageRusult);
};

function popUpScore(percentageRusult:number) {
  const fullMarkImoji = `  <div class="gradeContainer">
  <h1 class="grade">you got ${percentageRusult}%</h1>
  <a title="Go to Home Page" href="../index.html">
  <div class="emoje smile"></div>
  <div class="eye"></div>
  <div class="eye eye1"></div>
  </a>
</div>`;
  const goodMarkImoji = `  <div class="gradeContainer">
<h1 class="grade">you got ${percentageRusult}%</h1>
<a  title="Go to Home Page" href="./index.html">
<img class="imojiImg" src="../images/smiling-face.png" alt="smiling-face.png">

</a>
</div>`;

  const lowMarkImoji = `  <div class="gradeContainer">
<h1 class="grade">you got ${percentageRusult}%</h1>
<a   title="Go to Home Page" href="./index.html">
<img class="imojiImg" src="../images/sadImoji.png" alt="sadImoji.png">



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

const countDown = setInterval(function () {
  decreaser();
}, 1000);

const decreaser = () => {
  let minutes:number = Math.floor(seconds / 60);
  const remainSeconds :number = seconds % 60;
  const timerIcon = `          <i class="fas fa-stopwatch timer-icon"></i>
`;
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

function increaseProgressBypercentage(questionIndex:number) {
  const numberOfQuestions = questionIndex + 1;
  const progressPercentage = (numberOfQuestions / questionsLength) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}
renderHtmlContentByQuestionType((questions[currentQuestionIndex])as QuestionFormat);
