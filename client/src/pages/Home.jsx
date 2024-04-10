import React from "react";

function Home() {
    return (
        <div className="container bg-light p-4 my-4">
            <h1 className="text-center text-primary mb-4">Welcome to PantryPal</h1>
            <p className="text-center">Discover recipes you can make with what's in your pantry and know what you need to add!</p>

            <div className="my-4">
                <input type="text" className="form-control" placeholder="Enter ingredients you have..." />
                <button className="btn btn-primary mt-2">Find Recipes</button>
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
