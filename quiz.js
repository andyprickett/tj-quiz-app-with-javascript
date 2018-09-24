let score = 0;
let currentQuestion = 0;
let questions = [
  {
    title: "What color is Squirtle?",
    answers: ["yellow", "blue", "orange", "green"],
    correct: 1
  },
  {
    title: "What color is Bulbasaur?",
    answers: ["yellow", "blue", "orange", "green"],
    correct: 3
  },
  {
    title: "What color is Pikachu?",
    answers: ["yellow", "blue", "orange", "green"],
    correct: 0
  },
  {
    title: "What color is Charmander?",
    answers: ["yellow", "blue", "orange", "green"],
    correct: 2
  }
];

$(document).ready(function() {
  
  $(".start a").click(function(e) {
    e.preventDefault();
    $(".start").hide();
    $(".quiz").show();
    showQuestion();
  });

  $(".quiz ul").on("click", "li", function() {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".quiz a").click(function(e) {
    e.preventDefault();
    if ($("li.selected").length) {
      let guess = parseInt($("li.selected").attr("id"));
      checkAnswer(guess);
    } else {
      alert("Please select an answer");
    }
  });

  $(".summary a").click(function(e) {
    e.preventDefault();
    restartQuiz();
  });
  
});

function showQuestion() {
  let question = questions[currentQuestion];
  $(".quiz h2").text(question.title);
  $(".quiz ul").html("");
  for (var i = 0; i < question.answers.length; i++) {
    $(".quiz ul").append(`<li id="${i}" class="answer ${question.answers[i]}">${question.answers[i]}</li>`);
  }
}

function checkAnswer(guess) {
  let question = questions[currentQuestion];
  if (question.correct === guess) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showSummary();
  } else {
    showQuestion();
  }
}

function showSummary() {
  $(".quiz").hide();
  $(".summary").show();
  $(".summary p").text(`You scored ${score} out of ${questions.length} correct.`);
  $("img.show").removeClass("show");
  if (score >= 3) {
    $(".happy-group").addClass("show");
  } else {
    $(".sad-pikachu").addClass("show");
  }
}

function restartQuiz() {
  $(".summary").hide();
  $(".quiz").show();
  score = 0;
  currentQuestion = 0;
  showQuestion();
}
