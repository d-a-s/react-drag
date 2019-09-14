export default function validate(state) {
  const errs = [];
  const valid = [];
  for (let s of state.screens) {
    critCheck(s.criteria, valid, [s.id], errs);
    for (let q of s.questions) {
      critCheck(q.criteria, valid, [s.id, q.id], errs);
      valid.push(q.id);
    }
  }
  return errs.join('\n');
}

function critCheck(criteria, valid, loc, errs) {
  const invalid = [];
  if (criteria) {
    for (let c of criteria) {
      if (!valid.find(v => c === v)) {
        invalid.push(c);
      }
    }
  }
  if (invalid.length) {
    let sq = `scr ${loc[0]}` + (loc.length > 1 ? ` q ${loc[1]}` : '');
    console.log('sq', sq);
    let msg = `${sq} invalid criteria. Question(s) ${JSON.stringify(invalid)}`
      + ' must be asked before they can be used as criteria.';
    console.log('msg', msg);
    errs.push(msg);
  }
}