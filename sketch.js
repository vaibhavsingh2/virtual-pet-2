//Create variables here
var totalFood=20;
var foodS;
var StandingDogImg,DogEatingImg,dog;
var feedPet,AddFood;
var fedTime,lastFed;
var foodObj;


function preload()
{
  //load images here
  StandingDogImg = loadImage("../images/dogImg.png");
  DogEatingImg=loadImage("../images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  feedPet=createButton("Feed the dog.")
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood=createButton("Add food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
  database = firebase.database();
  dog=createSprite(250,250,10,10);
  dog.addImage("dog",DogEatingImg);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food();
  foodObj.display();
}


function draw() {  
  background(46,139,87);
 
  textSize(20);

  fill("red");
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+" PM",350,30);

  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed+" AM",350,30);
  }
  
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
  drawSprites();
  //add styles here
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1;
    console.log(x);
  }
  database.ref('/').update({
    Food: x
  })
  console.log(foodS)
  }

  function feedDog(){
    dog.addImage(StandingDogImg);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
    fedTime: hour()
  })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }