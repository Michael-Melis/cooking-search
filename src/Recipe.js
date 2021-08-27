import React from 'react'
import style from './recipe.module.css'//created module fo styling

const Recipe = ({ title, calories, image, ingredients }) => {//destructuring props 
    return (
        <div className={style.recipe}>{/**calling styling from module */}
            <h1>{title}</h1>
            <p>{calories}</p>
            <ol>
                {ingredients.map(ingredient => (
                    <li key={ingredient.foodId}>{ingredient.text}</li>
                ))}{/**maping thru ingredient in recipe array */}
            </ol>
            <img className={style.image} src={image} alt="" />
        </div>
    )

}
export default Recipe