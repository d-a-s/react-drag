import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { types, debounce } from '../tools/seed';
import Criteria, { EditForm } from './Criteria';
import { moveQ, editQ } from '../tools/state';
import { useState } from '../tools/immutability';

function Question({ question: q, qi, si }) {
  const [{ add, value }, mutState] = useState({ add: false, value: q.id });
  console.log(add, value);
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
      <h1>Q
        <EditForm {...{ add, value, mutState }}
          onOk={() => editQ(si, qi, value)}
        >{q.id}</EditForm></h1>
      <Criteria criteria={q.criteria} s={si} q={qi} />
    </div>
  );
}

export default Question;