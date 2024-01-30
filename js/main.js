/// <reference types="../@types/jquery" />
"use strict";

//loader
const loader = document.querySelector('.loader-container');
const loader2 = document.querySelector('.newloader-container');

//sidebar
const sideBar = $('.sidebar')
const showSideBar = document.querySelector('#showSideBar');
const hideSideBar = document.querySelector('#hideSideBar');
const menuIcons = $('.menu-icons');
const sidebarLinks = $('.sidebar-link');

//model
const model = document.querySelector('#model');


//search 
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#searchBtn');
const searchForm = document.querySelector('#searchForm');
const searchResult = document.querySelector('#searchResult');


//categories
const categoriesBtn = document.querySelector('#categoriesBtn');
const categoryCard = $('.category-card');

//areas
const areaBtn = document.querySelector('#areasBtn');

//ingredients
const ingredientsBtn = document.querySelector('#ingredientsBtn');



//contact
const contactBtn = document.querySelector('#contactBtn');
const contact = document.querySelector('#contact');
const nameInput = document.querySelector('#nameInput');
const nameWorngInput = document.querySelector('#nameWorngInput');
const emailInput = document.querySelector('#emailInput');
const emailWorngInput = document.querySelector('#emailWorngInput');
const PhoneInput = document.querySelector('#PhoneInput');
const PhoneWorngInput = document.querySelector('#PhoneWorngInput');
const ageInput = document.querySelector('#ageInput');
const ageWorngInput = document.querySelector('#ageWorngInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordWorngInput = document.querySelector('#passwordWorngInput');
const rePasswordInput = document.querySelector('#rePasswordInput');
const rePasswordWorngInput = document.querySelector('#rePasswordWorngInput');
const submitBtn = document.querySelector('#submitBtn');



// fun show sidebar
function showNavbar(){
    sideBar.css('marginLeft','0');
    showSideBar.classList.add('d-none');
    hideSideBar.classList.remove('d-none');
    //animate links in sidebar
    $('#s').animate({top: "0%"},50,function(){
        $('#ca').animate({top:"15%"},60,function(){
            $('#a').animate({top:"30%"},70,function(){
                $('#i').animate({top:"45%"},80,function(){
                    $('#co').animate({top:"60%"},100)
                })
            })
        });
    });

};

//fun hide sidebar
function hideNavbar(){
    let sideBarWidth = sideBar.outerWidth();
    let menuIconsWidth = menuIcons.outerWidth();
    sideBar.css('marginLeft',`-${sideBarWidth - menuIconsWidth}px`);
    showSideBar.classList.remove('d-none');
    hideSideBar.classList.add('d-none');
    //animate links on sidebar
    $('#s').animate({top: "100%"},50);
    $('#ca').animate({top: "100%"},50);
    $('#a').animate({top: "100%"},50);
    $('#i').animate({top: "100%"},50);
    $('#co').animate({top: "100%"},50);
};

//show sidebar by click on icon menu
showSideBar.addEventListener('click',showNavbar);
//hide sidebar by click on icon close
hideSideBar.addEventListener('click',hideNavbar);

/************************************************************************* search */
//get search page by click on a link
searchBtn.addEventListener('click',function(e){
    let sectionName = (e.target).innerHTML;
    getPage(sectionName);
    searchForm.classList.remove('d-none');
    searchResult.classList.add('d-none');
    $('body').removeClass('overflow-hidden');
    const searchByName = document.querySelector('#searchByName');
    const searchByLetter = document.querySelector('#searchByLetter');

    searchByName.addEventListener('keyup',function(){
        getMealsByName(searchByName.value);
        searchResult.classList.remove('d-none');
    });
    searchByLetter.addEventListener('keyup',function(){
        getMealsByLetter(searchByLetter.value);
        console.log(searchByLetter.value);
        searchResult.classList.remove('d-none');
    });
    searchByLetter.addEventListener('keypress',function(e){
        let inputLength = (searchByLetter.value).length;
        if(inputLength > "0"){
            e.preventDefault();
        };
    });

});

async function getMealsByName(name){
    loader2.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if(request.ok){
        const result =await request.json();
        loader2.classList.add('d-none');
        showMeals(result.meals);
    };
};

async function getMealsByLetter(letter){
    loader2.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    if(request.ok){
        const result =await request.json();
        loader2.classList.add('d-none');
        showMeals(result.meals);
    };
};
/**********************************************************************end search*/

/*******************************************************************  categories */
// get categories page by click on a link
categoriesBtn.addEventListener('click',function(e){
    let sectionName = (e.target).innerHTML;
    getPage(sectionName);
    searchForm.classList.add('d-none');
    searchResult.classList.remove('d-none');
    const categories = document.querySelector('#categories');
    const categoriesContainer = document.querySelector('#categoriesContainer');
    getMealsByCategories();
    $('body').removeClass('overflow-hidden');
});

//fun to get all categories data
async function getMealsByCategories(){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        showCategories(result.categories);
    };
};

//fun to display categories at categories section
function showCategories(categoriesList){
    let container = '';
    for(let i=0 ; i<categoriesList.length ; i++){
        container += 
        `
            <div class="col-md-3">
                <div id="${categoriesList[i].strCategory}" class="category-card position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img src="${categoriesList[i].strCategoryThumb}" class="w-100 " alt="${categoriesList[i].strCategory}">
                    <div class="category-card-layer position-absolute text-center p-2">
                        <h3 class="category-card-h3">${categoriesList[i].strCategory}</h3>
                        <p class="p-2 text-center lh-lg">${categoriesList[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `;
    };
    categoriesContainer.innerHTML = container;
    const categoryCard = $('.category-card');

    // get the category name by click on it
    categoryCard.on('click',function(){
        getMealsByCategoryName($(this).attr('id'));
        loader.classList.remove('d-none');
        search.classList.remove('d-none');
        getPage(search.getAttribute('id'));
    });
};

// get meals based category name
async function getMealsByCategoryName(categoryName){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        showMeals(result.meals);
    };
};
/*****************************************************************end  categories*/

/***************************************************************************area */
//get area page by click on a link
areaBtn.addEventListener('click', function(e){
    let sectionName = (e.target).innerHTML;
    getPage(sectionName);
    searchForm.classList.add('d-none');
    searchResult.classList.remove('d-none');
    const areaContainer = document.querySelector('#areaContainer');
    getMealsByAreas();
    $('body').removeClass('overflow-hidden');
});

//fun to get all Areas data
async function getMealsByAreas(){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        showAreas(result.meals);
    };
};

//fun to display Areas at Areas section
function showAreas(areasList){
    let container = '';
    for(let i=0 ; i<areasList.length ; i++){
        container += 
        `
            <div class="col-md-3">
                <div id="${areasList[i].strArea}" class="area-card cursor-pointer text-center">
                    <i class="fa-solid fa-house-laptop"></i>
                    <h3 id="country">${areasList[i].strArea}</h3>
                </div>
            </div>
        `;
    };
    areaContainer.innerHTML = container;
    const areaCard = $('.area-card');

    //get the area name by click on it
    areaCard.on('click',function(){
        console.log($(this).attr('id'));
        getMealsByAreaName($(this).attr('id'));
        search.classList.remove('d-none');
        loader.classList.remove('d-none');
        getPage(search.getAttribute('id'));
    });
};

// get meals based Area name
async function getMealsByAreaName(categoryName){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${categoryName}`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        console.log(result.meals);
        showMeals(result.meals);
    };
};

/**********************************************************************end eraa */

/**********************************************************************ingredients */
//get ingredients page by click on a link
ingredientsBtn.addEventListener('click',function(e){
    let sectionName = (e.target).innerHTML;
    getPage(sectionName);
    searchForm.classList.add("d-none");
    searchResult.classList.remove('d-none');
    const ingredientsContainer = document.querySelector('#ingredientsContainer');
    getMealsByingredients();
    $('body').removeClass('overflow-hidden');
});

//fun to get all ingredients data
async function getMealsByingredients(){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        // console.log(result.meals);
        showIngredients(result.meals);
    };
};

//fun to display ingredients at ingredients section
function showIngredients(ingredientsList){
    let container = '';
    for(let i=0 ; i<20 ; i++){
        container += 
        `
            <div class="col-md-3 overflow-hidden p-2">
                <div id="${ingredientsList[i].strIngredient}" class="ingredient-card cursor-pointer text-center text-center">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3 id="country">${ingredientsList[i].strIngredient}</h3>
                    <p>${ingredientsList[i].strDescription}</p>
                </div>
            </div>
        `;
    };
    ingredientsContainer.innerHTML = container;
    const ingredientCard = $('.ingredient-card');

    // get the ingredient name by click on it
    ingredientCard.on('click',function(){
        getMealsByingredientName($(this).attr('id'));
        search.classList.remove('d-none');
        loader.classList.remove('d-none');
        getPage(search.getAttribute('id'));
    });
};

// get meals based ingredient name
async function getMealsByingredientName(ingredientName){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        console.log(result.meals);
        showMeals(result.meals);
    };
};

/******************************************************************end ingredients */

//get contact page by click on a link
contactBtn.addEventListener('click',function(){
    contact.classList.remove('d-none');
    getPage(contact.getAttribute('id'));
    $('body').removeClass('overflow-hidden');
});

//fun to get a page and hide all page
function getPage(name){
    let getSection = $(`#${name}`);
    //show section
    getSection.removeClass('d-none');
    //hide other sections
    getSection.siblings().addClass('d-none');
    //show sidebar
    document.querySelector('#sidebar').classList.remove('d-none');
    //hide otherlinks
    hideNavbar();
};
/***************************************************************************validation */
//global fun to show or hide error message bassed on validate funs
function checkInputsValidation(inputTag,isvalid,wrongMessage){
    if(isvalid){
        inputTag.classList.add('is-valid');
        inputTag.classList.remove('is-invalid');
        wrongMessage.classList.add('d-none');
    }
    else{
        inputTag.classList.remove('is-valid');
        inputTag.classList.add('is-invalid');
        wrongMessage.classList.remove('d-none');
    };
    if(nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && rePasswordValidation()){
        submitBtn.removeAttribute('disabled');
    }
    else{
        submitBtn.setAttribute('disabled','disabled');
    };
};

//fun to check name
function nameValidation(){
    let nameRegx = /^[a-z ,.'-]{3,}$/;
    return nameRegx.test(nameInput.value);
};

//call fun to chack name on keyup in input
nameInput.addEventListener('keyup',function(){
    let isValid = nameValidation();
    checkInputsValidation(nameInput,isValid,nameWorngInput);
});

//fun to check email
function emailValidation(){
    let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z.-]+\.[A-Za-z]{2,7}$/;
    return emailRegex.test(emailInput.value);
};

//call fun to chack email on keyup in input
emailInput.addEventListener('keyup',function(){
    let isValid = emailValidation();
    checkInputsValidation(emailInput,isValid,emailWorngInput);
});

//fun to check phone
function phoneValidation(){
    let phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,5}$/;
    return phoneRegex.test(PhoneInput.value);
};
//call fun to chack phone on keyup in input
PhoneInput.addEventListener('keyup',function(){
    let isValid = phoneValidation();
    checkInputsValidation(PhoneInput,isValid,PhoneWorngInput);
});

//fun to check age
function ageValidation(){
    let ageRegex = /^[1-9]?[0-9]{1}$|^100$/;
    return ageRegex.test(ageInput.value);
};

//call fun to chack age on keyup in input
ageInput.addEventListener('keyup',function(){
    let isValid = ageValidation();
    checkInputsValidation(ageInput,isValid,ageWorngInput);
});

//fun to check password
function passwordValidation(){
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(passwordInput.value);
};

//call fun to chack password on keyup in input
passwordInput.addEventListener('keyup',function(){
    let isValid = passwordValidation();
    checkInputsValidation(passwordInput,isValid,passwordWorngInput);
});

//if use change in password he should know that he should change in repassword also
passwordInput.addEventListener('change',function(){
    let isValid = rePasswordValidation();
    checkInputsValidation(rePasswordInput,isValid,rePasswordWorngInput);
});

//fun to check password match repassword
function rePasswordValidation(){
    return (rePasswordInput.value == passwordInput.value);
};

//call fun to chack repassword on keyup in input
rePasswordInput.addEventListener('keyup',function(){
    let isValid = rePasswordValidation();
    checkInputsValidation(rePasswordInput,isValid,rePasswordWorngInput);
});
/***************************************************************************end validation */


//fun to get randomMeals to display it as defult
async function getRandomMeals(){
    loader.classList.remove('d-none');
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if(request.ok){
        const result = await request.json();
        showMeals(result.meals);
        loader.classList.add('d-none');
    };
};
// call at the begining 
getRandomMeals();

const display = document.querySelector("#display");

//fun to display meals super fun
function showMeals(mealList){
    loader.classList.add('d-none');
    let container = '';

    if(mealList>20){
        for(let i=0; i<20 ; i++){
            container += 
            `
                <div class="col-md-3">
                    <div id="${mealList[i].idMeal}" class="mael-card position-relative overflow-hidden rounded-2">
                        <img src="${mealList[i].strMealThumb}" class="w-100 " alt="${mealList[i].strMeal}">
                        <div class="mael-card-layer position-absolute  d-flex align-items-center ps-2">
                            <h3 class="meal-card-h3">${mealList[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        };
    }
    else{
        for(let i=0; i<mealList.length ; i++){
            container += 
            `
                <div class="col-md-3">
                    <div id="${mealList[i].idMeal}" class="mael-card position-relative overflow-hidden rounded-2">
                        <img src="${mealList[i].strMealThumb}" class="w-100 " alt="${mealList[i].strMeal}">
                        <div class="mael-card-layer position-absolute  d-flex align-items-center ps-2">
                            <h3 class="meal-card-h3">${mealList[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        };
    };

    display.innerHTML = container;
    const maelCard = $('.mael-card');

    //get meal id by click on meal
    maelCard.on('click',function(){
        let mealId = $(this).attr('id') 
        getMealById(mealId);
        model.classList.remove('d-none');
        $('body').addClass('overflow-hidden');
    });
};

//fun to get details for a meal super fun
async function getMealById(id){
    loader.classList.remove('d-none');
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if(request.ok){
        const result =await request.json();
        loader.classList.add('d-none');
        showMealDetails(result.meals[0]);
    };
};

//fun to display details at model section
function showMealDetails(meal){
    let container = 
    `
    <i id="closeModelBtn" class="fa-solid fa-xmark position-absolute fs-4"></i>
    <div class="container mt-5">
        <div class="row gy-4">
            <div class="col-md-4">
                <div class="rounded-2 overflow-hidden">
                    <img id="modleImg" src="${meal.strMealThumb}" class="w-100" alt="me">
                </div>
                <h3 id="modelTitel" class="mt-2">${meal.strMeal}</h3>
            </div>
            <div class="col-md-8">
                <div>
                    <h2 id="modelInstructions">Instructions</h2>
                    <p id="modelParagraph">${meal.strInstructions}</p>
                    <h3 id="modelArea"><span class="fw-bold">Area :</span> ${meal.strArea}</h3>
                    <h3 id="modelCategory"><span class="fw-bold">Category :</span> ${meal.strCategory}</h3>
                    <h3 id="modelRecipes">Recipes :</h3>
                    <ul id="modelRecipesList" class="d-flex flex-wrap ps-2 mt-3">
                        
                        
                        <li ${meal.strMeasure1==null&& meal.strIngredient1==null ?`class="d-none"`:
                            meal.strMeasure1!=""&& meal.strIngredient1!="" ?`class="1"`:
                            `class="d-none"` }>
                            ${meal.strMeasure1} ${meal.strIngredient1}
                        </li>
                        <li ${meal.strMeasure2==null&& meal.strIngredient2==null ?`class="d-none"`:
                            meal.strMeasure2!=""&& meal.strIngredient2!="" ?`class="2"`:
                            `class="d-none"` }>
                            ${meal.strMeasure2} ${meal.strIngredient2}
                        </li>
                        <li ${meal.strMeasure3==null&& meal.strIngredient3==null ?`class="d-none"`:
                            meal.strMeasure3!=""&& meal.strIngredient3!="" ?`class="3"`:
                            `class="d-none"` }>
                            ${meal.strMeasure3} ${meal.strIngredient3}
                        </li>
                        <li ${meal.strMeasure4==null&& meal.strIngredient4==null ?`class="d-none"`:
                            meal.strMeasure4!=""&& meal.strIngredient4!="" ?`class="4"`:
                            `class="d-none"` }>
                            ${meal.strMeasure4} ${meal.strIngredient4}
                        </li>
                        <li ${meal.strMeasure5==null&& meal.strIngredient5==null ?`class="d-none"`:
                            meal.strMeasure5!=""&& meal.strIngredient5!="" ?`class="5"`:
                            `class="d-none"` }>
                            ${meal.strMeasure5} ${meal.strIngredient5}
                        </li>
                        <li ${meal.strMeasure6==null&& meal.strIngredient6==null ?`class="d-none"`:
                            meal.strMeasure6!=""&& meal.strIngredient6!="" ?`class="6"`:
                            `class="d-none"` }>
                            ${meal.strMeasure6} ${meal.strIngredient6}
                        </li>
                        <li ${meal.strMeasure7==null&& meal.strIngredient7==null ?`class="d-none"`:
                            meal.strMeasure7!=""&& meal.strIngredient7!="" ?`class="7"`:
                            `class="d-none"` }>
                            ${meal.strMeasure7} ${meal.strIngredient7}
                        </li>
                        <li ${meal.strMeasure8==null&& meal.strIngredient8==null ?`class="d-none"`:
                            meal.strMeasure8!=""&& meal.strIngredient8!="" ?`class="8"`:
                            `class="d-none"` }>
                            ${meal.strMeasure8} ${meal.strIngredient8}
                        </li>
                        <li ${meal.strMeasure9==null&& meal.strIngredient9==null ?`class="d-none"`:
                            meal.strMeasure9!=""&& meal.strIngredient9!="" ?`class="9"`:
                            `class="d-none"` }>
                            ${meal.strMeasure9} ${meal.strIngredient9}
                        </li>
                        <li ${meal.strMeasure10==null&& meal.strIngredient10==null ?`class="d-none"`:
                            meal.strMeasure10!=""&& meal.strIngredient10!="" ?`class="10"`:
                            `class="d-none"` }>
                            ${meal.strMeasure10} ${meal.strIngredient10}
                        </li>
                        <li ${meal.strMeasure11==null&& meal.strIngredient11==null ?`class="d-none"`:
                            meal.strMeasure11!=""&& meal.strIngredient11!="" ?`class="11"`:
                            `class="d-none"` }>
                            ${meal.strMeasure11} ${meal.strIngredient11}
                        </li>
                        <li ${meal.strMeasure12==null&& meal.strIngredient12==null ?`class="d-none"`:
                            meal.strMeasure12!=""&& meal.strIngredient12!="" ?`class="12"`:
                            `class="d-none"` }>
                            ${meal.strMeasure12} ${meal.strIngredient12}
                        </li>
                        <li ${meal.strMeasure13==null&& meal.strIngredient13==null ?`class="d-none"`:
                            meal.strMeasure13!=""&& meal.strIngredient13!="" ?`class="13"`:
                            `class="d-none"` }>
                            ${meal.strMeasure13} ${meal.strIngredient13}
                        </li>
                        <li ${meal.strMeasure14==null&& meal.strIngredient14==null ?`class="d-none"`:
                            meal.strMeasure14!=""&& meal.strIngredient14!="" ?`class="14"`:
                            `class="d-none"` }>
                            ${meal.strMeasure14} ${meal.strIngredient14}
                        </li>
                        <li ${meal.strMeasure15==null&& meal.strIngredient15==null ?`class="d-none"`:
                            meal.strMeasure15!=""&& meal.strIngredient15!="" ?`class="15"`:
                            `class="d-none"` }>
                            ${meal.strMeasure15} ${meal.strIngredient15}
                        </li>
                        <li ${meal.strMeasure16==null&& meal.strIngredient16==null ?`class="d-none"`:
                            meal.strMeasure16!=""&& meal.strIngredient16!="" ?`class="16"`:
                            `class="d-none"` }>
                            ${meal.strMeasure16} ${meal.strIngredient16}
                        </li>
                        <li ${meal.strMeasure17==null&& meal.strIngredient17==null ?`class="d-none"`:
                            meal.strMeasure17!=""&& meal.strIngredient17!="" ?`class="17"`:
                            `class="d-none"` }>
                            ${meal.strMeasure17} ${meal.strIngredient17}
                        </li>
                        <li ${meal.strMeasure18==null&& meal.strIngredient18==null ?`class="d-none"`:
                            meal.strMeasure18!=""&& meal.strIngredient18!="" ?`class="18"`:
                            `class="d-none"` }>
                            ${meal.strMeasure18} ${meal.strIngredient18}
                        </li>
                        <li ${meal.strMeasure19==null&& meal.strIngredient19==null ?`class="d-none"`:
                            meal.strMeasure19!=""&& meal.strIngredient19!="" ?`class="19"`:
                            `class="d-none"` }>
                            ${meal.strMeasure19} ${meal.strIngredient19}
                        </li>
                        <li ${meal.strMeasure20==null&& meal.strIngredient20==null ?`class="d-none"`:
                            meal.strMeasure20!=""&& meal.strIngredient20!="" ?`class="20"`:
                            `class="d-none"` }>
                            ${meal.strMeasure20} ${meal.strIngredient20}
                        </li>
                    </ul>

                    <h3 id="modelTags">Tags :</h3>
                    <ul id="modelTagsList" class="d-flex flex-wrap ps-2 mt-3">
                        <li ${meal.strTags==null ?`class="d-none"`:`class="ss"`} >${meal.strTags}</li>
                    </ul>
                    <a id="SourceBtn" class="btn btn-success me-2" target="_blank" href="${meal.strSource}">Source</a>
                    <a id="YoutubeBtn" class="btn btn-danger" target="_blank" href="${meal.strYoutube}">Youtube</a>
                </div>
            </div>
        </div>
    </div>
    `;
    model.innerHTML = container;
    //close meal model by click on close icon
    closeModelBtn.addEventListener('click',function(){
        model.classList.add('d-none');
        $('body').removeClass('overflow-hidden');
    });
};

