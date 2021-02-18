import React, { useState } from 'react';
import { Key } from './Key.js'
import './Piano.css'
import {
    NOTES,
    VALID_KEYS,
    KEY_TO_NOTE
} from '../global/constants.js'

export function Piano() {
    const song = ['c', 'd', 'e', 'f', 'f', 'f', 'c', 'd', 'c', 'd']
    
    // State variables
    const [pressedKeys, setPressedKeys] = useState([]);

    const [musicIndex, setMusicIndex] = useState(0);
    
    // Play note helper function
    const playNote = (note) => {
        const noteAudio = new Audio(document.getElementById(note).src);
        noteAudio.play();
    }

    // Event listeners
    const handleKeyDown = (event) => {
        if (event.repeat) {
            return;
        }
        const key = event.key;
        if (!pressedKeys.includes(KEY_TO_NOTE[key]) && VALID_KEYS.includes(key)) {
            setPressedKeys((prevPressedKeys) => ([KEY_TO_NOTE[key], ...prevPressedKeys]));
            playNote(KEY_TO_NOTE[key]);
                if (KEY_TO_NOTE[key] == song[musicIndex]){
            setMusicIndex( (prevMusicIndex) => (prevMusicIndex+1))
        }
        }
    };

    const handleKeyUp = (event) => {
        const index = pressedKeys.indexOf(KEY_TO_NOTE[event.key]);
        //if (index > -1) {
        setPressedKeys((prevPressedKeys) => (prevPressedKeys.splice(index, 1)));
        //}

    }

    const handleMouseDown = (event) => {
        if (event.repeat) {
            return;
        }
        if (event.target.className.includes("key")) {
            const key = event.target.attributes.note.value;
            if (!pressedKeys.includes(key)) {
                setPressedKeys((prevPressedKeys) => ([key, ...prevPressedKeys]));
                playNote(key);
            }
                        if (event.target.attributes.note.value == song[musicIndex]){
            setMusicIndex( (prevMusicIndex) => (prevMusicIndex+1));
                            console.log(musicIndex)
        }
        }
    };

    const handleMouseUp = (event) => {
        if (event.target.className.includes("key")) {

            const index = pressedKeys.indexOf(event.target.attributes.note.value);
            //if (index > -1) {
            setPressedKeys((prevPressedKeys) => (prevPressedKeys.splice(index, 1)));
            //}
            

        }
    }

    // Set effect hook
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp); // cleanup this component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);


    // Keys to render
    const keys = NOTES.map((note, index) => {
        return (
            <Key
                key={index}
                note={note}
                pressedKeys={pressedKeys}
                nextNote = {song[musicIndex]}
            />
        );
    });


    // Audio files
    const audioFiles = NOTES.map((note, index) => {
        return (
            <audio
                id={note}
                key={index}
                src={'../../notes/' + note + '.mp3'}
            />
        );
    });


    return (
        <div>
            <div className="piano">
                {keys}
            </div>
            <div>
                {audioFiles}
            </div>
        </div>
    );
}