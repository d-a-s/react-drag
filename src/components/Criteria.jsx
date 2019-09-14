import React from "react";
import { addCrit, delCrit } from '../tools/state';
import update, { useState } from '../tools/immutability';

function Criteria({ criteria, s, q }) {
  const [{ add, value }, mutState] = useState({ add: false, value: '' });
  return (
    <div className="crits">
      {criteria.map((c, i) => (<Criterion c={c} key={i} ci={i} s={s} q={q}
        delCrit={delCrit} />))}
      <div className="right">
        <EditForm {...{ value, mutState, s, q, add }}
          onOk={() => addCrit(value, s, q)}>
          <button>+</button>
        </EditForm>
      </div>
    </div>
  );
}

function Criterion({ c, ci, s, q, delCrit }) {
  return (
    <div className="crit" onClick={e => {
      console.log('delete', e, c, ci, s, q);
      delCrit(ci, s, q);
    }}>
      {c}
    </div>
  );
}

export default Criteria;

export function EditForm({ value, mutState, add, children, onOk }) {
  if (!add) return (<span
    onClick={() => mutState('add.$set.1')}>{children}</span>);
  return (<span>
    <input value={value}
      onChange={e => mutState(['value', '$set', e.target.value])} />
    <button onClick={() => {
      if (onOk()) { mutState('add.$set.'); }
    }}>ok</button>
    <button onClick={() => mutState('add.$set.')}>x</button>
  </span>);
}