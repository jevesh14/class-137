status = ""; 
video = "";
objects = [];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();

    video.hide();
}
function preload(){
    video  = createVideo('video.mp4');
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
}
function modelLoaded(){
    console.log("model is loaded");
    video.loop();
    status = true;
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video,0,0,380,380);
    
    if(status != ""){
        objectDetector.detect(video,gotresult);
        for(i = 0; i<objects.length; i++ ){
           document.getElementById("status").innerHTML = "Status: Object Detected";
           document.getElementById("number_of_object").innerHTML = "Number of Objects Detected are:"+objects.length;

           fill("#0062ff");
           noFill();
           stroke("#0062ff");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + "" +percent+ "%" +objects[i].x+15,objects[i].y+15);
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}
function gotresult(error,results){
      if(error){
          console.log(error);
      }
      else{
          console.log(results);
          objects = results;
      }
}