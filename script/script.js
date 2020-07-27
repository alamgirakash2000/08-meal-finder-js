const submitEl= document.getElementById('form-submit')
const searchEl = document.getElementById('search-input')
const randomEl= document.getElementById('random')
const headingEl= document.getElementById('result-heading')
const mealsEl = document.getElementById('meals')
const categoryEl= document.getElementById('categories')
const singleMeal= document.getElementById('single-meal')
headingEl.innerHTML=`<h5>Search or select Meal`

getCategory()

const search= {
    searchText:''
}

submitEl.addEventListener('submit', getFetchElement)
meals.addEventListener('click', getDetails)
categoryEl.addEventListener('click', generateCategoryDOM)
randomEl.addEventListener('click', getRandomMeal)
searchEl.addEventListener('input', (e)=> {
    search.searchText= e.target.value
    fetchedElementsDom(search.searchText)
})