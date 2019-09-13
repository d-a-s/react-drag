import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { types, debounce } from '../seed';
import Question from './Question';

function Screen({ screen, si, moveS, moveQ }) {
  const ref = useRef(null);
  const [, drag] = useDrag({
    item: { type: types.S, hsi: si },
  });
  const [, drop] = useDrop({
    accept: types.S,
    hover(item, monitor) {
      const { hsi } = item;
      if (!ref.current) { return; }
      if (hsi !== si && debounce(hsi, si)) {
        const success = moveS(hsi, si);
        if (success) { item.hsi = si; }
      }
    }
  });

  drag(drop(ref));
  return (
    <div ref={ref} className="screen">
      <h1>Screen {screen.id}</h1>
      <h3>{JSON.stringify(screen.criteria)}</h3>
      {screen.questions.map((q, i) => (
        <Question question={q} key={q.id} qi={i} si={si} moveQ={moveQ} />
      ))}
    </div>
  );
}

export default Screen;