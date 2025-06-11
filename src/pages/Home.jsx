import React from 'react';
import { Link } from 'react-router';
import UserProfile from '../Components/UserProfile';
import recipe_1 from '../assets/images/Recipe-1.jpg';
import recipe_2 from '../assets/images/Recipe-2.jpg';
import recipe_3 from '../assets/images/Recipe-3.jpg';
import recipe_4 from '../assets/images/Recipe-4.jpg';
import recipe_5 from '../assets/images/Recipe-5.jpg';
import recipe_6 from '../assets/images/Recipe-6.jpg';
import recipe_7 from '../assets/images/Recipe-7.jpg';
import recipe_8 from '../assets/images/Recipe-8.jpg';
import recipe_9 from '../assets/images/Recipe-9.jpg';

const Home = () => {
  const cardInfo = [
    {
      id: 1,
      recipe_name: 'Caramel Apple Quesadilla',
      recipe_image: recipe_1,
      recipe_description: 'A delightful twist on the classic quesadilla, filled with caramelized apples and a hint of cinnamon.',
      ingredients: 'Tortilla, sliced apples, cinnamon, butter, cheese',
      recipe_owner: 'Chef Alex',
      recipe_rating: '4.5'
    },
    {
      id: 2,
      recipe_name: 'Fresh Berry Toast',
      recipe_image: recipe_2,
      recipe_description: 'Toasted bread layered with creamy spread, fresh berries, and a drizzle of honey.',
      ingredients: 'Bread, berries, honey, cream cheese',
      recipe_owner: 'Chef Emma',
      recipe_rating: '4.0'
    },
    {
      id: 3,
      recipe_name: 'Classic Cheese Pizza',
      recipe_image: recipe_3,
      recipe_description: 'Golden crust, rich tomato sauce, and a blanket of gooey mozzarella cheese.',
      ingredients: 'Pizza dough, tomato sauce, mozzarella cheese, olive oil, herbs',
      recipe_owner: 'Chef Marco',
      recipe_rating: '4.8'
    },
    {
      id: 4,
      recipe_name: 'Garlic Prawn Spaghetti',
      recipe_image: recipe_4,
      recipe_description: 'Juicy prawns tossed with spaghetti in a fragrant garlic and olive oil sauce.',
      ingredients: 'Spaghetti, prawns, garlic, cherry tomatoes, olive oil, lemon zest, parsley',
      recipe_owner: 'Chef Mia',
      recipe_rating: '4.7'
    },
    {
      id: 5,
      recipe_name: 'Cherry Dessert Ravioli',
      recipe_image: recipe_5,
      recipe_description: 'Sweet ravioli filled with juicy cherries and dusted with powdered sugar.',
      ingredients: 'Ravioli dough, cherry filling, powdered sugar',
      recipe_owner: 'Chef Luca',
      recipe_rating: '4.2'
    },
    {
      id: 6,
      recipe_name: 'Chicken Amalfi',
      recipe_image: recipe_6,
      recipe_description: 'Tender chicken with a zesty lemon sauce, fresh herbs, and roasted veggies.',
      ingredients: 'Chicken breasts, lemon juice, garlic, herbs, olive oil, salt, pepper',
      recipe_owner: 'Chef Olivia',
      recipe_rating: '4.6'
    },
    {
      id: 7,
      recipe_name: 'Chocolate Glazed Donuts',
      recipe_image: recipe_7,
      recipe_description: 'Fluffy donuts dipped in smooth chocolate glaze, perfect for a sweet treat.',
      ingredients: 'Flour, sugar, cocoa powder, eggs, milk, butter, baking powder, chocolate glaze',
      recipe_owner: 'Chef Noah',
      recipe_rating: '4.9'
    },
    {
      id: 8,
      recipe_name: 'Berry Tart',
      recipe_image: recipe_8,
      recipe_description: 'A fresh tart brimming with blueberries and strawberries, lightly glazed for a burst of color.',
      ingredients: 'Tart crust, blueberries, strawberries, sugar, cornstarch, lemon juice',
      recipe_owner: 'Chef Ava',
      recipe_rating: '4.8'
    },
    {
      id: 9,
      recipe_name: 'Citrus Orange Cooler',
      recipe_image: recipe_9,
      recipe_description: 'A cool, refreshing drink with fresh orange juice and a hint of mint.',
      ingredients: 'Oranges, sugar, ice, mint leaves',
      recipe_owner: 'Chef Ethan',
      recipe_rating: '4.3'
    }
  ];

  return (
    <div>
      <UserProfile />
      <div className='flex flex-col items-center mt-10'>
        <h1 className="font-bold text-red-500 ml-[1%] mt-[5%] mb-[4%] text-[50px]">Recipes Shared</h1>
        <div className='CardWrapper flex flex-wrap justify-around gap-4'>
          {cardInfo.map((card) => (
            <div
              key={card.id}
              className='bg-white [box-shadow:0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl overflow-hidden mx-auto mt-4'
            >
              <div className='aspect-[3/2]'>
                <img
                  className='w-full h-full object-cover rounded-2xl'
                  src={card.recipe_image}
                  alt={card.recipe_name}
                />
              </div>

              <div className='p-6'>
                <h3 className='text-2xl text-slate-900 font-bold'>{card.recipe_name}</h3>
                <p className='text-slate-700 mt-2'>{card.recipe_description}</p>

                <div className='mt-4 flex items-center justify-between'>
                  <span className='text-xl text-slate-900 font-bold'>{card.recipe_rating} ⭐</span>
                  <Link
                    to={`/recipe/${card.id}`}
                    state={{ recipe: card }}
                  >
                    <button
                      type="button"
                      className="w-[130px] h-[50px] bg-black hover:bg-primary_color text-white rounded-2xl cursor-pointer"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
