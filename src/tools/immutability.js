import { useState as useStateBase } from "react";
import baseUpdate from 'immutability-helper'

export default function update(state, ...args) {
  // console.log('update', state, args);
  const a2 = args.map(a => {
    if (typeof a === 'string') a = a.split('.');
    if (Array.isArray(a)) return toObj(a)
    else return a;
  });
  let myState = state;
  for (let a of a2) {
    // console.log(JSON.stringify(a, null, 2));
    myState = baseUpdate(myState, a);
  }
  return myState;
}

function toObj(arr) {
  const obj = {}; let o = obj;
  while (arr.length > 2) {
    const key = arr.shift();
    o[key] = {};
    o = o[key];
  }
  o[arr.shift()] = arr.shift();
  return obj;
}

export function useState(orig) {
  const [state, setStateBase] = useStateBase(orig);
  const setState = (...x) => setStateBase(update(state, ...x));
  return [state, setState];
}