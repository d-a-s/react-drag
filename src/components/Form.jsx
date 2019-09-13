import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from 'immutability-helper'
import validate from "../validate";
import Screen from './Screen';

function Form({ seed }) {
  const [state, setState] = useState(seed);
  const moveS = useCallback((hs, ds) => {
    const hoverS = state.screens[hs];
    const myState = update(state,
      { screens: { $splice: [[hs, 1], [ds, 0, hoverS]] } });
    if (validate(myState)) {
      setState(myState);
      return true;
    } else {
      console.log('invalid screen move', hs, ds);
      return false;
    }
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
    if (validate(myState)) {
      setState(myState);
      return true;
    } else {
      console.log('invalid question move', hs, hq, ds, dq);
      return false;
    }
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="form">
        {state.screens.map((s, i) => (
          <Screen screen={s} key={s.id} si={i} moveS={moveS} moveQ={moveQ} />
        ))}
      </div>
    </DndProvider>
  );
}

export default Form;