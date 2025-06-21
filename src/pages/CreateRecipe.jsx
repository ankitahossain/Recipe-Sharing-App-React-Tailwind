import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router";
import { memo } from "react";
import { db, auth } from "../firebase/firebase config";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return alert("You must be logged in");

    try {
      const newRecipeRef = push(ref(db, "recipes"));
      await set(newRecipeRef, {
        recipe_name: title,
        recipe_description: description,
        recipe_image_url: imageUrl,
        recipe_ingredients: ingredients,
        recipe_instructions: instructions,
        recipe_owner_uid: user.uid,
        created_at: Date.now(),
      });

      navigate("/home");
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("Failed to save recipe");
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-6">Create New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
        <input
          type="text"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="w-full border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short Description"
          required
        />
        <input
          type="text"
          className="w-full border p-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (must start with https://)"
          required
        />
        <textarea
          className="w-full border p-2"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
          required
        />
        <textarea
          className="w-full border p-2"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default memo(CreateRecipe);