import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Screen from './Screen';
import { useStore } from '../tools/state';

function Form({ seed }) {
  const state = useStore(seed);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="form">
        {state.screens.map((s, i) => (
          <Screen screen={s} key={s.id} si={i} />
        ))}
      </div>
      {state.error ? (<div className='err'>{state.error}</div>) : null}
    </DndProvider>
  );
}

export default Form;