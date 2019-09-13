import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from 'immutability-helper'
import validate from "../validate";
import Screen from './Screen';

function Form({ seed }) {
  const [state, setState] = useState(seed);
  const valState = (myState, errcb) => {
    if (validate(myState)) {
      setState(myState);
      return true;
    } else {
      if (errcb) errcb();
      return false;
    }
  };

  const moveS = useCallback((hs, ds) => {
    const hoverS = state.screens[hs];
    const myState = update(state,
      { screens: { $splice: [[hs, 1], [ds, 0, hoverS]] } });
    return valState(myState,
      () => console.log('invalid screen move', hs, ds));
  });

  const moveQ = useCallback((hs, hq, ds, dq) => {
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
  });

  const addCrit = useCallback((c, s, q) => {
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
  });

  const delCrit = useCallback((c, s, q) => {
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
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="form">
        {state.screens.map((s, i) => (
          <Screen screen={s} key={s.id} si={i}
            moveS={moveS} moveQ={moveQ}
            addCrit={addCrit} delCrit={delCrit} />
        ))}
      </div>
    </DndProvider>
  );
}

export default Form;