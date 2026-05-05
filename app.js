// ── Boot ──────────────────────────────────────────────────────────────────
State.load();

const $ = id => document.getElementById(id);
const viewDash    = $('view-dashboard');
const viewPattern = $('view-pattern');

// ── Routing ───────────────────────────────────────────────────────────────
function showDashboard() {
  viewDash.classList.add('active');
  viewPattern.classList.remove('active');
  renderDashboard();
  highlightSidebar(null);
  State.setLastPattern(null);
}

function showPattern(id) {
  viewDash.classList.remove('active');
  viewPattern.classList.add('active');
  renderPattern(id);
  highlightSidebar(id);
  State.setLastPattern(id);
  $('main').scrollTop = 0;
}

// ── Sidebar ───────────────────────────────────────────────────────────────
function buildSidebar() {
  const list = $('phase-list');
  list.innerHTML = '';

  PHASES.forEach(phase => {
    const group = document.createElement('div');
    group.className = 'phase-group';

    const label = document.createElement('div');
    label.className = 'phase-label';
    label.textContent = phase.title;
    group.appendChild(label);

    phase.patterns.forEach(pid => {
      const p = PATTERNS[pid];
      const name = p ? p.title : formatId(pid);
      const done = p ? State.isPatternComplete(pid) : false;
      const available = !!p;

      const item = document.createElement('div');
      item.className = 'pattern-item' + (done ? ' done' : '');
      item.dataset.id = pid;
      item.innerHTML = `<div class="pattern-dot"></div><span>${name}</span>`;

      if (available) {
        item.addEventListener('click', () => showPattern(pid));
      } else {
        item.style.opacity = '0.3';
        item.style.cursor = 'default';
      }

      group.appendChild(item);
    });

    list.appendChild(group);
  });
}

function highlightSidebar(activeId) {
  document.querySelectorAll('.pattern-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === activeId);
  });
}

function formatId(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ── Dashboard ─────────────────────────────────────────────────────────────
function renderDashboard() {
  const pct = State.overallProgress();
  const { total, solved } = State.overallSolved();

  viewDash.innerHTML = `
    <div class="dash-eyebrow">FAANG Prep · Java · 12 Weeks</div>
    <div class="dash-title">DSA Patterns</div>
    <div class="dash-sub">Pattern-first learning. ${solved} of ${total} problems solved.</div>

    <div class="overall-row">
      <span class="overall-label">Overall progress</span>
      <span class="overall-stat"><strong>${pct}%</strong></span>
    </div>
    <div class="bar-track">
      <div class="bar-fill ${pct > 0 ? 'accent' : ''}" style="width:${pct}%"></div>
    </div>

    <div class="dash-section-title">Phases</div>
    <div class="phase-list-dash">
      ${PHASES.map(ph => renderPhaseRow(ph)).join('')}
    </div>

    <div class="dash-section-title">Weekly Rhythm</div>
    <div class="rhythm-grid">
      ${RHYTHM.map(r => `
        <div class="rhythm-day">
          <div class="rd-name">${r.day}</div>
          <div class="rd-task">${r.task.replace(/\n/g, '<br>')}</div>
        </div>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('.phase-row').forEach(row => {
    row.addEventListener('click', () => {
      const phaseId = row.dataset.phase;
      const phase = PHASES.find(p => p.id === phaseId);
      const first = phase.patterns.find(pid => PATTERNS[pid]);
      if (first) showPattern(first);
    });
  });
}

function renderPhaseRow(phase) {
  const pct = State.phaseProgress(phase.patterns);
  const available = phase.patterns.filter(pid => PATTERNS[pid]).length;
  const total = phase.patterns.length;

  return `
    <div class="phase-row" data-phase="${phase.id}">
      <div class="pr-left">
        <div class="pr-name">${phase.title}</div>
        <div class="pr-weeks">${phase.weeks} · ${available}/${total} patterns available</div>
      </div>
      <div class="pr-right">
        <span class="pr-pct">${pct}%</span>
        <div class="pr-bar-track">
          <div class="pr-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="pr-arrow">→</span>
      </div>
    </div>
  `;
}

// ── Pattern View ──────────────────────────────────────────────────────────
function renderPattern(id) {
  const p = PATTERNS[id];
  if (!p) {
    viewPattern.innerHTML = `<div style="padding:60px 48px;color:var(--text-3);font-size:14px">This pattern hasn't been added yet.</div>`;
    return;
  }

  const isComplete = State.isPatternComplete(id);
  const checks     = State.getSelfChecks(id, p.selfCheck.length);
  const note       = State.getNote(id);

  viewPattern.innerHTML = `
    <div class="pv-breadcrumb" id="back-btn">← Dashboard</div>

    <div class="${isComplete ? 'complete-banner show' : 'complete-banner'}">
      <span>✓</span> Pattern complete
    </div>

    <div class="pv-eyebrow">${p.phase}</div>
    <div class="pv-title">${p.title}</div>
    <div class="pv-meta-row">
      <span>Frequency: <strong>${p.frequency}</strong></span>
      ${p.unlocks.length ? `<span>Unlocks: <strong>${p.unlocks.join(', ')}</strong></span>` : ''}
    </div>

    <!-- Core Idea -->
    <div class="sec-title">Core Idea</div>
    <div class="prose">${p.idea}</div>

    <hr class="divider">

    <!-- Visual Intuition -->
    <div class="sec-title">Visual Intuition</div>
    ${p.variants.map(v => `
      <div class="variant-heading">${v.label}</div>
      <div class="visual-block"><pre>${v.visual}</pre></div>
    `).join('')}

    <hr class="divider">

    <!-- Templates -->
    <div class="sec-title">Java Templates</div>
    ${p.templates.map(t => `
      <div class="variant-heading">${t.label}</div>
      <div class="code-block"><pre>${t.code}</pre></div>
    `).join('')}

    <hr class="divider">

    <!-- Recognition -->
    <div class="sec-title">When to Use This</div>
    <div class="signal-list">
      ${p.signals.map(s => `
        <div class="signal-row">
          <span class="signal-cue">${s.cue}</span>
          <span class="signal-arrow">→</span>
          <span class="signal-result">${s.pattern}</span>
        </div>
      `).join('')}
    </div>

    <hr class="divider">

    <!-- Mistakes -->
    <div class="sec-title">Common Mistakes</div>
    ${p.mistakes.map(m => `
      <div class="mistake-item">
        <div class="mistake-name">${m.title}</div>
        <div class="mistake-body">${m.body}</div>
      </div>
    `).join('')}

    <hr class="divider">

    <!-- Complexity -->
    <div class="sec-title">Complexity</div>
    <table class="complexity-table">
      <thead><tr><th>Variant</th><th>Time</th><th>Space</th></tr></thead>
      <tbody>
        ${p.complexity.map(c => `
          <tr><td>${c.variant}</td><td>${c.time}</td><td>${c.space}</td></tr>
        `).join('')}
      </tbody>
    </table>

    <hr class="divider">

    <!-- Problems -->
    <div class="sec-title">Problems</div>
    <div class="prose" style="margin-bottom:20px">Before coding each problem: which variant? what's the invariant? what moves which pointer?</div>

    ${renderTier(id, 'warmup', 'Warm-up', p.problems.warmup)}
    ${renderTier(id, 'core',   'Core',    p.problems.core)}
    ${renderTier(id, 'stretch','Stretch', p.problems.stretch)}

    <hr class="divider">

    <!-- Self Check -->
    <div class="sec-title">Self-Check</div>
    <div class="prose" style="margin-bottom:16px">
      Check each box only when you can answer without looking at notes.<br>
      All checks + one solve per tier = pattern complete.
    </div>
    <div class="check-list" id="check-list">
      ${p.selfCheck.map((q, i) => `
        <div class="check-item ${checks[i] ? 'checked' : ''}" data-idx="${i}">
          <div class="check-box">${checks[i] ? '✓' : ''}</div>
          <span>${q}</span>
        </div>
      `).join('')}
    </div>

    <hr class="divider">

    <!-- Notes -->
    <div class="sec-title">Notes</div>
    <textarea class="notes-area" id="notes-area" placeholder="Your observations, edge cases, things to remember..."></textarea>
    <div class="notes-saved" id="notes-saved">Saved</div>
  `;

  // restore note value (avoids HTML escaping issues)
  $('notes-area').value = note;

  attachPatternListeners(id);
}

function renderTier(patternId, tier, label, problems) {
  return `
    <div class="tier-heading ${tier}">${label}</div>
    <div class="problem-tier">
      ${problems.map(prob => renderProblemCard(prob)).join('')}
    </div>
  `;
}

function renderProblemCard(prob) {
  const status = State.getProblemStatus(prob.id);
  const links = [];
  if (prob.lcUrl)  links.push(`<a class="prob-link" href="${prob.lcUrl}"  target="_blank" rel="noopener">LeetCode ↗</a>`);
  if (prob.nc)     links.push(`<a class="prob-link" href="${prob.nc}"     target="_blank" rel="noopener">NeetCode ↗</a>`);
  if (prob.yt)     links.push(`<a class="prob-link" href="${prob.yt}"     target="_blank" rel="noopener">YouTube ↗</a>`);

  return `
    <div class="problem-card">
      <div class="pc-top">
        <div>
          <div class="pc-name">${prob.name}</div>
          <div class="pc-lc-row">
            <span class="pc-lc">${prob.lc}</span>
            ${links.length ? `<span class="pc-links">${links.join('')}</span>` : ''}
          </div>
        </div>
        <div class="status-select">
          ${['todo','attempted','solved'].map(s => `
            <button class="status-btn ${status === s ? 'active-' + s : ''}"
                    data-prob="${prob.id}" data-status="${s}">
              ${s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="pc-hint"><strong>Hint —</strong> ${prob.hint}</div>
    </div>
  `;
}

// ── Listeners ─────────────────────────────────────────────────────────────
function attachPatternListeners(id) {
  $('back-btn').addEventListener('click', showDashboard);

  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const probId = btn.dataset.prob;
      const status = btn.dataset.status;
      State.setProblemStatus(probId, status);
      btn.closest('.status-select').querySelectorAll('.status-btn').forEach(b => {
        b.className = 'status-btn' + (b.dataset.status === status ? ' active-' + status : '');
      });
      refreshBanner(id);
      buildSidebar();
    });
  });

  document.querySelectorAll('.check-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx     = parseInt(item.dataset.idx);
      const checked = !item.classList.contains('checked');
      State.setSelfCheck(id, idx, checked);
      item.classList.toggle('checked', checked);
      item.querySelector('.check-box').textContent = checked ? '✓' : '';
      refreshBanner(id);
      buildSidebar();
    });
  });

  let notesTimer = null;
  $('notes-area').addEventListener('input', e => {
    clearTimeout(notesTimer);
    $('notes-saved').classList.remove('show');
    notesTimer = setTimeout(() => {
      State.setNote(id, e.target.value);
      $('notes-saved').classList.add('show');
      setTimeout(() => $('notes-saved').classList.remove('show'), 1500);
    }, 600);
  });
}

function refreshBanner(id) {
  const banner = document.querySelector('.complete-banner');
  if (banner) banner.classList.toggle('show', State.isPatternComplete(id));
}

// ── Init ──────────────────────────────────────────────────────────────────
$('btn-home').addEventListener('click', showDashboard);

buildSidebar();

const last = State.get().lastPattern;
if (last && PATTERNS[last]) {
  showPattern(last);
} else {
  showDashboard();
}
