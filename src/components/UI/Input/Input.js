import React from 'react';
import classes from './Input.module.css';

const input = props => {

    const assignedClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.isTouched) {
        assignedClasses.push(classes.Invalid);
    }

    let inputElement = null;
    switch(props.elementType) {
        case('input'): 
            inputElement = <input 
                                className={assignedClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed} />;
            break;
        case('select'): 
            inputElement = (
                            <select 
                                className={assignedClasses.join(' ')}  
                                value={props.value}
                                onChange={props.changed} >
                                    {props.elementConfig.options.map(option => {
                                        return (
                                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                                        );
                                    })}
                                </select>
            );
            break;
        case('textarea'): 
            inputElement = <textarea 
                                className={assignedClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed} />
            break;
        default:
            inputElement = <input 
                                className={assignedClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;