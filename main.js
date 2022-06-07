Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
    })
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ecEmQqMaP/model.json',modelLoaded);
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction " + prediction_1;
    speak_data_2="And the heard prediction " + prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}
function modelLoaded(){
    console.log("model Loaded");
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        document.getElementById("result_emoticon_name").innerHTML=results[0].label;
        document.getElementById("result_emoticon_name2").innerHTML=results[1].label;
    speak();
    if(results[0].label == "Happy"){
        document.getElementById("update_emoji").innerHTML="😃";
    }
    if(results[0].label == "Sad"){
        document.getElementById("update_emoji").innerHTML="😢";
    }
    if(results[0].label == "Angry"){
        document.getElementById("update_emoji").innerHTML="😡";
    }
    if(results[1].label == "Happy"){
        document.getElementById("update_emoji").innerHTML="😃";
    }
    if(results[1].label == "Sad"){
        document.getElementById("update_emoji").innerHTML="😢";
    }
    if(results[1].label == "Angry"){
        document.getElementById("update_emoji").innerHTML="😡";
    }
    }
}