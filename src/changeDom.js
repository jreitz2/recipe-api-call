import getRecipe from "./apiCall";

const searchBtn = document.querySelector('form');
const searchTerms = document.getElementById('search-terms');
const resultsContainer = document.querySelector('.results');

searchBtn.addEventListener("submit", e => {
    e.preventDefault();
    resultsContainer.innerHTML = '';
    getRecipe(searchTerms.value).then(data => {
        console.log(data);
        data.forEach(recipe => {
            const resultWrapper = document.createElement('div');
            const resultDetails = document.createElement('div');
            resultDetails.classList.add('details');
            const resultCard = document.createElement('div');
            resultCard.classList.add('result');

            resultCard.addEventListener('click', () => {
                resultDetails.classList.toggle('hide-show');
            })

            const resultImg = document.createElement('img');
            resultImg.src = recipe.image;
            const resultName = document.createElement('div');
            resultName.innerText = recipe.name;
            
            const ingredientList = document.createElement('ul');
            ingredientList.textContent = 'Ingredients:';
            recipe.ingredients.forEach(ingredient => {
                const ingredientListItem = document.createElement('li');
                ingredientListItem.textContent = ingredient.name;
                ingredientList.appendChild(ingredientListItem);
            })

            const instructionList = document.createElement('ol');
            instructionList.textContent = 'Instructions:';
            recipe.instructions.forEach(instruction => {
                const instructionListItem = document.createElement('li');
                instructionListItem.textContent = instruction.step;
                instructionList.appendChild(instructionListItem);
            })

            resultCard.appendChild(resultImg);
            resultCard.appendChild(resultName);
            resultWrapper.appendChild(resultCard);
            resultDetails.appendChild(ingredientList);
            resultDetails.appendChild(instructionList);
            resultWrapper.appendChild(resultDetails);
            resultsContainer.appendChild(resultWrapper);
        })

        }).catch(err => console.log(err))

        searchBtn.reset();
})

// const resultTest = document.querySelector('.result');
// const detailsTest = document.querySelector('.details');
// resultTest.addEventListener('click', () => {
//     detailsTest.classList.toggle('hide-show');
// })