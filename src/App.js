import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

// const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true; // recognition will continue even if the user pauses while speaking
recognition.interimResults = true;
recognition.lang = 'en-GB';

function App() {
  const [interim, setInterim] = React.useState('');
  const [final, setFinal] = React.useState('');
  const handleOnstart = () => {
    console.log('recognition.onstart()');
  };
  const handleOnerror = (event) => {
    console.log('recognition.onerror(event)', event);
    if (event.error === 'no-speech') {}
    if (event.error === 'audio-capture') {}
    if (event.error === 'not-allowed') {}
  };
  const handleOnend = () => {
    console.log('recognition.onend()');
  };
  const handleOnresult = (event) => {
    console.log('recognition.onresult(event)', event);
    setInterim('');
    console.log('event.results.length', event.results.length);
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      console.log('interim', interim);
      console.log('final', final);
      console.log('event.results[i].length', event.results[i].length);
      console.log('event.results[i][0].transcript', event.results[i][0].transcript);
      if (event.results[i].length > 1) {
        console.log('event.results[i][1].transcript', event.results[i][1].transcript);
      }
      if (event.results[i].isFinal) {
        setFinal(`${final}${event.results[i][0].transcript}`);
      } else {
        setInterim(`${interim}${event.results[i][0].transcript}`);
      }
    }
  };
  React.useEffect(() => {
    recognition.onstart = handleOnstart;
    recognition.onerror = handleOnerror;
    recognition.onend = handleOnend;
    recognition.onresult = handleOnresult;
    // recognition.addEventListener('onstart', handleOnstart);
    // recognition.addEventListener('onerror', handleOnerror);
    // recognition.addEventListener('onend', handleOnend);
    // recognition.addEventListener('onresult', handleOnresult);
    return () => {
      recognition.onstart = () => {};
      recognition.onerror = () => {};
      recognition.onend = () => {};
      recognition.onresult = () => {};
      // recognition.removeEventListener('onstart', handleOnstart);
      // recognition.removeEventListener('onerror', handleOnerror);
      // recognition.removeEventListener('onend', handleOnend);
      // recognition.removeEventListener('onresult', handleOnresult);
    };
  }, []);
  return (
    <div className="App">
      <div>
        {final && <span className="App-final">{final}</span>}{' '}
        {interim && <span className="App-interim">{interim}</span>}
      </div>
      <button type="button" className="btn btn-primary"
        onClick={() => {
          console.log('onClick()');
        }}
        onContextMenu={() => {
          console.log('onContextMenu()');
        }}
        onDoubleClick={() => {
          console.log('onDoubleClick()');
        }}
        onDrag={() => {
          console.log('onDrag()');
        }}
        onDragEnd={() => {
          console.log('onDragEnd()');
        }}
        onDragEnter={() => {
          console.log('onDragEnter()');
        }}
        onDragExit={() => {
          console.log('onDragExit()');
        }}
        onDragLeave={() => {
          console.log('onDragLeave()');
          recognition.stop();
        }}
        onDragOver={() => {
          console.log('onDragOver()');
        }}
        onDragStart={() => {
          console.log('onDragStart()');
        }}
        onDrop={() => {
          console.log('onDrop()');
        }}
        onMouseDown={() => {
          console.log('onMouseDown()');
          recognition.stop();
          recognition.start();
        }}
        onMouseEnter={() => {
          console.log('onMouseEnter()');
        }}
        onMouseLeave={() => {
          console.log('onMouseLeave()');
        }}
        onMouseMove={() => {
          console.log('onMouseMove()');
        }}
        onMouseOut={() => {
          console.log('onMouseOut()');
        }}
        onMouseOver={() => {
          console.log('onMouseOver()');
        }}
        onMouseUp={() => {
          console.log('onMouseUp()');
          recognition.stop();
        }}
      >
        Hold to speak <FontAwesomeIcon icon={faMicrophone} />
      </button>
    </div>
  );
}

export default App;
