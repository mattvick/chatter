import React, { useState } from 'react';
import { useSpeechRecognition } from '@mattvick/react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

import './App.scss';

const languageOptions = [
  { label: 'Cambodian', value: 'km-KH' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (AU)', value: 'en-AU' },
  { label: 'Farsi', value: 'fa-IR' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Italiano', value: 'it-IT' },
  { label: '普通话 (中国大陆) - Mandarin', value: 'zh' },
  { label: 'Portuguese', value: 'pt-BR' },
  { label: 'Español', value: 'es-MX' },
  { label: 'Svenska - Swedish', value: 'sv-SE' },
];

const App = () => {
  const [lang, setLang] = useState('en-GB');
  const [final, setFinal] = useState('');
  const [interim, setInterim] = useState('');
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    setFinal(prevState => `${prevState}${interim} `);
    setInterim('');
  };

  const onResult = (_, finalTranscript, interimTranscript) => {
    setInterim(interimTranscript);
    setFinal(prevState => `${prevState}${finalTranscript}`);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({
          continuous: true,
          nonStop: false,
          lang,
        });
      };

  return (
    <div className="App container">
      <div className="row justify-content-md-center">
        <div className="col-sm">
          <form id="speech-recognition-form">
            <h2>Speech Recognition</h2>
            {!supported && (
              <p>
                Oh no, it looks like your browser doesn&#39;t support Speech
                Recognition.
              </p>
            )}
            {supported && (
              <React.Fragment>
                <p>
                  {`Click 'Listen' and start speaking.
                  Speech recognition will generate a transcript of what you say.`}
                </p>
                <div className="form-group">
                  <select
                    form="speech-recognition-form"
                    id="lang"
                    className="form-control custom-select"
                    value={lang}
                    onChange={changeLang}
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="transcript">
                  {final && <span className="final">{final}</span>}
                  {interim && <span className="interim">{interim}</span>}
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={blocked}
                  onClick={toggle}
                >
                  {listening ? 'Stop' : (<React.Fragment>Listen <FontAwesomeIcon icon={faMicrophone} /></React.Fragment>)}
                </button>
                {blocked && (
                  <p style={{ color: 'red' }}>
                    The microphone is blocked for this site in your browser.
                  </p>
                )}
              </React.Fragment>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
