objects = [];
Status = "";
alarm = "";

function preload(){
    alarm = loadSound("money_jiggle_jiggle.mp3");
 }

function setup(){
    canvas = createCanvas(500,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(500,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects ";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
}

function gotResult(error,results){
    if(results.length > 0) {
        if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    }
}

function draw(){
    image(video,0,0,500,380);
    
   if(Status != ""){
       r = random(255);
       g = random(255);
       b = random(255);
       
       objectDetector.detect(video,gotResult);

       for(i = 0;i < objects.length; i++)
       {
           fill(r,g,b);
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

           if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("baby_found").innerHTML = "Baby Found";
            alarm.stop();
           }
           else{
            document.getElementById("baby_found").innerHTML = "Baby Not Found";
            alarm.play();
       }
        }
   }
}