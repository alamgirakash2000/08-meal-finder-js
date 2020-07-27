
// Get Fetched elements after search
function getFetchElement(e){
    e.preventDefault()
    const searchName=e.target.elements.search.value.trim().toLowerCase()
    fetchedElementsDom(searchName)
}

// Generate the fetched element's DOM
function fetchedElementsDom(searchName){
    if(!searchName){
        headingEl.innerHTML='<h4>Please enter name'
        getCategory()
      }else{
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`)
          .then(res => res.json())
          .then(data =>{
              var meals=data.meals
              if(meals){
                  headingEl.innerHTML=`<h5>You have searched for '${searchName}'</h5>`
                  addMealToDom(meals)
              }else{
                  headingEl.innerHTML=`<h3>No results found</h3>`
              } 
          })
      }
}

//Get the category list
function getCategory(){
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data =>{
        var meals=data.categories
        meals.map(meal =>{
            const newDiv= document.createElement('div')
            const mealEl= document.createElement('div')
            newDiv.className='row'
            mealEl.className='meal'
            mealEl.innerHTML=`
            <img src='${meal.strCategoryThumb}'>
            <h6 class='name' data-catName="${meal.strCategory}">${meal.strCategory}</h6>
            `  
            newDiv.appendChild(mealEl)
            categoryEl.appendChild(newDiv)
        })  
    })
}

//Add meals to the DOM
function addMealToDom(meals){
    mealsEl.innerHTML=''
    singleMeal.innerHTML=''
    meals.map(meal =>{
        const newDiv= document.createElement('div')
        const mealEl= document.createElement('div')
        newDiv.className='row'
        mealEl.className='meal'
        mealEl.innerHTML=`
        <img src='${meal.strMealThumb}'>
        <h6 class='name' data-mealID="${meal.idMeal}">${meal.strMeal}</h6>
        `  
        newDiv.appendChild(mealEl)
        mealsEl.appendChild(newDiv)
    })   

}

// Getting Details After clicking
function getDetails(e){
    const id= e.target.getAttribute('data-mealID')
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res =>res.json())
    .then(data =>{
        const meal=data.meals[0]
        getMealDetails(meal)

    })
    location.assign('#form-submit')
}


// Generate The DOM of the full details of a meal
function getMealDetails(meal){
    let ingredient= new Array()
    let strMeasure= new Array()
    let combined= new Array()

    console.log(meal);
    for(let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]!==""){
            ingredient.push(meal[`strIngredient${i}`])
        }
    }
    for(let i=1; i<=20; i++){
        if(meal[`strMeasure${i}`]!==""){
            strMeasure.push(meal[`strMeasure${i}`])
        }
    }
    for(let i=0; i<ingredient.length; i++){
        combined.push(`${ingredient[i]}-${strMeasure[i]}`)
    }
    singleMeal.innerHTML=`
    <img src='${meal.strMealThumb}' class='w-50'>
    <h3 class='my-auto'>${meal.strMeal}</h3>
    <p>${meal.strArea}</p>
    <br>
    <h4>Instructions :</h4>
    <p>${meal.strInstructions}</p>
    <h4>Ingredients: </h4>
    <ul class='ingredients'>
    ${combined.map(ing =>`<li>${ing}`).join('')}
    </ul>
    
    <a href='${meal.strYoutube}' class='btn btn-lg btn-info'><i class='fas fa-video'></i> &nbsp; Watch video</a>
  `
}

// Generate the DOM for random Meal
function getRandomMeal(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data =>{
        getMealDetails(data.meals[0])
    })
}

// Create DOM by category
function generateCategoryDOM(e){
    name=e.target.getAttribute('data-catName')
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    .then(res => res.json())
    .then(data =>{
        addMealToDom(data.meals)
    })
}