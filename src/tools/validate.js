export default function validate(state) {
  const valid = [];
  for (let s of state.screens) {
    if (!critCheck(s.criteria, valid, [s.id])) { return false; }
    for (let q of s.questions) {
      if (!critCheck(q.criteria, valid, [s.id, q.id])) { return false; }
      valid.push(q.id);
    }
  }
  return true;
}

function critCheck(criteria, valid, loc) {
  const invalid = [];
  if (criteria) {
    for (let c of criteria) {
      if (!valid.find(v => c === v)) {
        invalid.push(c);
      }
    }
  }
  if (invalid.length) {
    console.log('invalid', loc, 'criteria', invalid,
      'questions must come before any questions/screens using them'
      + ' as a dependency');
    return false;
  }
  return true;
}