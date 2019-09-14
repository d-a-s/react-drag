export default function validate(state) {
  const errs = [];
  const invalid = makeMap(state);
  for (let s of state.screens) {
    let loc = `Screen ${s.id}`;
    critCheck(s.criteria, invalid, loc, errs);
    for (let q of s.questions) {
      let loc2 = loc + `, Q ${q.id}`;
      critCheck(q.criteria, invalid, loc2, errs);
      if (invalid[q.id] === true) {
        invalid[q.id] = false;
      } else {
        errs.push(`${loc2} duplicate question. Each question should be unique.`);
      }
    }
  }
  return errs.join('\n');
}

function critCheck(criteria, invalid, loc, errs) {
  const eCrit = [];
  if (criteria && criteria.length) {
    for (let c of criteria) {
      if (invalid[c] === true) {
        eCrit.push(c);
      } else if (invalid[c] === undefined) {
        console.log(`${loc} criteria ${c} appears to be from outside form.`);
      }
    }
  }
  if (eCrit.length) {
    let msg = `${loc} invalid criteria. Question(s) ${JSON.stringify(eCrit)}`
      + ' must be asked before they can be used as criteria.';
    errs.push(msg);
  }
}

function makeMap(state) {
  const map = {};
  for (let s of state.screens) {
    for (let q of s.questions) {
      map[q.id] = true;
    }
  }
  return map;
}