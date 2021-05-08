function setWord(){
    loadModel();
    
    text_input = [];

    fetch('../hangman_inputs/text_inputs.txt')
        .then(response => response.text())
        .then(data => {
            text_input;
        })
    console.log(text_input);
}

function eachTurn(){


}