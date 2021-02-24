import './App.css';
import {Piano} from './components/Piano.js'

function App() {
  return (
    <div className="App">
        <div id="welcome">
            <div className="vertical-center">
                <img src="http://courses.pianovideolessons.com/wp-content/uploads/2019/06/piano-300x242.png"/>
                <h1>Welcome to the piano follow along game!</h1>
                <button onClick={() => document.getElementById("welcome").hidden=true}>Begin playing!</button>
            </div>
        </div>
      <header className="App-header">
        <Piano />
      </header>
    </div>
  );
}

export default App;