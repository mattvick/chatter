import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import { recognition } from './speechRecognition';

function App() {
  return (
    <div className="App">
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
