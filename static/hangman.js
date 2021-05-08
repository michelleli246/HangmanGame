// loading in model
var model;

async function loadModel(){
    model = await tf.loadLayersModel("https://michelleli246.github.io/HangmanGame/static/model/model.json");
}

// text input and turns
var oReq = new XMLHttpRequest();
oReq.open("GET", "https://michelleli246.github.io/HangmanGame/hangman_inputs/text_inputs.txt");
oReq.send();

var selected_word = []; // word from text as a list
var word_output = []; // list of letters and underscore
var output_display; // string that gets displayed

var guessed_letters = [];

var score_keeper = 0;

function setWord() {
    loadModel();
    newGame();

    input_string = oReq.responseText;
    word_list = input_string.split('\n');

    selected_word = word_list[Math.floor(Math.random()*word_list.length)].split("");
    for(i = 0; i<selected_word.length; i++){
        word_output.push("_");
    }

    output_display = word_output.join(' ');
    document.getElementById("word_output").innerHTML = output_display;

}

function enterTurn(){
    guess = predictLetter();
    guessed_letters.push(guess);

    guessed_letters_str = guessed_letters.join(' ');
    document.getElementById("guessed_letters").innerHTML = guessed_letters_str;
    
    if(selected_word.includes(guess) && !word_output.includes(guess)){
        for(i=0; i<selected_word.length; i++){
            if(selected_word[i] == guess){
                word_output[i] = guess;
                console.log(word_output);
            }
        }
        output_display = word_output.join(' ');
        document.getElementById("word_output").innerHTML = output_display;
    }else{
        score_keeper = score_keeper+1;
    }
    console.log(word_output);
    console.log(selected_word);

    checkWin();
    clearCanvas();
}

function checkWin(){
    if(compareInputAnswer(word_output, selected_word)){
        console.log('here');
        document.getElementById("result_alert").innerHTML = "Congratulations you win :)";
    }
    else if(score_keeper == 6 && !(compareInputAnswer(word_output, selected_word))){
        drawScorekeeper(score_keeper);
        document.getElementById("result_alert").innerHTML = "Sorry you lost :(";
    }
    else{
        drawScorekeeper(score_keeper);
    }
}

function compareInputAnswer(input, answer){
    isequal = true;
    for(i = 0; i<input.length; i++){
        if(input[i] != answer[i]){
            isequal = false;
            break;
        }
    }
    return isequal;
}

var score_keeper_graphic = [" O", "<br>/", "|", "\\", "<br>/", " \\"];

function drawScorekeeper(current_score){
    var score_keeper_man;
    score_keeper_man = score_keeper_graphic.slice(0, current_score).join("");
    document.getElementById("the_man").innerHTML = score_keeper_man;
}

function newGame(){
    //refresh the variables and push to the html 
    word_output = [];
    output_display = "";
    guessed_letters = [];
    score_keeper = 0;

    guessed_letters_str = guessed_letters.join(' ');
    document.getElementById("guessed_letters").innerHTML = guessed_letters_str;

    drawScorekeeper(score_keeper);
    document.getElementById("result_alert").innerHTML = "";

    document.getElementById("temp_guess").innerHTML = "";
}