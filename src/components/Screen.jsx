import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { types, debounce } from '../tools/seed';
import Question from './Question';
import Criteria from './Criteria';
import { moveS } from '../tools/state';

function Screen({ screen, si }) {
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
      <Criteria criteria={screen.criteria} s={si} />
      {screen.questions.map((q, i) => (
        <Question question={q} key={q.id} qi={i} si={si} />
      ))}
    </div>
  );
}

export default Screen;