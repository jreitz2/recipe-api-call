const key = 'e362ee8a688847febf87cdb4e1a22a92';

const getRecipe = async (searchTerm) => {

    function createRecipe(name, image, ingredients, instructions) {
        return {
            name: name,
            image: image,
            ingredients: ingredients,
            instructions: instructions
        }
    }

    let recipeInfo = [];
    let recipeIds = [];

    try {
        const response = await fetch
            (`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${key}&ingredients=${searchTerm}&number=5&addRecipeInformation=true)`);
        const data = await response.json();
        data.forEach(recipe => {
            recipeIds.push(recipe.id);
            let allIngs = [];
            allIngs.push(...recipe.missedIngredients, ...recipe.usedIngredients);
            let tempRecipe = createRecipe(recipe.title, recipe.image, allIngs);
            recipeInfo.push(tempRecipe);
        })
        for (let i = 0; i < recipeIds.length; i++) {
            const response2 = await fetch (`https://api.spoonacular.com/recipes/${recipeIds[i]}/analyzedInstructions?apiKey=${key}`);
            const data2 = await response2.json();
            recipeInfo[i].instructions = data2[0].steps;
        }
    
        return recipeInfo;

    } catch (error) {
        console.log(error);
    }
}

export default getRecipe;