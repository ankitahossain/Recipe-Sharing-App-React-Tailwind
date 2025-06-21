// src/pages/EditRecipe.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { ref, get, update } from "firebase/database";
import { db } from "../firebase/firebase config";
import { AuthContext } from "../context/AuthContext";
import {memo} from "react"

const EditRecipe = () => {
  const { id } = useParams(); // recipe id from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    recipe_name: "",
    recipe_description: "",
    recipe_ingredients: "",
    recipe_steps: "",
    recipe_image_url: "",
  });

  useEffect(() => {
    const recipeRef = ref(db, `recipes/${id}`);
    get(recipeRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.recipe_owner_uid === user?.uid) {
          setForm(data);
        } else {
          alert("You are not authorized to edit this recipe.");
          navigate("/home");
        }
      } else {
        alert("Recipe not found.");
        navigate("/home");
      }
    });
  }, [id, navigate, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const recipeRef = ref(db, `recipes/${id}`);
    update(recipeRef, form)
      .then(() => {
        alert("Recipe updated successfully!");
        navigate("/home");
      })
      .catch((err) => alert("Error updating recipe: " + err.message));
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input
          name="recipe_name"
          value={form.recipe_name}
          onChange={handleChange}
          placeholder="Recipe Name"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="recipe_description"
          value={form.recipe_description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="recipe_ingredients"
          value={form.recipe_ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="recipe_steps"
          value={form.recipe_steps}
          onChange={handleChange}
          placeholder="Steps"
          required
          className="border p-2 rounded"
        />
        <input
          name="recipe_image_url"
          value={form.recipe_image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default memo(EditRecipe);