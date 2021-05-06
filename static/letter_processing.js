var model;

function loadModel(){
    model = tf.saved_model.load("././model/letter_model");
}

function predictLetter(){
    canvas = document.getElementById('my_canvas');
    context = canvas.getContext('2d');

    context.drawImage(canvas, 0,0,28,28);
    var imageData = context.getImageData(0,0,28,28);
    var data = imageData.data;

    // convert imageData so it works with the tensor
    one_val_data = [];
    var i;
    for(i = 0; i<data.length; i=i+4){
        one_hot_red_val = 1.0;
        if(data[i]==255){
            one_hot_red_val = 0.0;
        }

        one_val_data.push(one_hot_red_val);
    };

    input_tensor = tf.tensor(one_val_data);
    letter_num = model.predict(input_tensor);

    predicted_letter = string.fromCharCode(97+letter_num);

    console.log(predicted_letter);
}