import React, { useState } from "react";
import { addCrit, delCrit } from '../tools/state';

function Criteria({ criteria, s, q }) {
  const [{ add, value }, setState] = useState({ add: false, value: '' });
  const addBtn = (
    <button onClick={() => setState({ add: !add })}>[+]</button>
  );
  const addForm = (
    <span>
      <input value={value}
        onChange={e => setState({ add: true, value: e.target.value })} />
      <button onClick={() => {
        addCrit(parseInt(value), s, q)
        setState({ add: false });
      }}>add</button>
      <button onClick={() => setState({ add: !add })}>[x]</button>
    </span>
  );
  return (
    <div className="crits">
      {criteria.map((c, i) => (<Criterion c={c} key={i} ci={i} s={s} q={q}
        delCrit={delCrit} />))}
      <div className="right">{add ? addForm : addBtn}</div>
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