import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { types, debounce } from '../tools/seed';
import Criteria from './Criteria';
import { moveQ } from '../tools/state';

function Question({ question: q, qi, si }) {
  const ref = useRef(null);
  const [, drag] = useDrag({
    item: { type: types.Q, hqi: qi, hsi: si },
  });
  const [, drop] = useDrop({
    accept: types.Q,
    hover(item, monitor) {
      const { hqi, hsi } = item;
      if (!ref.current) { return; }
      if ((hsi !== si || hqi !== qi) && debounce(hsi, hqi, si, qi)) {
        const success = moveQ(hsi, hqi, si, qi);
        if (success) {
          item.hsi = si;
          item.hqi = qi;
        }
      }
    }
  });

  drag(drop(ref));
  return (
    <div ref={ref} className="question">
      <h1>Q {q.id}</h1>
      <Criteria criteria={q.criteria} s={si} q={qi} />
    </div>
  );
}

export default Question;