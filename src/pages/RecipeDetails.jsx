import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router";

import { memo } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ Make sure this is correct
// import { handleDelete } from "../utils/handleDelete"; // optional: your delete logic

import { db } from "../firebase/firebase config";
import {ref,remove} from "firebase/database";

const RecipeDetails = () => {
  const { state } = useLocation();
  const { recipe } = state || {};
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ moved to top

  if (!recipe) {
    return (
      <div>
        <p>No recipe data found</p>
        <button onClick={() => navigate("/home")}>Go back home</button>
      </div>
    );
  }

  // todo: delete button functionality here.
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    const recipeRef = ref(db, `recipes/${id}`);
    remove(recipeRef)
      .then(() => {
        alert("Recipe deleted successfully!");
        navigate("/home");
      })
      .catch((err) => alert("Error deleting recipe: " + err.message));
  };

  return (
    <div>
      <div className="recipeDetailsWrapperFull max-w-4xl mt-4 mx-auto p-4">
        <img
          src={recipe.recipe_image_url}
          alt="recipe"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
          className="w-full rounded-lg object-cover mb-4"
        />

        <p className="font-bold text-4xl font-primary_font text-red-400 mb-4">
          {recipe.recipe_name}
        </p>
        <p className="text-[18px] font-primary_font mb-4 font-bold">
          {recipe.recipe_description}
        </p>
        <p className="font-primary_font text-[21px] text-primary_color font-bold mb-2">
          Ingredients:
        </p>
        <p className="font-primary_font text-[20px] text-black mb-4">
          {recipe.recipe_ingredients}
        </p>
        <p className="font-bold text-red-400 text-[21px] font-primary_font mb-2">
          Recipe Steps:
        </p>
        <p className="font-primary_font text-[20px] text-black mb-4">
          {recipe.recipe_steps}
        </p>
        <p className=" text-primary text-[20px] font-primary_font">
          Recipe Shared By:
        </p>
        <p className="text-bold text-[18px] font-primary_font text-primary_color mb-4">
          {recipe.recipe_owner}
        </p>
        <p className="font-bold text-[21px] font-primary_font text-red-400 mb-4">
          <span className="text-primary_color">Recipe Rating: </span>
          {recipe.recipe_rating}
        </p>

        {/*  Only show edit/delete if user is the owner */}

        {user?.uid === recipe.recipe_owner_uid && (
          <div className="mb-4">
            <button
              onClick={() => navigate(`/edit/${recipe.id}`)}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}

        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2.5 rounded-lg text-white text-[20px] bg-black font-medium cursor-pointer hover:bg-green-400"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default memo(RecipeDetails);