/* 
Player class is used to generate the player and the types of questions
they will encounter. The age is used as the input and then an array 
is created for add, sub, mult, and division. If/else statements are 
used to see which types of questions and what range of numbers
the player will be answering questions for. The arrays are then 
populated with loops.
*/
class Player {
  constructor (name, age, picture) {
    this.name = name;
    this.age = age;
    this.addition = [];
    this.subtraction = [];
    this.multiply = [];
    this.division = [];
    this.picture = picture;
    this.score = new Score();
    
    this.topAdd = 0;
    this.topSub = 0;
    this.topMult = 0;
    this.topDiv = 0;
    
    //If statement compares age and sets the range of integers they
    //will see in their questions.
    if (age <= 5) {
      this.topAdd = 5;
      this.topSub = 5;
    } else if (age === 6) {
      this.topAdd = 10;
      this.topSub = 10;
    } else if (age === 7) {
      this.topAdd = 20;
      this.topSub = 20;
    } else if (age === 8) {
      this.topAdd = 50;
      this.topSub = 50;
      this.topMult = 10;
      this.topDiv = 10;
    } else if (age === 9) {
      this.topAdd = 100;
      this.topSub = 100;
      this.topMult = 10;
      this.topDiv = 10;
    } else {
      this.topAdd = 120;
      this.topSub = 120;
      this.topMult = 15;
      this.topDiv = 20;
    }
    
    //for loops populates the player's arrays with numbers.
    for (var x = 1; x <= this.topAdd; x++) {
      this.addition.push(x);
    }
    
    for (var x = 1; x <= this.topSub; x++) {
      this.subtraction.push(x);
    }
    
    for (var x = 1; x <= this.topMult; x++) {
      this.multiply.push(x);
    }
    
    for (var x = 1; x <= this.topDiv; x++) {
      this.division.push(x);
    }
  }
}

/*
The Question class is used to populate the 10 questions that are used
in the rounds. based on the type of question (add, sub...) two random 
numbers are returned with their answer.
*/
class Question {
  constructor (player, type) {
    this.num1 = 0;
    this.num2 = 0;
    this.answer = 0;
    
    if (type === 'addition') {
      var tempObj = addSplit(player.addition);
      this.type = 'addition';
      this.num1 = tempObj.first;
      this.num2 = tempObj.second;
      this.answer = tempObj.answer;
      this.sign = tempObj.sign;
      this.correct = tempObj.correct;
    }
    
    if (type === 'subtraction') {
      var tempObj = subSplit(player.subtraction);
      this.type = 'subtraction';
      this.num1 = tempObj.first;
      this.num2 = tempObj.second;
      this.answer = tempObj.answer;
      this.sign = tempObj.sign;
      this.correct = tempObj.correct;
    }
    
    if (type === 'multiply') {
      if (player.age >= 8) {
        var tempObj = multSplit(player.multiply);
        this.type = 'multiply';
        this.num1 = tempObj.first;
        this.num2 = tempObj.second;
        this.answer = tempObj.answer;
        this.sign = tempObj.sign;
        this.correct = tempObj.correct;
      }
    }
    
    if (type === 'division') {
      if (player.age >= 8) {
        var tempObj = divSplit(player.division);
        this.type = 'division';
        this.num1 = tempObj.first;
        this.num2 = tempObj.second;
        this.answer = tempObj.answer;
        this.sign = tempObj.sign;
        this.correct = tempObj.correct;
      }
    }
  }
}


//Each function, addsplit, subsplit, multsplit, divsplit, takes in an 
// array from the player based on their age. It chooses two random 
//numbers, computes them and then returns and object with the first 
//number, the second number and the answer to the question.
function addSplit (arr) {
  var nums = {};
  nums.answer = [];
  nums.sign = '+';
  nums.first = arr[Math.floor(Math.random() * (arr.length))];
  nums.second = nums.first;
  nums.second = arr[Math.floor(Math.random() * (arr.length))];
  nums.answer = randomFour(nums.first+nums.second, arr);
  nums.correct = nums.first + nums.second;
  return nums;
}

function subSplit (arr) {
  var nums = {}; 
  nums.answer = [];
  nums.sign = '-';
  nums.first = arr[Math.floor(Math.random() * (arr.length))];
  nums.second = nums.first;
  nums.second = arr[Math.floor(Math.random() * (arr.length))];
  if (nums.first < nums.second) {
    var tempVal = nums.first;
    nums.first = nums.second;
    nums.second = tempVal;
  }
  nums.answer = randomFour(nums.first - nums.second, arr);
  nums.correct = nums.first - nums.second;
  return nums;
}

function multSplit (arr) {
  var nums = {};
  nums.answer = [];
  nums.sign = 'X';
  nums.first = arr[Math.floor(Math.random() * (arr.length))];
  nums.second = nums.first;
  nums.second = arr[Math.floor(Math.random() * (arr.length))];
  nums.answer = randomFour(nums.first * nums.second, arr);
  nums.correct = nums.first * nums.second;
  return nums;
}

function divSplit (arr) {
  var nums = {}; 
  var tempAnswer = [];
  
  while (Math.floor(nums.answer) !== nums.answer) {
    nums.first = arr[Math.floor(Math.random() * (arr.length))];
    nums.second = nums.first;
    nums.second = arr[Math.floor(Math.random() * (arr.length))];
    if (nums.first < nums.second) {
      var tempVal = nums.first;
      nums.first = nums.second;
      nums.second = tempVal;
    }
    nums.answer = nums.first / nums.second, arr;
  }
  tempAnswer = randomFour(nums.answer, arr);
  
  nums.correct = nums.first / nums.second;
  return {first: nums.first, second: nums.second, answer: tempAnswer, sign: '&#247;', correct: nums.correct};
}

/*Creates a random array of 4 numbers, one correct answer and three incorrect
*/
function randomFour (ans, arr) {
  var tempArray = [];
  var logArray = [];
  tempArray[0] = ans;
  for (var x = ans - 5; x < ans + 5; x++) {
    if (x > 0) {
      logArray.push(x);
    }
  }
  
  while (tempArray.length < 4) {
    var tempRandom = Math.floor(Math.random() * (arr.length));
    if (tempArray.indexOf(logArray[tempRandom]) === -1 && logArray[tempRandom] !== undefined) {
      tempArray.push(logArray[tempRandom]);
    }
  }
  
  
  for (var x = 0; x < 4; x++) {
    var tempRandom = Math.floor(Math.random() * (4));
    var tempVar = tempArray[x];
    tempArray[x] = tempArray[tempRandom];
    tempArray[tempRandom] = tempVar;
  }
  return tempArray;
}

//generateQuestions recieves player as an input. It checks if the to determine if the player will receive addition and subtraction or all four question types. 10 Question objects are created and returned in an array. 
function generateQuestions (player) {
  var tempArr = [];
  var checkerIndex = [];
  var maxNum;
  if (player.age <= 7) {
    maxNum = 2;
  } else {
    maxNum = 4;  
  }
  
  for (var x = 0; x < 11; x++) {
    var tempQuestion = 'to be deleted';
    while (tempArr.indexOf(tempQuestion) >= 0 || checkerIndex.indexOf(tempQuestion.num1+tempQuestion.sign+tempQuestion.num2) >= 0) {
      
      var randomNum = Math.floor(Math.random() * maxNum);
    
      if (randomNum === 0) {
        tempQuestion = new Question(player, 'addition');
      } else if (randomNum === 1) {
        tempQuestion = new Question(player, 'subtraction');      
      } else if (randomNum === 2) {
        tempQuestion = new Question(player, 'multiply');      
      } else if (randomNum === 3) {
        tempQuestion = new Question(player, 'division');      
      }
      
    }
    checkerIndex.push(tempQuestion.num1+tempQuestion.sign+tempQuestion.num2);
    tempArr.push(tempQuestion);

  }
  
  return tempArr.splice(1, 10);
}

/*Robot class is used to generate the robot and then the Robot
has a skill level. the random answer method is used to tell
if the robot gets the question right or wrong.
*/
class Robot {
  constructor (name, level, picture) {
    this.name = name;
    this.level = level;
    this.picture = picture;
    this.score = new Score();
  }
  
  randomAnswer () {
    var randomNum = Math.floor((Math.random() * 10) + 1);
    if (randomNum >= this.level) {
      this.score.minusScore();
    } else {
      this.score.plusScore();
    }
  }
}

//Populates the question and answers when called using jQuery.
function questionPopulate (question) {
  $('.main-question').replaceWith("<p class='main-question'>" + question.num1 + ' ' + question.sign + ' ' + question.num2 + "</p>");
  $('.answer1').replaceWith("<p class='answer-p answer1'>" + question.answer[0] + "</p>");
  $('.answer2').replaceWith("<p class='answer-p answer2'>" + question.answer[1] + "</p>");
  $('.answer3').replaceWith("<p class='answer-p answer3'>" + question.answer[2] + "</p>");
  $('.answer4').replaceWith("<p class='answer-p answer4'>" + question.answer[3] + "</p>");
  $('.answer1-block').css({'color': 'black'});
  $('.answer1-block').css({'border-color': 'black'});
  $('.answer2-block').css({'color': 'black'});
  $('.answer2-block').css({'border-color': 'black'});
  $('.answer3-block').css({'color': 'black'});
  $('.answer3-block').css({'border-color': 'black'});
  $('.answer4-block').css({'color': 'black'});
  $('.answer4-block').css({'border-color': 'black'});
}

//Score class is used to count the player and computers score. 
//Every time a player gets a question right or wrong, the plus Score
//method and the minusScore method are used. This will change the next
//element in the array to true or false. True for correct answers and 
// false for incorrect answers.
class Score {
  constructor() {
    this.scoreArr = [];
    this.counter = 0;
    this.score = 0;

    for (var x = 0; x < 10; x++) {
      this.scoreArr.push(null);
    }
  }
  
  plusScore() {
    if (this.counter < 10) {
      this.scoreArr[this.counter] = true;
      this.counter++;
      this.score++;
    }
  }
  
  minusScore() {
    if (this.counter < 10) {
      this.scoreArr[this.counter] = false;
      this.counter++;
    }
  }

}

//Using jQuery, hitPopulate appends the player's hit points to the screen. It checks the player score array to see if the hit point should be grey, green or red.
function hitPopulate (player) {
  var tempArr = player.score.scoreArr;
  $('.hits').empty();
  for (var x = 0; x < tempArr.length; x++) {
    if (tempArr[x] === null){
      $('.hits').append('<i class="fa fa-circle hits-no" aria-hidden="true"></i>');
    } else if (tempArr[x] === true) {
      $('.hits').append('<i class="fa fa-circle hits-right" aria-hidden="true"></i>');
    } else if (tempArr[x] === false) {
      $('.hits').append('<i class="fa fa-circle hits-wrong" aria-hidden="true"></i>');      
    }
  }
}

//computerHitPopulate checks the computer score array and then prepends the computers score to the screen. It prepends so the hitpoints begin from the right side of the screen and populate to the left.
function computerHitPopulate (computer) {
  var tempArr = computer.score.scoreArr;
  $('.comp-hits').empty();
  for (var x = 0; x < tempArr.length; x++) {
    if (tempArr[x] === null){
      $('.comp-hits').prepend('<i class="fa fa-circle hits-no" aria-hidden="true"></i>');
    } else if (tempArr[x] === true) {
      $('.comp-hits').prepend('<i class="fa fa-circle hits-right" aria-hidden="true"></i>');
    } else if (tempArr[x] === false) {
      $('.comp-hits').prepend('<i class="fa fa-circle hits-wrong" aria-hidden="true"></i>');      
    }
  }
}

//Appends the text score for the computer and the player to the screen. ex. "Score: 8/10"
function scoreUpdate(player, computer) {
  $('.player-p').replaceWith("<p class='player-p'>Score: " + player.score.score +  "</p>");
  $('.computer-p').replaceWith("<p class='computer-p'>Score: " + computer.score.score +  "</p>");
}

//After an answer block is clicked, beginRound is the first function to run. It then runs 5 more functions. Answer alert changes the players choice to red or green if they got the question wrong or right. computer.randomAnswer chooses if the computer got the question wrong or right. hitPopulate appends the users hit points to the screen. computerHitPopulate prepends the computer's hit points to the screen. scoreUpdate updates the text scores on the screen.
function beginRound (questions, player, counter, blockNum, thisBlock, computer) {
  answerAlert(questions, player, counter, blockNum, thisBlock);
  computer.randomAnswer();
  hitPopulate(player);
  computerHitPopulate(computer);
  scoreUpdate(player, computer);
}

//endRound function waits a half second to give the player enough time to see if they got the question wrong or right. It then checks to see if it is the final round, if so, it will display who won. If it is not the final round, it will populate a new question with the questionPopulate function. 
function endRound (questions, counter, player, computer, volume) {
  setTimeout(function() {
    if (counter === 10) {
    $('.volume').fadeOut(0);
    $('.answers').fadeOut(0);
    $('.question').fadeOut(0);
      if (player.score.score > computer.score.score) {
        $('.main-question').replaceWith("<p class='win'>You Win</p>");
        $('.question').fadeIn(3000);
        populateButtons(false, player.name, player.age, volume);
        $('.buttons').fadeOut(0);
        setTimeout(function() {
          $('.buttons').fadeIn(3000);
        }, 2000);     
      } else if (player.score.score < computer.score.score) {
        $('.main-question').replaceWith("<p class='win'>Better Luck Next Time</p>");
        $('.question').fadeIn(3000);
        populateButtons(false, player.name, player.age, volume);
        $('.buttons').fadeOut(0);      
        setTimeout(function() {
          $('.buttons').fadeIn(3000);
        }, 2000);   
      } else {
        $('.main-question').replaceWith("<p class='win'>You Tied</p>");
        $('.question').fadeIn(3000);
        populateButtons(false, player.name, player.age, volume);
        $('.buttons').fadeOut(0);      
        setTimeout(function() {
          $('.buttons').fadeIn(3000);
        }, 2000);   
      }
    } else {
      questionPopulate(questions[counter]);
    }
  }, 500);
}

//answerAlert takes the answer the player chooses and changes the box and number to green or red depending on if the player got the question right or wrong. Counter is used to see which question we are on in the questions array and blockNum keeps track of which answer the user selected. The 'if' statement compares the questions[x].answer[blockNum] which is one of the 4 answers in that array to the correct answer associated with that question. 
function answerAlert(questions, player, counter, blockNum, thisBlock) {
  if (questions[counter].answer[blockNum] === questions[counter].correct) {
    player.score.plusScore();
    $(thisBlock).css({'color': 'green'});
    $(thisBlock).css({'border-color': 'green'});
  } else if (questions[counter].answer[blockNum] !== questions[counter].correct) {
    player.score.minusScore();
    $(thisBlock).css({'color': 'red'});
    $(thisBlock).css({'border-color': 'red'});
  }
}

//Toggles the volume on and off when called.
function volumeToggle (volume) {
  if (volume === true) {
    $('.volume').html("<i class='fa fa-volume-up' aria-hidden='true'></i>");
    return false;
  } else {
    $('.volume').html("<i class='fa fa-volume-off' aria-hidden='true'></i>"); 
    return true;
  }
}

function populateButtons(newRound, name, age, volume) {
  var playAgain;

  if (newRound === true) {
    playAgain = 'Play';
  } else {
    playAgain = 'Play Again';
  }

  $('body').append("<div class='buttons'><button class='play-button'>" + playAgain + "</button><button class='quit-button'>Quit</button></div>");
  
  $('.play-button').click(function(){
    removeButtons();
    roundStarter(name, age, volume);
  });
  
  $('.quit-button').click(function(){console.log('TERMINATE GAME FUNCTION GOES HERE');});
}

function removeButtons () {
  $('.buttons').remove();
}

function roundStarter(name, age, volume) {
  //Sets the computer name and the player name at the beginning of the round
  var computer = new Robot('Mr. Robot', 7, null);
  var player = new Player(name, age, null);
  
  //Creates variables for questions, counter, blockNum, and thisBlock. The generateQuestions function is called and the returned array is stored in the questions variable.
  var questions = generateQuestions(player);
  var counter = 0;
  var blockNum, thisBlock;
  console.log(volume);

  var tempVolume;
  if (volume === true) {
    tempVolume = "<i class='fa fa-volume-off' aria-hidden='true'></i>";
  } else {
    tempVolume = "<i class='fa fa-volume-up' aria-hidden='true'></i>";
  }

  //Appends HTML to the DOM in order to utilize the fadeIn effect
  $('.app').remove();
  $('body').append("<div class='app'><div class='top-bar'><div class='player'><img class='player-img' src='http://via.placeholder.com/100x100' /><div class='player-full'><h2 class='player-h2'></h2><p class='player-p'>Score: 0</p><p class='hits'></p></div></div><div class='computer'><img class='computer-img' src='http://via.placeholder.com/100x100' /><h2 class='computer-h2'></h2><p class='computer-p'>Score: 0</p><p class='comp-hits'></p></div></div><div class='question'><p class='main-question'></p></div><div class='answers'><div class='answer-block answer1-block'><p class='answer-p answer1'></p></div><div class='answer-block answer2-block'><p class='answer-p answer2'></p></div><div class='answer-block answer3-block'><p class='answer-p answer3'></p></div><div class='answer-block answer4-block'><p class='answer-p answer4'></p></div></div><div class='volume'>" + tempVolume + "</div></div>");
  
  //Replaces the player and computer name with the correct names on the page.
  $('.player-h2').replaceWith('<h2 class="player-h2">' + player.name + '</h2>');
  $('.computer-h2').replaceWith('<h2 class="computer-h2">' + computer.name + '</h2>');  
  $('body').fadeOut(0);
  $('body').fadeIn(2000);
  
  //questionPopulate, hitPopulate, computerHitPopulate are used throughout each round but they are called initially below to populate each to the screen.
  questionPopulate(questions[counter]);
  hitPopulate(player);
  computerHitPopulate(computer);

    //The below click actions are where the game is played. Each one represents one of the answer choices (1-4). After an answer is seleceted the beginRound funciton is called to calculate the answer, notify the player if it is right or wrong and the score is calculated. The counter is then incremented to track what round we are on. endRound is then called, it waits half a second so the user can see if their answer was correct and then it populates a new question or if it's passed the 10th round, the end screen shows. 
    $('.answer1-block').click(function() {
      blockNum = 0;
      thisBlock = this;
      beginRound(questions, player, counter, blockNum, thisBlock, computer);
      counter++;      
      endRound(questions, counter, player, computer, volume);
    });
    
    $('.answer2-block').click(function() {
      blockNum = 1;
      thisBlock = this;
      beginRound(questions, player, counter, blockNum, thisBlock, computer);
      counter++;   
      endRound(questions, counter, player, computer, volume);

    });
    
    $('.answer3-block').click(function() {
      blockNum = 2;
      thisBlock = this;
      beginRound(questions, player, counter, blockNum, thisBlock, computer);
      counter++;   
      endRound(questions, counter, player, computer, volume);

    });
    
    $('.answer4-block').click(function() {
      blockNum = 3;
      thisBlock = this;
      beginRound(questions, player, counter, blockNum, thisBlock, computer);
      counter++;   
      endRound(questions, counter, player, computer, volume);
    });
    
    //Toggles volume on with the volumeToggle function.
    $('.volume').click(function(){
        console.log(volume);
        volume = volumeToggle(volume);
        console.log(volume);
    });
}

function playerInfoEntry () {
  $('body').append('<div class="info-screen"><div class="name"><p class="info-p">Enter Your First Name</p><input type="text" id="input-name" maxlength="16"></input></div><div class="age"><p class="info-p">Enter Your Age</p><input type="text" id="input-age"></input></div><button class="play-button initial-click">Continue</button><div class="volume"><i class="fa fa-volume-up" aria-hidden="true"></i></div></div>');
  
  $(".info-screen").fadeOut(0);
  $(".info-screen").fadeIn(1000);

  var volume = false;
  console.log(volume);
  $('.volume').click(function(){
      volume = volumeToggle(volume);
      console.log(volume);
  });
  
  var clickEvent = $('.initial-click').click(function(){
    var name = $('#input-name').val();
    var age = $('#input-age').val();
    
    if (name.length === 0) {
      $('.error-name').remove();
      $('.name').append('<p class="error-name">Please Enter Your Name</p>');
    } else {
      $('.error-name').remove();      
    }

    if (age % 1 !== 0 || age.length === 0 || age > 100) {
      $('.error-age').remove();
      $('.age').append('<p class="error-age">Please Enter Your Age</p>');      
    } else {
      $('.error-age').remove();      
    }
    
    if (name.length !== 0 && age % 1 === 0 && age <= 100) {
      $(".info-screen").fadeOut(1000);
      setTimeout(function(){$(".info-screen").remove();}, 1000);
      setTimeout(function(){populateButtons(true, name, Number.parseInt(age), volume);}, 1000);
    }

  });
}

//After all of the above classes and functions are loaded, the game begins below on 'document'.ready.
$('document').ready(function() {
  playerInfoEntry();
});
