import { useState, useCallback } from "react";
import update from './immutability'
import validate from "./validate";

let state = null;
let setState = null;

export function useStore(seed) {
  [state, setState] = useState(seed);
  moveS = useCallback(fnMoveS);
  moveQ = useCallback(fnMoveQ);
  addCrit = useCallback(fnAddCrit);
  delCrit = useCallback(fnDelCrit);
  return state;
}

export let moveS;
export let moveQ;
export let addCrit;
export let delCrit;

const valState = (myState, title) => {
  let errVal = validate(myState);
  if (!errVal) {
    setState(update(myState, ['error', '$set', '']));
    return true;
  } else {
    errVal = `Aborted! ${title}\n${errVal}`;
    setState(update(state, ['error', '$set', errVal]));
    return false;
  }
};

function fnMoveS(hs, ds) {
  const hoverS = state.screens[hs];
  const myState = update(state,
    ['screens', '$splice', [[hs, 1], [ds, 0, hoverS]]]);
  return valState(myState, 'invalid screen move');
}

function fnMoveQ(hs, hq, ds, dq) {
  const hoverQ = state.screens[hs].questions[hq];
  let myState = update(state,
    ['screens', hs, 'questions', '$splice', [[hq, 1]]],
    ['screens', ds, 'questions', '$splice', [[dq, 0, hoverQ]]]);
  return valState(myState, 'invalid question move');
}

function fnAddCrit(c, s, q) {
  let myState = null;
  if (q) {
    myState = update(state,
      ['screens', s, 'questions', q, 'criteria', '$push', [c]]);
  } else {
    myState = update(state, ['screens', s, 'criteria', '$push', [c]]);
  }
  return valState(myState, 'invalid criteria add');
}

function fnDelCrit(c, s, q) {
  let myState = null;
  if (q) {
    myState = update(state,
      ['screens', s, 'questions', q, 'criteria', '$splice', [[c, 1]]]);
  } else {
    myState = update(state, ['screens', s, 'criteria', '$splice', [[c, 1]]]);
  }
  setState(myState);
  return true;
}