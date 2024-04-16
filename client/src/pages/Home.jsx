import React, { useState } from "react";
import ingredientsArray from "../data/ingredientArray";

function Home() {

    // State to manage the list of ingredients
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState('');

    const addIngredient = () => {
        if (ingredientInput.trim() !== '') {
            setIngredients(prevIngredients => [...prevIngredients, ingredientInput]);
            setIngredientInput('');
        }
    }

    const clearIngredientList = () => {
        setIngredients([]);
    }

    return (
        <div className="container bg-light p-4 my-4">
            <h1 className="text-center text-primary mb-4">Welcome to PantryPal</h1>
            <p className="text-center">Discover recipes you can make with what's in your pantry and know what you need to add!</p>

            <div className="my-4 d-flex">
                <div className="flex-grow-1 mx-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter ingredients you have..."
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        list="ingredients-list"
                        />
                    <datalist id="ingredients-list">
                        {ingredientsArray.map((ingredient, index) => (
                            <option key={index} value={ingredient} />
                        ))}
                    </datalist>
                </div>
                <button className="btn btn-primary" onClick={addIngredient}>Add Ingredient</button>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3>Ingredients List</h3>
                    <ul>
                        {
                            ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))
                        }
                    </ul>
                    <button type="button" class="btn btn-danger" onClick={clearIngredientList}>Clear List</button>
                </div>
                <div className="col-md-6"> 
                    <h3>Recipe Options</h3>
                    <div className="mt-3 mx-5">
                        <label for="cuisine">Cuisine Type:</label>
                        <select id="cuisine" class="form-control">
                            <option value="italian">Italian</option>
                            <option value="mexican">Mexican</option>
                            <option value="indian">Indian</option>
                        </select>
                    </div>

                    <div className="mt-3 mx-5">
                        <label for="dietaryRestrictions">Dietary Restrictions:</label>
                        <select id="dietaryRestrictions" class="form-control">
                            <option value="none">None</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="glutenFree">Gluten-Free</option>
                        </select>
                    </div>
                </div>
            </div>

            <section className="mt-5">
                <h2 className="text-secondary">Featured Recipes</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <img src="recipe1.jpg" className="card-img-top" alt="Recipe 1" />
                            <div className="card-body">
                                <h5 className="card-title">Recipe 1</h5>
                                <p className="card-text">Some quick example text to build on the card title.</p>
                                <a href="#" className="btn btn-success">View Recipe</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="recipe2.jpg" className="card-img-top" alt="Recipe 2" />
                            <div className="card-body">
                                <h5 className="card-title">Recipe 2</h5>
                                <p className="card-text">Some quick example text to build on the card title.</p>
                                <a href="#" className="btn btn-success">View Recipe</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="recipe3.jpg" className="card-img-top" alt="Recipe 3" />
                            <div className="card-body">
                                <h5 className="card-title">Recipe 3</h5>
                                <p className="card-text">Some quick example text to build on the card title.</p>
                                <a href="#" className="btn btn-success">View Recipe</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-5">
                <p className="text-center">PantryPal &copy; 2024</p>
            </footer>
        </div>
    );
}

export default Home;
