import React from 'react';
import classes from './Order.module.css';

const order = props => {

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, quantity: props.ingredients[ingredientName]});
    }

    const outputIngredients = ingredients.map(ingredient => {
        return <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ingredient.name}>{ingredient.name} ({ingredient.quantity})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {outputIngredients}</p>
            <p>Price: <strong>₹ {props.price}</strong></p>
        </div>
    )
}

export default order;