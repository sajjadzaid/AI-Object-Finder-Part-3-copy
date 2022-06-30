objects=[];
function setup(){
    canvas=createCanvas(480,380)
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status!==""){
        objectDetector.detect(video, gotResult)
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+ objects.length;

        fill("red");
        percent= floor(objects[i].confidence*100);
        text(objects[i].label+ " "+ percent+ "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label==object_name){
            video.stop()
            objectDetector.detect(video, gotResult)
            document.getElementById("status").innerHTML=object_name+"Found";
        }
        else{
            document.getElementById("status").innerHTML=object_name+"Not Found";
        }
        }
    }
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
    object_name= document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("CocoSSD has been initialized");
    status= true;
    
}

function gotResult(error,result){
    if(error){
        console.log(error);
    
    }
    else{
        console.log(result)
        objects= result;
    }
    }
    






