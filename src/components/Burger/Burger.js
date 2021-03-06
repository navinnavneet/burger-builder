import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
                                    .map(igKey => {
                                        return [ ...Array(props.ingredients[igKey]) ].map((_, index) => <BurgerIngredient key={igKey + index} type={igKey} />)
                                    }).reduce((arr, el) => arr.concat(el) , []);

    if(!transformedIngredients.length) {
        transformedIngredients = <p>Please, Start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;