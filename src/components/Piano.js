import React, {
    useState
} from 'react';
import {
    Key
} from './Key.js'
import './Piano.css'
import {
    notes,
    VALID_KEYS,
    SONGS,
    POSITIONS,
    instruments
} from '../global/constants.js'

export function Piano(props) {

    // Set song keys
    const setSongKeys = (octaves) => {
        let tempNOTE_TO_KEY = {};
        let tempKEY_TO_NOTE = {};
        let tempNOTE_TO_POSITION = {};
        let tempNOTES;
        tempNOTES = (
        notes.map((note, index) => note+octaves[0])
        )
        tempNOTES = tempNOTES.concat(
            notes.map((note, index) => note+octaves[1])
        )
        
        for (var i = 0; i < VALID_KEYS.length; i++) {
            tempKEY_TO_NOTE[VALID_KEYS[i]]=tempNOTES[i];
            tempNOTE_TO_KEY[tempNOTES[i]]=VALID_KEYS[i];
            tempNOTE_TO_POSITION[tempNOTES[i]]=POSITIONS[i];
        }
         
        return [tempKEY_TO_NOTE, tempNOTE_TO_KEY, tempNOTE_TO_POSITION, tempNOTES]
    }

    
    // State variables 
    const [instrument, setInstrument] = useState('accordion')
    const [songTitle, _setSongTitle] = useState("doremi");
    
    const [initKEY_TO_NOTE,initNOTE_TO_KEY, initNOTE_TO_POSITION, initNOTES] = setSongKeys(SONGS[songTitle][0]);
    
    const [NOTE_TO_KEY, setNOTE_TO_KEY] = useState(initNOTE_TO_KEY);
    const [KEY_TO_NOTE, setKEY_TO_NOTE] = useState(initKEY_TO_NOTE);
    const [NOTES, setNOTES] = useState(initNOTES);
    const [NOTE_TO_POSITION, setNOTE_TO_POSITION] = useState(initNOTE_TO_POSITION);
        
    const [pressedKeys, setPressedKeys] = useState([]);

    const [musicIndex, _setMusicIndex] = useState(0);

    const musicIndexRef = React.useRef(musicIndex);
    const setMusicIndex = data => {
        musicIndexRef.current = data;
        _setMusicIndex(data);
    }

    const songTitleRef = React.useRef(songTitle);
    const setSongTitle = data => {
        songTitleRef.current = data;
        _setSongTitle(data);
        setMusicIndex(0);
        
        let keyVariables = setSongKeys(SONGS[data][0]);
        setNOTE_TO_KEY(keyVariables[1]);
        setKEY_TO_NOTE(keyVariables[0]);
        setNOTES(keyVariables[3]);
        setNOTE_TO_POSITION(keyVariables[2]);
        
    }

    // Play note helper function
    const playNote = (note) => {
        var sounds = document.getElementsByTagName('audio');
        for(var i=0; i<sounds.length; i++) {
            sounds[i].pause();
            sounds[i].currentTime=0;
        }
        document.getElementById(note).play()
    }

    // Event listeners
    const handleKeyDown = (event) => {
        if (event.repeat) {
            return;
        }
        const key = event.key;
        if (!pressedKeys.includes(KEY_TO_NOTE[key]) && VALID_KEYS.includes(key)) {
            setPressedKeys((prevPressedKeys) => ([KEY_TO_NOTE[key], ...prevPressedKeys]));

            if (KEY_TO_NOTE[key] == SONGS[songTitleRef.current][1][musicIndexRef.current]) {
                playNote(KEY_TO_NOTE[key]);
                let newMusicIndex = musicIndexRef.current + 1;

                if (newMusicIndex >= SONGS[songTitleRef.current][1].length) {
                    newMusicIndex = 0;
                }
                setMusicIndex(newMusicIndex);
                console.log(musicIndexRef.current)
                console.log(SONGS[songTitleRef.current][1])
                console.log(songTitleRef.current)
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

            }
            if (event.target.attributes.note.value == SONGS[songTitleRef.current][1][musicIndexRef.current]) {
                playNote(key);
                let newMusicIndex = musicIndexRef.current + 1;
                if (newMusicIndex >= SONGS[songTitleRef.current][1].length) {
                    newMusicIndex = 0;
                }
                setMusicIndex(newMusicIndex);
                console.log(musicIndexRef.current)
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
    }, [songTitle]);

    // Keys to render
    const keys = NOTES.map((note, index) => {
        return (
            <Key
                key={index}
                note={note}
                pressedKeys={pressedKeys}
                nextNote = {SONGS[songTitle][1][musicIndex]}
            />
        );
    });

    // Audio files
    const audioFiles = NOTES.map((note, index) => {
        return (
            <audio
                id={note}
                key={index} src={'../../sounds/' + instruments[instrument] + '/' + note + '.mp3'} />
        );
    });
    
    // Songs to render
    const songs = Object.keys(SONGS).map((song_name, index) => {
        return (
            <button className={(songTitle == song_name) ? "selected" : ""} key={index} onClick={() => setSongTitle(song_name)}>
                {song_name}
            </button>
        );
    });

    // Instruments to render
    const instruments_list = Object.keys(instruments).map((instrument_name, index) => {
        return (
            <option value={instrument_name} key={index}>
                {instrument_name}
            </option>
        );
    });


    return (
        <div>
            <div>
                <select className="select" name="instruments" id="instruments" onChange={(event) => setInstrument(event.target.value)}>
                    {instruments_list}
                </select>
            </div>
        <div className="options">
              {songs}
        </div>
            <div className="piano">
                <svg id="hand" height="200" viewBox="0 0 595.276 841.89" style={{left:(32*NOTE_TO_POSITION[SONGS[songTitle][1][musicIndex]]-17.5), top:((SONGS[songTitle][1][musicIndex].length>2) ? 150 : 260) }}>
                    <path id="path2991" d="m222.13 664.1h193.5v-35.852l0.028-2.697 0.086-2.695 0.14299-2.694 0.2-2.689 0.259-2.685 0.31401-2.679 0.372-2.671 0.428-2.663 0.485-2.653 0.542-2.642 0.59699-2.63 0.652-2.617 0.70801-2.602 0.764-2.587 0.819-2.57 0.873-2.552 0.927-2.532 0.981-2.513 1.033-2.491 1.087-2.468 1.139-2.445 1.192-2.42 1.241-2.394 1.292-2.367 1.342-2.339 1.392-2.31 1.442-2.28 1.489-2.249 1.535-2.217 1.667-2.403 1.617-2.436 1.566-2.469 1.516-2.501 1.463-2.532 1.412-2.561 1.358-2.589 1.305-2.617 1.251-2.644 1.196-2.668 1.142-2.692 1.084-2.716 1.031-2.737 0.972-2.757 0.917-2.777 0.858-2.795 0.802-2.813 0.74201-2.828 0.68599-2.843 0.625-2.856 0.56901-2.869 0.50799-2.879 0.44901-2.89 0.39-2.898 0.32999-2.905 0.269-2.912 0.21-2.917 0.15-2.92 0.091-2.923 0.03-2.924v-166.84l-0.029-1.427-0.086-1.424-0.144-1.42-0.2-1.413-0.257-1.403-0.313-1.392-0.371-1.379-0.424-1.362-0.478-1.345-0.534-1.323-0.586-1.302-0.637-1.276-0.689-1.25-0.737-1.222-0.788-1.19-0.834-1.158-0.879-1.123-0.925-1.087-0.968-1.049-1.008-1.009-1.05-0.968-1.087-0.924-1.124-0.88-1.157-0.835-1.191-0.786-1.22-0.739-1.25-0.688-1.277-0.638-1.302-0.585-1.324-0.533-1.344-0.479-1.362-0.425-1.379-0.369-1.391-0.314-1.404-0.257-1.414-0.2-1.419-0.144-1.425-0.086-1.427-0.029-1.426 0.029-1.425 0.086-1.419 0.144-1.412 0.2-1.405 0.257-1.392 0.314-1.379 0.369-1.362 0.425-1.343 0.479-1.325 0.533-1.302 0.585-1.276 0.638-1.249 0.688-1.222 0.739-1.19 0.786-1.158 0.835-1.123 0.88-1.088 0.924-1.048 0.968-1.01 1.009-0.968 1.049-0.924 1.087-0.88 1.123-0.835 1.158-0.785 1.19-0.74 1.222-0.688 1.25-0.637 1.276-0.586 1.302-0.532 1.323-0.479 1.345-0.426 1.362-0.368 1.379-0.315 1.392-0.257 1.403-0.199 1.413-0.144 1.42-0.087 1.424-0.029 1.427v-30.3l-0.028-1.431-0.087-1.43-0.144-1.425-0.201-1.418-0.258-1.409-0.315-1.397-0.371-1.383-0.426-1.368-0.481-1.349-0.533-1.329-0.589-1.306-0.64-1.281-0.69-1.254-0.741-1.226-0.79-1.195-0.838-1.162-0.883-1.127-0.928-1.091-0.97-1.053-1.014-1.013-1.053-0.971-1.09-0.928-1.127-0.88301-1.163-0.83699-1.194-0.79-1.226-0.74101-1.255-0.691-1.282-0.63999-1.306-0.588-1.328-0.534-1.349-0.481-1.368-0.426-1.383-0.371-1.397-0.315-1.409-0.258-1.418-0.201-1.424-0.144-1.431-0.087-1.432-0.028-1.431 0.028-1.43 0.087-1.425 0.144-1.418 0.201-1.409 0.258-1.397 0.315-1.384 0.371-1.367 0.426-1.349 0.481-1.328 0.534-1.307 0.588-1.281 0.63999-1.255 0.691-1.225 0.74101-1.194 0.79-1.163 0.83699-1.128 0.88301-1.091 0.928-1.052 0.971-1.013 1.013-0.971 1.053-0.928 1.091-0.883 1.127-0.837 1.162-0.79 1.195-0.741 1.226-0.69 1.254-0.64 1.281-0.589 1.306-0.535 1.329-0.479 1.349-0.428 1.368-0.37 1.383-0.315 1.397-0.257 1.409-0.201 1.418-0.144 1.425-0.087 1.43-0.03 1.431v-13.561l-0.027-1.432-0.087-1.429-0.144-1.425-0.201-1.419-0.258-1.408-0.316-1.397-0.371-1.384-0.425-1.367-0.481-1.349-0.535-1.329-0.587-1.306-0.64-1.281-0.692-1.255-0.741-1.226-0.79-1.194-0.837-1.162-0.883-1.128-0.927-1.091-0.972-1.053-1.013-1.012-1.052-0.971-1.091-0.928-1.128-0.88399-1.161-0.837-1.196-0.79-1.226-0.74-1.254-0.691-1.281-0.64-1.305-0.588-1.33-0.535-1.349-0.481-1.368-0.426-1.382-0.37-1.398-0.315-1.408-0.258-1.419-0.202-1.425-0.144-1.43-0.086-1.431-0.029-1.432 0.029-1.429 0.086-1.425 0.144-1.419 0.202-1.408 0.258-1.398 0.315-1.382 0.37-1.368 0.426-1.349 0.481-1.329 0.535-1.306 0.588-1.281 0.64-1.254 0.691-1.226 0.74-1.195 0.79-1.162 0.837-1.127 0.88399-1.091 0.928-1.053 0.971-1.013 1.012-0.971 1.053-0.928 1.091-0.883 1.128-0.837 1.162-0.79 1.194-0.741 1.226-0.691 1.255-0.64 1.281-0.588 1.306-0.534 1.329-0.481 1.349-0.426 1.367-0.37099 1.384-0.315 1.397-0.258 1.408-0.201 1.419-0.14401 1.425-0.087 1.429-0.028 1.432v-110.19l-0.029-1.426-0.086-1.425-0.144-1.42-0.2-1.413-0.257-1.403-0.314-1.392-0.369-1.379-0.425-1.362-0.479-1.344-0.533-1.324-0.585-1.302-0.638-1.276-0.689-1.25-0.738-1.221-0.787-1.191-0.834-1.158-0.88-1.123-0.924-1.087-0.968-1.049-1.009-1.009-1.049-0.968-1.087-0.924-1.123-0.88-1.158-0.835-1.191-0.786-1.221-0.739-1.25-0.688-1.277-0.638-1.301-0.585-1.324-0.533-1.344-0.479-1.362-0.425-1.379-0.369-1.392-0.314-1.404-0.257-1.412-0.2-1.42-0.144-1.425-0.086-1.426-0.029-1.427 0.029-1.425 0.086-1.419 0.144-1.413 0.2-1.404 0.257-1.392 0.314-1.379 0.369-1.362 0.425-1.344 0.479-1.324 0.533-1.301 0.585-1.277 0.638-1.25 0.688-1.221 0.739-1.191 0.786-1.158 0.835-1.123 0.88-1.087 0.924-1.049 0.968-1.009 1.009-0.967 1.049-0.925 1.087-0.88 1.123-0.834 1.158-0.787 1.191-0.738 1.221-0.689 1.25-0.637 1.276-0.586 1.302-0.533 1.324-0.479 1.344-0.425 1.362-0.369 1.379-0.313 1.392-0.258 1.403-0.2 1.413-0.144 1.42-0.086 1.425-0.029 1.426v211.35l-0.832-1.804-0.885-1.778-0.938-1.752-0.989-1.722-1.04-1.693-1.09-1.661-1.139-1.628-1.186-1.594-1.233-1.557-1.279-1.521-1.323-1.482-1.367-1.442-1.408-1.4-1.45-1.359-1.489-1.314-1.528-1.27-1.565-1.225-1.6-1.177-1.635-1.129-1.667-1.08-1.698-1.031-1.729-0.979-1.756-0.928-1.784-0.875-1.808-0.822-1.833-0.768-1.854-0.714-1.874-0.658-1.893-0.60199-1.911-0.54501-1.925-0.48899-1.939-0.43201-1.952-0.374-1.961-0.315-1.97-0.258-1.976-0.199-1.982-0.14-1.985-0.081-1.987-0.023-1.986 0.036-1.984 0.096-1.981 0.154-1.975 0.213-1.409 0.201-1.399 0.258-1.388 0.314-1.374 0.368-1.358 0.424-1.34 0.477-1.321 0.531-1.297 0.583-1.274 0.635-1.247 0.685-1.219 0.734-1.188 0.782-1.156 0.83-1.122 0.875-1.086 0.919-1.049 0.962-1.009 1.003-0.968 1.042-0.926 1.081-0.881 1.116-0.837 1.151-0.789 1.184-0.742 1.214-0.693 1.243-0.642 1.27-0.591 1.294-0.53899 1.317-0.485 1.337-0.432 1.356-0.377 1.372-0.322 1.386-0.266 1.397-0.211 1.408-0.153 1.414-0.097 1.419-0.04 1.423 0.016 1.422 0.074 1.421 0.13 1.417 0.188 1.411 0.243 1.401 0.299 1.391 0.355 1.378 0.409 1.363 0.464 1.345 0.517 1.326 0.56899 1.303 0.622 1.28 0.672 1.254 0.721 1.227 0.77 1.196 0.818 1.165 0.863 1.131 0.908 1.095 0.951 1.058 0.992 1.02 1.033 0.979 1.071 0.937 1.107 0.893 1.143 0.848 1.175 0.802 1.206 0.754 1.236 0.706 1.263 0.655 1.288 0.604 1.311 0.553 1.333 0.499 1.507 0.563 1.485 0.618 1.461 0.674 1.435 0.728 1.407 0.78 1.377 0.833 1.344 0.884 1.311 0.933 1.275 0.981 1.237 1.028 1.199 1.074 1.157 1.118 1.115 1.16 1.07 1.201 1.025 1.24 0.978 1.278 0.93 1.313 0.88 1.347 0.829 1.378 0.777 1.409 0.724 1.437 0.67 1.463 0.615 1.487 0.559 1.509 0.502 1.528 0.444 1.546 0.387 1.562 0.328 1.575 0.269 1.587 0.21 1.595 0.15 1.602 0.09 1.606 0.03 1.609v14.07l0.029 3.142 0.088 3.141 0.147 3.139 0.205 3.136 0.263 3.131 0.322 3.126 0.38 3.119 0.439 3.112 0.496 3.103 0.554 3.093 0.612 3.082 0.669 3.07 0.726 3.057 0.784 3.044 0.839 3.028 0.897 3.012 0.952 2.994 1.008 2.977 1.063 2.957 1.118 2.936 1.173 2.915 1.227 2.893 1.281 2.87 1.334 2.845 1.387 2.82 1.44 2.793 1.491 2.766 1.542 2.738 1.594 2.708 1.643 2.678 1.694 2.647 1.742 2.615 1.791 2.583 1.839 2.548 1.886 2.513 1.932 2.478 1.979 2.441 2.024 2.404 2.068 2.366 2.112 2.327 2.155 2.287 2.197 2.247 2.239 2.205 2.279 2.162 2.32 2.12 2.359 2.077 2.397 2.032 2.434 1.987 2.471 1.941 1.48 1.178 1.443 1.224 1.402 1.269 1.363 1.313 1.32 1.355 1.277 1.395 1.232 1.436 1.186 1.473 1.14 1.511 1.091 1.545 1.041 1.579 0.992 1.611 0.94 1.641 0.888 1.671 0.835 1.697 0.781 1.723 0.727 1.747 0.671 1.769 0.615 1.789 0.558 1.807 0.501 1.825 0.443 1.839 0.385 1.852 0.326 1.863 0.268 1.873 0.208 1.88 0.149 1.886 0.089 1.89 0.03 1.891v35.852z" style={{fill:"#eebb99"}} />
                    <path id="path2993" d="m438.99 554.9 1.667-2.403 1.617-2.436 1.566-2.469 1.516-2.501 1.463-2.532 1.412-2.561 1.358-2.589 1.305-2.617 1.251-2.644 1.196-2.668 1.142-2.692 1.084-2.716 1.031-2.737 0.972-2.757 0.917-2.777 0.858-2.795 0.802-2.813 0.742-2.828 0.686-2.843 0.625-2.856 0.569-2.869 0.508-2.879 0.449-2.89 0.39-2.898 0.33-2.905 0.269-2.912 0.21-2.917 0.15-2.92 0.091-2.923 0.03-2.924m-283.98-320.89v254.65m70.867-254.65v220.86m213.11-66.809v166.84m-70.867-197.14v97.109m-71.124-110.67v110.67m-190.08 74.715v-14.07m89.002 195.01v35.852m193.5-35.852v35.852m-163.54-512.37-0.029-1.426-0.086-1.425-0.144-1.42-0.2-1.413-0.257-1.403-0.314-1.392-0.369-1.379-0.425-1.362-0.479-1.344-0.533-1.324-0.585-1.302-0.638-1.276-0.689-1.25-0.738-1.221-0.787-1.191-0.834-1.158-0.88-1.123-0.924-1.087-0.968-1.049-1.009-1.009-1.049-0.968-1.087-0.924-1.123-0.88-1.158-0.835-1.191-0.786-1.221-0.739-1.25-0.688-1.277-0.638-1.301-0.585-1.324-0.533-1.344-0.479-1.362-0.425-1.379-0.369-1.392-0.314-1.404-0.257-1.412-0.2-1.42-0.144-1.425-0.086-1.426-0.029-1.427 0.029-1.425 0.086-1.419 0.144-1.413 0.2-1.404 0.257-1.392 0.314-1.379 0.369-1.362 0.425-1.344 0.479-1.324 0.533-1.301 0.585-1.277 0.638-1.25 0.688-1.221 0.739-1.191 0.786-1.158 0.835-1.123 0.88-1.087 0.924-1.049 0.968-1.009 1.009-0.96699 1.049-0.92501 1.087-0.88 1.123-0.834 1.158-0.787 1.191-0.738 1.221-0.689 1.25-0.637 1.276-0.586 1.302-0.533 1.324-0.479 1.344-0.425 1.362-0.369 1.379-0.313 1.392-0.258 1.403-0.2 1.413-0.144 1.42-0.086 1.425-0.029 1.426m17.532 428.98-2.471-1.941-2.434-1.987-2.397-2.032-2.359-2.077-2.32-2.12-2.279-2.162-2.239-2.205-2.197-2.247-2.155-2.287-2.112-2.327-2.068-2.366-2.024-2.404-1.979-2.441-1.932-2.478-1.886-2.513-1.839-2.548-1.791-2.583-1.742-2.615-1.694-2.647-1.643-2.678-1.594-2.708-1.542-2.738-1.491-2.766-1.44-2.793-1.387-2.82-1.334-2.845-1.281-2.87-1.227-2.893-1.173-2.915-1.118-2.936-1.063-2.957-1.008-2.977-0.952-2.994-0.897-3.012-0.839-3.028-0.78399-3.044-0.726-3.057-0.66901-3.07-0.612-3.082-0.554-3.093-0.496-3.103-0.439-3.112-0.38-3.119-0.322-3.126-0.263-3.131-0.205-3.136-0.147-3.139-0.088-3.141-0.029-3.142m-21.297-123.56-1.409 0.201-1.399 0.258-1.388 0.314-1.374 0.368-1.358 0.424-1.34 0.477-1.321 0.531-1.297 0.583-1.274 0.635-1.247 0.685-1.219 0.734-1.188 0.782-1.156 0.83-1.122 0.875-1.086 0.919-1.049 0.962-1.009 1.003-0.968 1.042-0.926 1.081-0.881 1.116-0.837 1.151-0.789 1.184-0.742 1.214-0.693 1.243-0.642 1.27-0.591 1.294-0.539 1.317-0.485 1.337-0.432 1.356-0.377 1.372-0.322 1.386-0.266 1.397-0.211 1.408-0.153 1.414-0.097 1.419-0.04 1.423 0.016 1.422 0.074 1.421 0.13 1.417 0.188 1.411 0.243 1.401 0.299 1.391 0.355 1.378 0.409 1.363 0.464 1.345 0.517 1.326 0.569 1.303 0.622 1.28 0.672 1.254 0.721 1.227 0.77 1.196 0.818 1.165 0.863 1.131 0.908 1.095 0.951 1.058 0.992 1.02 1.033 0.979 1.071 0.937 1.107 0.893 1.143 0.848 1.175 0.802 1.206 0.754 1.236 0.706 1.263 0.655 1.288 0.604 1.311 0.553 1.333 0.499m218.86-130.67-0.027-1.432-0.087-1.429-0.144-1.425-0.20101-1.419-0.25799-1.408-0.316-1.397-0.371-1.384-0.425-1.367-0.481-1.349-0.535-1.329-0.587-1.306-0.64-1.281-0.692-1.255-0.741-1.226-0.79-1.194-0.837-1.162-0.883-1.128-0.927-1.091-0.972-1.053-1.013-1.012-1.052-0.971-1.091-0.928-1.128-0.884-1.161-0.837-1.196-0.79-1.226-0.74-1.254-0.691-1.281-0.64-1.305-0.588-1.33-0.535-1.349-0.481-1.368-0.426-1.382-0.37-1.398-0.315-1.408-0.258-1.419-0.202-1.425-0.144-1.43-0.086-1.431-0.029-1.432 0.029-1.429 0.086-1.425 0.144-1.419 0.202-1.408 0.258-1.398 0.315-1.382 0.37-1.368 0.426-1.349 0.481-1.329 0.535-1.306 0.588-1.281 0.64-1.254 0.691-1.226 0.74-1.195 0.79-1.162 0.837-1.127 0.884-1.091 0.928-1.053 0.971-1.013 1.012-0.971 1.053-0.928 1.091-0.883 1.128-0.837 1.162-0.79 1.194-0.741 1.226-0.691 1.255-0.64 1.281-0.588 1.306-0.534 1.329-0.481 1.349-0.426 1.367-0.371 1.384-0.315 1.397-0.258 1.408-0.201 1.419-0.144 1.425-0.087 1.429-0.028 1.432m71.122 13.561 0.03-1.431 0.087-1.43 0.144-1.425 0.201-1.418 0.257-1.409 0.315-1.397 0.37-1.383 0.428-1.368 0.479-1.349 0.535-1.329 0.589-1.306 0.64-1.281 0.69-1.254 0.741-1.226 0.79-1.195 0.837-1.162 0.883-1.127 0.928-1.091 0.971-1.053 1.013-1.013 1.052-0.971 1.091-0.928 1.128-0.883 1.163-0.837 1.194-0.79 1.225-0.741 1.255-0.691 1.281-0.64 1.307-0.588 1.328-0.534 1.349-0.481 1.367-0.426 1.384-0.371 1.397-0.315 1.409-0.258 1.418-0.201 1.425-0.144 1.43-0.087 1.431-0.028 1.432 0.028 1.431 0.087 1.424 0.144 1.418 0.201 1.409 0.258 1.397 0.315 1.383 0.371 1.368 0.426 1.349 0.481 1.328 0.534 1.306 0.588 1.282 0.64 1.255 0.691 1.226 0.741 1.194 0.79 1.163 0.837 1.127 0.883 1.09 0.928 1.053 0.971 1.014 1.013 0.97 1.053 0.928 1.091 0.883 1.127 0.838 1.162 0.79 1.195 0.741 1.226 0.69 1.254 0.64 1.281 0.589 1.306 0.533 1.329 0.481 1.349 0.426 1.368 0.371 1.383 0.315 1.397 0.25799 1.409 0.20101 1.418 0.144 1.425 0.087 1.43 0.028 1.431m-261.2 157.75-0.03-1.609-0.09-1.606-0.15-1.602-0.21-1.595-0.269-1.587-0.328-1.575-0.387-1.562-0.444-1.546-0.502-1.528-0.559-1.509-0.615-1.487-0.67-1.463-0.724-1.437-0.77699-1.409-0.82901-1.378-0.88-1.347-0.93-1.313-0.978-1.278-1.025-1.24-1.07-1.201-1.115-1.16-1.157-1.118-1.199-1.074-1.237-1.028-1.275-0.981-1.311-0.933-1.344-0.884-1.377-0.833-1.407-0.78-1.435-0.728-1.461-0.674-1.485-0.618-1.507-0.563m7.48-68.839 1.975-0.213 1.981-0.154 1.984-0.096 1.986-0.036 1.987 0.023 1.985 0.081 1.982 0.14 1.976 0.199 1.97 0.258 1.961 0.315 1.952 0.374 1.939 0.432 1.925 0.489 1.911 0.545 1.893 0.602 1.874 0.658 1.854 0.714 1.833 0.768 1.808 0.822 1.784 0.875 1.756 0.928 1.729 0.979 1.698 1.031 1.667 1.08 1.635 1.129 1.6 1.177 1.565 1.225 1.528 1.27 1.489 1.314 1.45 1.359 1.408 1.4 1.367 1.442 1.323 1.482 1.279 1.521 1.233 1.557 1.186 1.594 1.139 1.628 1.09 1.661 1.04 1.693 0.989 1.722 0.938 1.752 0.885 1.778 0.832 1.804m40.913 265.17-0.03-1.891-0.089-1.89-0.149-1.886-0.208-1.88-0.268-1.873-0.326-1.863-0.385-1.852-0.443-1.839-0.501-1.825-0.558-1.807-0.615-1.789-0.671-1.769-0.727-1.747-0.781-1.723-0.835-1.697-0.888-1.671-0.94-1.641-0.992-1.611-1.041-1.579-1.091-1.545-1.14-1.511-1.186-1.473-1.232-1.436-1.277-1.395-1.32-1.355-1.363-1.313-1.402-1.269-1.443-1.224-1.48-1.178m216.88 47.532 0.028-2.697 0.086-2.695 0.143-2.694 0.2-2.689 0.259-2.685 0.314-2.679 0.372-2.671 0.428-2.663 0.485-2.653 0.542-2.642 0.597-2.63 0.652-2.617 0.708-2.602 0.764-2.587 0.819-2.57 0.873-2.552 0.927-2.532 0.981-2.513 1.033-2.491 1.087-2.468 1.139-2.445 1.192-2.42 1.241-2.394 1.292-2.367 1.342-2.339 1.392-2.31 1.442-2.28 1.489-2.249 1.535-2.217m-257.77-148.51-0.029 2.418-0.087 2.417-0.145 2.414-0.203 2.411-0.26 2.404-0.319 2.398-0.376 2.389-0.433 2.379-0.49 2.369-0.547 2.356-0.603 2.342-0.659 2.327-0.715 2.311-0.77 2.292-0.825 2.274-0.88 2.253l-0.893 2.286-0.839 2.305-0.786 2.325-0.731 2.342-0.677 2.359-0.621 2.374-0.566 2.388-0.51 2.4-0.455 2.411-0.398 2.422-0.341 2.43-0.285 2.437-0.228 2.443m227.78-169.27 0.029-1.427 0.087-1.424 0.144-1.42 0.199-1.413 0.257-1.403 0.315-1.392 0.368-1.379 0.426-1.362 0.479-1.345 0.532-1.323 0.586-1.302 0.637-1.276 0.688-1.25 0.74-1.222 0.785-1.19 0.835-1.158 0.88-1.123 0.924-1.087 0.968-1.049 1.01-1.009 1.048-0.968 1.088-0.924 1.123-0.88 1.158-0.835 1.19-0.786 1.222-0.739 1.249-0.688 1.276-0.638 1.302-0.585 1.325-0.533 1.343-0.479 1.362-0.425 1.379-0.369 1.392-0.314 1.405-0.257 1.412-0.2 1.419-0.144 1.425-0.086 1.426-0.029 1.427 0.029 1.425 0.086 1.419 0.144 1.414 0.2 1.404 0.257 1.391 0.314 1.379 0.369 1.362 0.425 1.344 0.479 1.324 0.533 1.302 0.585 1.277 0.638 1.25 0.688 1.22 0.739 1.191 0.786 1.157 0.835 1.124 0.88 1.087 0.924 1.05 0.968 1.008 1.009 0.968 1.049 0.925 1.087 0.879 1.123 0.83401 1.158 0.788 1.19 0.73699 1.222 0.68901 1.25 0.637 1.276 0.586 1.302 0.534 1.323 0.478 1.345 0.424 1.362 0.371 1.379 0.313 1.392 0.25699 1.403 0.20001 1.413 0.144 1.42 0.086 1.424 0.029 1.427" style={{strokeLinejoin:"round", stroke:"#000000", strokeLinecap:"round", strokeWidth: 9, fill:"none"}} />
        </svg>
                {keys}
            </div>
            <div>
                {audioFiles}
            </div>
        </div>
    );
}