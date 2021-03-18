// let recognition
// if ('webkitSpeechRecognition' in window) {
//   recognition = new webkitSpeechRecognition();
// }
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const SpeechRecognition = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true; // recognition will continue even if the user pauses while speaking
recognition.interimResults = true;
recognition.lang = 'en-GB';

// var two_line = /\n\n/g;
// var one_line = /\n/g;
// function linebreak(s) {
//   return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
// }

// var first_char = /\S/;
// function capitalize(s) {
//   return s.replace(first_char, function(m) { return m.toUpperCase(); });
// }

// let recognising = false;
let ignoreOnend = false;
let finalTranscript = '';
// let startTimestamp;

recognition.onstart = function() {
  console.log('recognition.onstart()');

  // recognising = true;
  // showInfo('info_speak_now');
  // start_img.src = 'mic-animate.gif';
};

recognition.onerror = function(event) {
  console.log('recognition.onerror(event)', event);

  if (event.error === 'no-speech') {
    // start_img.src = 'mic.gif';
    // showInfo('info_no_speech');
    ignoreOnend = true;
  }
  if (event.error === 'audio-capture') {
    // start_img.src = 'mic.gif';
    // showInfo('info_no_microphone');
    ignoreOnend = true;
  }
  if (event.error === 'not-allowed') {
    // if (event.timeStamp - start_timestamp < 100) {
    //   showInfo('info_blocked');
    // } else {
    //   showInfo('info_denied');
    // }
    ignoreOnend = true;
  }
};

recognition.onend = function() {
  console.log('recognition.onend()');
  
  // recognising = false;
  if (ignoreOnend) {
    return;
  }
  // start_img.src = 'mic.gif';
  if (!finalTranscript) {
    // showInfo('info_start');
    return;
  }
  // showInfo('');
  // if (window.getSelection) {
  //   window.getSelection().removeAllRanges();
  //   var range = document.createRange();
  //   range.selectNode(document.getElementById('final_span'));
  //   window.getSelection().addRange(range);
  // }
  // if (create_email) {
  //   create_email = false;
  //   createEmail();
  // }
};

recognition.onresult = function(event) {
  console.log('recognition.onresult(event)', event);

  let interimTranscript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript;
    } else {
      interimTranscript += event.results[i][0].transcript;
    }
  }
  
  // finalTranscript = capitalize(finalTranscript);
  // final_span.innerHTML = linebreak(finalTranscript);
  // interim_span.innerHTML = linebreak(interimTranscript);
  if (finalTranscript || interimTranscript) {
    // showButtons('inline-block');
    console.log('finalTranscript', finalTranscript);
    console.log('interimTranscript', interimTranscript);
  }
};

export { recognition };
