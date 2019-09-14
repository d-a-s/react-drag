import { useState, useCallback } from "react";
import update from 'immutability-helper'
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

const valState = (myState, errcb) => {
  if (validate(myState)) {
    setState(myState);
    return true;
  } else {
    if (errcb) errcb();
    return false;
  }
};

function fnMoveS(hs, ds) {
  const hoverS = state.screens[hs];
  const myState = update(state,
    { screens: { $splice: [[hs, 1], [ds, 0, hoverS]] } });
  return valState(myState,
    () => console.log('invalid screen move', hs, ds));
}

function fnMoveQ(hs, hq, ds, dq) {
  const hoverQ = state.screens[hs].questions[hq];
  let myState = null;
  if (hs === ds) {
    myState = update(state, {
      screens: {
        [hs]: { questions: { $splice: [[hq, 1], [dq, 0, hoverQ]] } }
      }
    });
  } else {
    myState = update(state, {
      screens: {
        [hs]: { questions: { $splice: [[hq, 1]] } },
        [ds]: { questions: { $splice: [[dq, 0, hoverQ]] } }
      }
    });
  }
  return valState(myState,
    () => console.log('invalid question move', hs, hq, ds, dq));
}

function fnAddCrit(c, s, q) {
  let myState = null;
  if (q) {
    myState = update(state, {
      screens: {
        [s]: {
          questions: { [q]: { criteria: { $push: [c] } } }
        }
      }
    });
  } else {
    myState = update(state, {
      screens: { [s]: { criteria: { $push: [c] } } }
    });
  }
  return valState(myState,
    () => console.log('invalid criteria add', s, q, c));
}

function fnDelCrit(c, s, q) {
  let myState = null;
  if (q) {
    myState = update(state, {
      screens: {
        [s]: {
          questions: { [q]: { criteria: { $splice: [[c, 1]] } } }
        }
      }
    });
  } else {
    myState = update(state, {
      screens: { [s]: { criteria: { $splice: [[c, 1]] } } }
    });
  }
  setState(myState);
  return true;
}