//defineing variables

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const randomMeal = document.getElementById('random-dish')
const aaa = document.getElementById('search-input')


// eventListener afer submit button is pressed
searchBtn.addEventListener('click', getMealList);


recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});



// get meal list that matches with the category
function getMealList(){
    // trimming the input to delete extra spaces
    let searchInputTxt = document.getElementById('search-input').value.trim();
    // fetching searching category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        // html template
        let html = "";
        // if data.meals size != 0
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Ingredients</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } 
        // if input is empty
        else if(searchInputTxt ==""){
            html = "Select a Category!"
            mealList.classList.add('notFound')

        }
        // if meals with searched category not found ie. if data.meals size = 0
        else{
            html = "Sorry, we didn't find any meal, matching your Catrgory";
            mealList.classList.add('notFound');
        }
        // scrolling when sumbit button is hit
        window.scrollTo({
            top: 1000,
            behavior: 'smooth'
        });
        // printing it in the div in html
        mealList.innerHTML = html;
    });
}

// eventListener for getting ingredients for meals
mealList.addEventListener('click', getMealIngredientse);
randomMeal.addEventListener('click', getMealIngredientse);

//random-meal card through api
axios.get("https://www.themealdb.com/api/json/v1/1/random.php").then((res)=>{
  console.log(res.data.meals[0])
  let resul = res.data.meals[0];
        let htm = "";
        
            // giving data-id of idMeal to get its ingredients from api at 99 
                htm += `
                    <div class = "meal-item" data-id = "${resul.idMeal}">
                    <div><h1>${resul.strArea}</h1></div>
                        <div class = "meal-img">
                            <img id="random-dish-image" src = "${resul.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${resul.strMeal}</h3>
                            
                            <a href = "#" class = "recipe-btn">Get Ingredients</a>
                        </div>
                    </div>
                `;
                 document.getElementById('random-dish').innerHTML = htm;})


// fetching from api to get ingredients of every meal
function getMealIngredientse(e){
    e.preventDefault();
    // if button is pressed and it have class of recipe-btn 
    if(e.target.classList.contains('recipe-btn')){
        // it will get the data-id from its parentElement's parentelement
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        // it will execute the function mealRecipeModal() and give data.meals as perimenter.
        .then(data => mealRecipeModal(data.meals));
    }
}

// function to get and print ingredients and name 
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    // creating an array 
    let ingredients=[];
    for(let i=1;i<=20;i++){
        let ing=meal[`strIngredient${i}`]
        // if ingredient is not an empty string
        if(ing && ing!=""){
            // pushing it in array
            ingredients.push(ing)
            
        }
      }
      console.log(ingredients)
      // creating html template for each ingredient
      let a = '';
        ingredients.forEach((elt) => {
            ;
            a+= 
            `
            <ul>
            <li>${elt}</li>
            </ul>`
            mealDetailsContent.innerHTML = a;
            // assigning the name
            document.getElementById('name').innerText = meal.strMeal
           
        });
        
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
   

    
    