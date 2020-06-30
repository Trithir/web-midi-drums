import React, { useContext } from 'react';
import { MidiDataContext } from 'web-midi-hooks';
import { 
  Kick,
  Snare,
  HiHatClosed,
  HiHatOpen,
  Tom1,
  Tom2,
  Tom3
 } from "./drumClasses";
import * as Constants from '../constants';
import "../styles/drums.css";

const kick = new Kick();
const snare = new Snare();
const hiHatClosed = new HiHatClosed();
const hiHatOpen = new HiHatOpen();
const tom1 = new Tom1();
const tom2 = new Tom2();
const tom3 = new Tom3();

const handleHit = hit => {
  switch(hit.note) {
    case Constants.KICK:
      kick.handleHit();
      break;
    case Constants.SNARE:
      snare.handleHit();
      break;
    case Constants.TOM_1:
      tom1.handleHit();
      break;
    case Constants.TOM_2:
      tom2.handleHit();
      break;
    case Constants.TOM_3:
      tom3.handleHit();
      break;
    case Constants.HI_HAT_CLOSED:
      hiHatClosed.handleHit();
      break;
    case Constants.HI_HAT_OPEN:
      hiHatOpen.handleHit();
      break;
    default:
      break;
  }
};

const Drums = () => {
  const { keyData } = useContext(MidiDataContext);

  keyData.forEach(hit => {
    handleHit(hit);
  });

  return (
    <div className="visualizer">
      <div>{kick.hitArray}</div>
      <div>{snare.hitArray}</div>
      <div>{tom1.hitArray}</div>
      <div>{tom1.hitArray}</div>
      <div>{tom2.hitArray}</div>
      <div>{tom3.hitArray}</div>
      <div>{hiHatClosed.hitArray}</div>
      <div>{hiHatOpen.hitArray}</div>
    </div>
  );
};

export default Drums;
