import React, { useContext, useMemo } from 'react';
import MidiDataContext from '../context/MidiDataContext';
import { 
  Kick,
  Snare,
  HiHat,
  HiHatPedal,
  HiHatCl,
  Tom1,
  Tom2,
  Tom3,
  Tom3Rim,
  CrashLeft,
  CrashRight,
  Ride,
  SplashLeft,
  RideEdge
 } from "./drumClasses";
import * as Constants from '../constants';
import "../styles/drums.css";

const kick = new Kick();
const snare = new Snare();
const hiHat = new HiHat();
const hiHatPedal = new HiHatPedal();
const hiHatCl = new HiHatCl();
const tom1 = new Tom1();
const tom2 = new Tom2();
const tom3 = new Tom3();
const tom3Rim = new Tom3Rim();
const crashLeft = new CrashLeft();
const splashLeft = new SplashLeft();
const crashRight = new CrashRight();
const ride = new Ride();
const rideEdge = new RideEdge();

const handleHit = hit => {
  if (hit.velocity === 0) return 
  console.log('intheswitch')
  switch(hit.note) {
    case Constants.KICK:
      kick.handleHit(hit.velocity);
      break;
    case Constants.SNARE:
      snare.handleHit(hit.velocity);
      break;
    case Constants.TOM_1:
      tom1.handleHit(hit.velocity);
      break;
    case Constants.TOM_2:
      tom2.handleHit(hit.velocity);
      break;
    case Constants.TOM_3:
      tom3.handleHit(hit.velocity);
      break;
    case Constants.TOM_3_RIM:
      tom3Rim.handleHit(hit.velocity);
      break;
    case Constants.HI_HAT:
      hiHat.handleHit(hit.velocity);
      break;
    case Constants.HI_HAT_PEDAL:
      hiHatPedal.handleHit();
      break;
    case Constants.HI_HAT_CL:
      hiHatCl.handleHit(hit.velocity);
      break;
    case Constants.CRASH_LEFT:
      crashLeft.handleHit();
      break;
    case Constants.SPLASH_LEFT:
      splashLeft.handleHit();
      break;
    case Constants.CRASH_RIGHT:
      crashRight.handleHit();
      break;
    case Constants.RIDE:
      ride.handleHit(hit.velocity);
      break;
    case Constants.RIDE_EDGE:
      rideEdge.handleHit(hit.velocity);
      break;
    default:
      break;
  }
};

const Drums = () => {
  const { keyData } = useContext(MidiDataContext);

  useMemo(() => {
    if(keyData !== []) {
      handleHit(keyData);
    }
  }, [keyData]);


  return (
    <div className="visualizer">
      <div>{kick.hitArray}</div>
      <div>{snare.hitArray}</div>
      <div>{tom1.hitArray}</div>
      <div>{tom2.hitArray}</div>
      <div>{tom3.hitArray}</div>
      <div>{tom3Rim.hitArray}</div>
      <div>{hiHat.hitArray}</div>
      <div>{hiHatCl.hitArray}</div>
      <div>{ride.hitArray}</div>
      <div>{rideEdge.hitArray}</div>
      <div>{crashLeft.hitArray}</div>
      <div>{splashLeft.hitArray}</div>
      <div>{crashRight.hitArray}</div>
    </div>
  );
};

export default Drums;
