import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

const RecipeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe } = location.state || {};

  if (!recipe) {
    return (
      <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold">Recipe not found!</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-md">
      <img
        src={recipe.recipe_image}
        alt={recipe.recipe_name}
        className="w-full h-60 object-cover rounded-2xl mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{recipe.recipe_name}</h1>
      <p className="mb-2">{recipe.recipe_description}</p>
      <p className="mb-2 font-semibold">Ingredients: {recipe.ingredients}</p>
      <p className="mb-2">Owner: {recipe.recipe_owner}</p>
      <p>Rating: {recipe.recipe_rating} ⭐</p>
       <button
        onClick={() => navigate('/home')}
        className="mt-4 px-4 py-2 bg-black text-white rounded-2xl hover:bg-primary_color"
      >
        Back to Home
      </button>
    </div>
  );
};

export default RecipeDetails;
