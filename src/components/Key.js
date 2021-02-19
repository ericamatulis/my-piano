import React from 'react';
import './Key.css'

export function Key(props){
    const noteIsFlat = (note) => {
        return note.length > 2;
    }
    
    const keyIsPressed = (note, pressedKeys) => {
        return pressedKeys.includes(note);
    }
    
    let keyClassName = "key";
    
    const isFlat = noteIsFlat(props.note);
    const isPressed = keyIsPressed(props.note, props.pressedKeys);
    
    if (isFlat) {
        keyClassName += " flat";
    }
    
    if (isPressed) {
        keyClassName += " pressed"
    }
    
    if (props.note == props.nextNote){
        keyClassName += " next"
    }
    
    let key;
    if (isFlat) {
        key = (
            <div className={keyClassName}  note={props.note}> </div>
        );
    } else {
        key = (
            <div className={keyClassName} note={props.note}>
                <div className="key-text">
                    {props.note.toUpperCase()}
                </div>   
            </div>
        );
    }

    return key;
}