import React from 'react';
import './styles/index.css';
import Drums from './components/Drums';
import MidiProvider from './context/MidiProvider';

export function MidiDrums() {
  return (
  <MidiProvider>
    <Drums />
  </MidiProvider>
 ) 
}