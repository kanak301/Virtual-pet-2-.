var dog;
var dog_img;
var happyDog_img;
var database;
var foodS;
var foodStock;
var lastFed, fedTime;
var milk;
var foodObj;
var milk_img;


function preload()
{
dog_img = loadImage("images/Dog.png");
happyDog_img = loadImage("images/happydog.png");
milk_img = loadImage("images/Milk.png");
}

function setup() {

	createCanvas(500, 500);
  
  dog = createSprite(250,250,20,50);
  dog.addImage(dog_img);
  dog.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new Foodclass(100,250);

  feed=createButton("Feed the dog"); 
  feed.position(700,95); 
  feed.mousePressed(feedDog); 

  addFood=createButton("Add Food");
  addFood.position(800,95); 
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
  }

  foodObj.display();

  drawSprites();
 
  //add styles here
  //fill("white");
//text("remaining food:"+foodS,5,50);

}

function readStock(data){ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
 }

 function writeStock(x){
     if(x<=0){
      x=0; }
      
      else{ x=x-1; }
      database.ref('/').update({ Food:x }) }

      //function to update food stock and last fed time function 
      
      function feedDog(){
         dog.addImage(happyDog_img); 

         if(foodObj.getFoodStock()<= 0){ 
           foodObj.updateFoodStock(foodObj.getFoodStock()*0);
           
        }
        
        else{ foodObj.updateFoodStock(foodObj.getFoodStock()-1); } 
        console.log(foodObj.getFoodStock());
        database.ref('/').update({ 
        food:foodObj.getFoodStock(), FeedTime:hour() }) }
        
        //function to add food in stock function
        
        function addFoods(){
           foodS++; 
           database.ref('/').update({ Food:foodS }) 
         }


