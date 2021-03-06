import React, { useState, useEffect } from "react";
import MidiDataContext from "./MidiDataContext";
import { setUpMIDIAccess } from '../midi-utils/midi-utils';
import * as Constants from '../constants';

const MidiProvider = (props) => {
  const [keyData, setKeyData] = useState([{ note: null, velocity: null }]);
  const [errors, setErrors] = useState(null);
  const [pitch, setPitch] = useState(64);
  const [modulation, setModulation] = useState(0);
  const [ deviceName, setDeviceName ] = useState(null);

  const midiData = {
    deviceName,
    keyData,
    pitch,
    modulation,
    errors
  };

  const onMIDIMessage = (midiMessage) => {
    if(midiMessage.data.length > 1) {
      // console.log(midiMessage)
    }
    const event = midiMessage.data[Constants.EVENT_INDEX];
    const newLSB = midiMessage.data[Constants.LEAST_SIGNIFICANT_BYTE_INDEX];
    const newMSB = midiMessage.data[Constants.MOST_SIGNIFICANT_BYTE_INDEX];
    
    const newKeyData = {
      note: newLSB,
      velocity: newMSB
    };
    console.log(event, newLSB, newMSB)
    switch(event) {
      case Constants.NOTE_ON_EVENT:
        setKeyData(newKeyData);
        break;
      case Constants.PITCH_BEND_EVENT:
        setPitch(newMSB);
        break;
      case Constants.MODULATION_EVENT:
        setModulation(newMSB);
        break;
      default:
        return null;
    }
  }

  const onStateChange = (input) => {
    setKeyData([]);
    if(input.currentTarget.state === Constants.DISCONNECTED) {
      setDeviceName(null);
      setErrors(Constants.NO_DEVICE_ERROR);
    } else if (input.currentTarget.state === Constants.CONNECTED) {
      setDeviceName(input.currentTarget.name);
      setErrors(null);
    }
  }

  useEffect(() => {
    async function setUp() {
      console.log('before midisetup')
      const midiInput = await setUpMIDIAccess();
      console.log('after midisetup', midiInput)

      midiInput.onmidimessage = onMIDIMessage;
      midiInput.onstatechange = onStateChange;

      setErrors(midiInput.errors);
    }

    setUp();
  }, []);

  return(
    <MidiDataContext.Provider value={midiData}>
      {props.children}
    </MidiDataContext.Provider>
  );
};

export default MidiProvider;