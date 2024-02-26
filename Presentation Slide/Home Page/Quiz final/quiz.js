// the timer is started
let before = new Date();

// the questions are created here and the correct answer is assigned
let questions = [
    {
        id: 1,
        question: "Which One Of These Exercises Is Effective For Weight Loss?",
        answer:"Cardio",
        options: [
            "Cardio",
            "Yoga",
            "Strength exercises",
            "Balance exercises"
        ]   
    },
    {
        id: 2,
        question: "What Does HIIT Stand For?",
        answer: "High-intensity interval training",
        options: [
          "Heat",
          "High-interval intensity training",
          "High-interval intensity therapy",
          "High-intensity interval training"
        ]
      },
      {
        id: 3,
        question: "How Do You Call The Layer Of Fat Around Your Waistline?",
        answer: "Love handles",
        options: [
          "Muffin top",
          "Beer belly",
          "Love handles",
          "Tummy"
        ]
      },
      {
        id: 4,
        question: "Which equipment is used for basic squat?",
        answer: "Ankle weights",
        options: [
          "Dumb bells",
          "Bar",
          "Ankle Weights",
          "Foam roller"
        ]
      },
      {
        id: 5,
        question: "What does aerobic exercise increase",
        answer: "Heart rate",
        options: [
          "Heart rate",
          "Strength",
          "Agility",
          "Blood pressure"
        ]
      },
      {
        id: 6,
        question: "What are the chest muscles called?",
        answer: "Pectorals",
        options: [
          "Abdominals",
          "Pectorals",
          "Deltoids",
          "Biceps"
        ]
      },
      {
        id: 7,
        question: "Equipment that uses body weight to loosen muscles and increase blood flow.",
        answer: "Foam roller",
        options: [
          "Foam roller",
          "Cylcing machine",
          "Treadmill",
          "Crunches Bench"
        ]
      },
      {
        id: 8,
        question: "Which country originated the term dumbbell?",
        answer: "England",
        options: [
          "England",
          "United States of America",
          "Germany",
          "Japan"
        ]
      },
      {
        id: 9,
        question: "Ability to change direction and control movement is:",
        answer: "Agility",
        options: [
          "Balance",
          "Agility",
          "Flexibility",
          "Power"
        ]
      },
      {
        id: 10,
        question: "Chemical secreted during exercise:",
        answer: "Endorphins",
        options: [
          "Cortisol",
          "Endorphins",
          "Adrenalin",
          "Thyroxine"
          
        ]
      },
];

// the question count and the points are initially set to zero
let question_count = 0;
let points = 0;


window.onload = function(){
    show(question_count);
};

// this function is used to display the questions in order
function show(count){
    let question = document.getElementById("questions");
    let[first, second, third, fourth] = questions[count].options;

    question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
    toggleActive();  
}


function toggleActive(){
    let option = document.querySelectorAll("li.option");
    for(let i=0; i < option.length; i++){
        // onclick is added for a the options
        option[i].onclick = function(){
            for(let i=0; i < option.length; i++){
                if(option[i].classList.contains("active")){
                    option[i].classList.remove("active");
                }
            }
            option[i].classList.add("active");
        }
    }
}

function sleep(ms) {
  // the promise method is used to resolve a particular value to the promise
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function next(){
  let user_answer = document.querySelector("li.option.active").innerHTML;
  if(user_answer == questions[question_count].answer){
      // the user points is increased by 10
      points += 10;
      // the points are set to the points earned by the user using the setItem syntax on sessionStorage
      sessionStorage.setItem("points",points);
  }
  console.log(points);

  if(question_count == questions.length -1) { 
    // the timer is stopped
    let after = new Date();
    // the difference in time is calculated
    let displaySeconds = after - before;
    // sessionStorage is used to store and display the time in seconds
    sessionStorage.setItem("time", Math.floor(displaySeconds/1000));

    // the final score is obtained by getting what was stored using sessionStorage
    let score = sessionStorage.getItem("points");

    // the badges are assigned using an if condition
    if (score <= 50) { // 0 to 50
      sessionStorage.setItem("badge", "Bronze");
    }

    else if (score <= 80) { // 50 to 80
      sessionStorage.setItem("badge", "Silver");
    }
    else { // 80 to 100
      sessionStorage.setItem("badge", "Gold");
    }
      // the final.html is linked once all the questions have been answered
      location.href = "final.html";
   }
    console.log(question_count);

  // the question count is increased by one
  question_count++;
  show(question_count);
}