// All state lives in localStorage under the key "dsa_prep_state"
const STATE_KEY = 'dsa_prep_state';

const State = (() => {
  let _s = null;

  function _default() {
    return {
      lastPattern: null,         // pattern id user was last viewing
      problems: {},              // { problemId: 'todo'|'attempted'|'solved' }
      selfChecks: {},            // { patternId: [true, false, ...] }
      notes: {}                  // { patternId: "string" }
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      _s = raw ? JSON.parse(raw) : _default();
    } catch {
      _s = _default();
    }
  }

  function save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(_s));
  }

  function get() { return _s; }

  function setLastPattern(id) {
    _s.lastPattern = id;
    save();
  }

  function setProblemStatus(problemId, status) {
    _s.problems[problemId] = status;
    save();
  }

  function getProblemStatus(problemId) {
    return _s.problems[problemId] || 'todo';
  }

  function setSelfCheck(patternId, index, checked) {
    if (!_s.selfChecks[patternId]) _s.selfChecks[patternId] = [];
    _s.selfChecks[patternId][index] = checked;
    save();
  }

  function getSelfChecks(patternId, total) {
    const arr = _s.selfChecks[patternId] || [];
    const result = [];
    for (let i = 0; i < total; i++) result.push(!!arr[i]);
    return result;
  }

  function setNote(patternId, text) {
    _s.notes[patternId] = text;
    save();
  }

  function getNote(patternId) {
    return _s.notes[patternId] || '';
  }

  // A pattern is "complete" when all self-check boxes are ticked
  // AND at least one problem in each tier is solved
  function isPatternComplete(patternId) {
    const p = PATTERNS[patternId];
    if (!p) return false;

    const checks = getSelfChecks(patternId, p.selfCheck.length);
    const allChecked = checks.every(Boolean);

    const tiers = ['warmup', 'core', 'stretch'];
    const allTiersSolved = tiers.every(tier => {
      const probs = p.problems[tier] || [];
      return probs.length === 0 || probs.some(prob => getProblemStatus(prob.id) === 'solved');
    });

    return allChecked && allTiersSolved;
  }

  // % of problems solved across a list of pattern ids
  function phaseProgress(patternIds) {
    let total = 0, solved = 0;
    patternIds.forEach(pid => {
      const p = PATTERNS[pid];
      if (!p) return;
      ['warmup','core','stretch'].forEach(tier => {
        (p.problems[tier] || []).forEach(prob => {
          total++;
          if (getProblemStatus(prob.id) === 'solved') solved++;
        });
      });
    });
    return total === 0 ? 0 : Math.round((solved / total) * 100);
  }

  function overallProgress() {
    const allPatternIds = PHASES.flatMap(ph => ph.patterns);
    return phaseProgress(allPatternIds);
  }

  function overallSolved() {
    let total = 0, solved = 0;
    PHASES.flatMap(ph => ph.patterns).forEach(pid => {
      const p = PATTERNS[pid];
      if (!p) return;
      ['warmup','core','stretch'].forEach(tier => {
        (p.problems[tier] || []).forEach(prob => {
          total++;
          if (getProblemStatus(prob.id) === 'solved') solved++;
        });
      });
    });
    return { total, solved };
  }

  return { load, get, setLastPattern, setProblemStatus, getProblemStatus, setSelfCheck, getSelfChecks, setNote, getNote, isPatternComplete, phaseProgress, overallProgress, overallSolved };
})();
