var model;

async function loadModel(){
    model = await tf.loadLayersModel("https://michelleli246.github.io/HangmanGame/static/model/model.json");
}

function predictLetter(){
    canvas = document.getElementById('my_canvas');
    context = canvas.getContext('2d');

    canvas2 = document.getElementById('my_canvas2');
    context2 = canvas2.getContext('2d');

    canvas2.style.display="none";

    // shrink image down to the necessary 28x28 file size
    context2.drawImage(canvas, 0,0,28,28);

    var imageData = context2.getImageData(0,0,28,28);
    var data = imageData.data;

    // convert imageData so it works with the tensor
    one_val_data = [];
    var i;
    var j = 0;
    temp_row = [];

    for(i = 0; i<data.length; i=i+4){
        one_hot_red_val = 1.0;
        if(data[i]==255){
            one_hot_red_val = 0.0;
        }
        temp_row.push(one_hot_red_val);
        if (temp_row.length == 28){
            one_val_data.push(temp_row);
            temp_row = [];
        }
        j = j+1;
    };

    transposed_one_val = one_val_data[0].map((col, i) => one_val_data.map(row => row[i]))

    transposed_list = [];
    for(i=0; i<28; i++){
        transposed_list = transposed_list.concat(transposed_one_val[i]);
    }

    input_tensor = tf.tensor([transposed_list]);

    raw_pred = model.predict(input_tensor);
    letter_pred = raw_pred.dataSync();

    var max = letter_pred[0];
    var letter_num = 0;

    for (var i = 1; i < letter_pred.length; i++) {
        if (letter_pred[i] > max) {
            letter_num = i;
            max = letter_pred[i];
        }
    }

    predicted_letter = String.fromCharCode(96+letter_num);

    return predicted_letter;
}