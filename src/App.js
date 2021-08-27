
import './App.css';
import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';


const App = () => {

  const APP_ID = "0738b095";
  const APP_KEY = "37b85d13b5291afa0f6a932eab04a46f";

  const [recipes, setRecipes] = useState([]);//fetching API and saving data in recipes
  const [search, setSearch] = useState("");//saving input by user in search button - every extra letter is change
  const [query, setQuery] = useState('chicken')// creating query to fetch only full searched text, not after every change(every extra letter)

  //function to fetch recipes from url submited by user in [], if no second atribute of function added, useEffect will be looping
  useEffect(() => {
    getRecipes();//function to get data from URL
  }, [query]);


  //using async function to fetch data from url
  const getRecipes = async () => {
    //using await to fetch some promise, need to be await, fetching from url
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //converting fetched data to JSON
    const data = await response.json();
    console.log(data.hits)
    //saving data to recipes
    setRecipes(data.hits)
  }
  //event function to listen change on input in search button
  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);//saving inputed data by user from search to query
    setSearch('');//making search button empty
  }


  return (
    <div className="mainApp">
      <div className="App">
        <form onSubmit={getSearch} className="search-form">{/**button after sending inputed data from function getSearch*/}
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />{/**value in search input is saved in search*/}
          <button className="search-button" type="submit">search</button> {/**button with type submit*/}
        </form>
        {/** mapping thru all recipes-1 recipe and calling object <Recipe/> key need to be uniqe for every item*/}
        <div className="recipes">
          {recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default App
