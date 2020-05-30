(function(){
    function buildQuiz(){
      const output = [];
  
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          
          const answers = [];
  
          
          for(letter in currentQuestion.answers){
  
           
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    var timeLeft = 30;
    var elem = document.getElementById('some_div');
    
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        showResults();
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "In a study, which cells are found in COVID-19 patients 'bode well' for long term immunity??",
        answers: {
          a: "P-Cell",
          b: "D-Cell",
          c: "T-Cell"
        },
        correctAnswer: "c"
      },
      {
        question: "World Health Organisation on 11 February, 2020 announced an official name for the disease that is causing the 2019 novel coronavirus outbreak? What is the new name of the disease??",
        answers: {
          a: "COVD-19s",
          b: "COVID-16",
          c: "COVID-19"
        },
        correctAnswer: "c"
      },
     
       {
        question: "The first case of novel coronavirus was identified in .....",
        answers: {
          a: "Beijing",
          b: "Shanghai",
          c: "TianjinS",
          d: "Wuhan, Hubei "
        },
        correctAnswer: "d"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  