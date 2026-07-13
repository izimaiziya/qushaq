/* ============================================================
   Qushaq — application logic
   Depends on: i18n.js (t, CURRENT_LANG, setLanguage) and data.js
   ============================================================ */

const $  = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const id = id => document.getElementById(id);
const toggleClass = (element, className, condition) => element && element.classList.toggle(className, condition);
const setText = (element, text) => { if (element) element.textContent = text; return element; };
const setHtml = (element, html) => { if (element) element.innerHTML = html; return element; };
const scrollToBottom = selector => {
  const el = typeof selector === 'string' ? $(selector) : selector;
  if (el) el.scrollTop = el.scrollHeight;
};
const safeJsonParse = (value, fallback = null) => {
  try { return JSON.parse(value); } catch { return fallback; }
};
const storage = {
  get(key, fallback = null) { return safeJsonParse(localStorage.getItem(key), fallback); },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
  remove(key) { localStorage.removeItem(key); }
};

function initApp() {
  setTimeout(() => {
    toggleClass(id('splash'), 'hidden', true);
    toggleClass(id('s-home'), 'active', false);

    const childData = loadChildData();
    if (childData) applyChildData(childData);
    renderAllArticles();
    renderRecommendedArticles(getRecommendationProfile() || extractRecommendationProfileFromChat());
    showAuth('register');
  }, 1800);
  scrollToBottom('#msgs-wrap');
}

window.addEventListener('load', initApp);

/* This runs whenever the language changes (see i18n.js) so every
   piece of dynamically generated content gets re-rendered in the
   new language without losing state. */
function onLanguageChanged() {
  const childData = loadChildData();
  if (childData) applyChildData(childData);
  renderAllArticles();
  renderRecommendedArticles(getRecommendationProfile() || extractRecommendationProfileFromChat());
  renderWorkScreen(currentWorkTab);
  renderAnalyticsSeedIfNeeded();
  if (episodes.length) renderAnalytics(true);
  updateObserveCard();
  updateLastEpisodeBlock();
}

/* ================= Onboarding / child profile ================= */

let selectedGender = 'мальчик';

function toggleDiag(el) {
  el.classList.toggle('on');
}

function setGender(g) {
  selectedGender = g;
  toggleClass(id('ob-boy'), 'on', g === 'мальчик');
  toggleClass(id('ob-girl'), 'on', g === 'девочка');
}

function openOnboarding() {
  const data = loadChildData();
  if (data) {
    id('ob-name').value = data.name || '';
    id('ob-age').value = data.age || '';
    setGender(data.gender || 'мальчик');
    $$('.ob-diag-chip').forEach(chip => chip.classList.remove('on'));
    if (data.diagIds && data.diagIds.length) {
      $$('.ob-diag-chip').forEach(chip => {
        if (data.diagIds.includes(chip.getAttribute('data-diag'))) chip.classList.add('on');
      });
    }
  }
  toggleClass(id('onboard'), 'active', true);
  renderRecommendedArticles(null);
}

function saveOnboarding() {
  const name = id('ob-name').value.trim() || t('onboard.default_name');
  const age = id('ob-age').value.trim() || '?';
  const diagIds = $$('.ob-diag-chip.on').map(c => c.getAttribute('data-diag'));

  const isEdit = !!loadChildData();
  const data = { name, age, gender: selectedGender, diagIds };
  storage.set('qushaq_child', data);

  toggleClass(id('onboard'), 'active', false);
  if (isEdit) go('profile'); else goMain('home');
  setTimeout(() => applyChildData(data), 50);
}

function loadChildData() {
  return storage.get('qushaq_child', null);
}

function diagDisplayString(diagIds) {
  if (!diagIds || !diagIds.length) return diagLabel('other');
  return diagIds.map(diagLabel).join(', ');
}

function ageWord(n) {
  if (CURRENT_LANG !== 'ru') return t('onboard.year_word_5');
  if (n >= 11 && n <= 14) return 'лет';
  const last = n % 10;
  if (last === 1) return 'год';
  if (last >= 2 && last <= 4) return 'года';
  return 'лет';
}

function applyChildData(data) {
  const name = data.name || t('onboard.default_name');
  const age  = data.age  || '?';
  const gender = data.gender || 'мальчик';
  const diag = diagDisplayString(data.diagIds);
  const ava  = gender === 'девочка' ? '👧' : '👦';
  const ageNum = parseInt(age, 10);
  const ageStr = Number.isFinite(ageNum) ? `${age} ${ageWord(ageNum)}` : age;

  setText(id('home-child-ava'), ava);
  setText(id('home-child-name'), `${name}, ${age}`);
  setText(id('home-child-sub'), diag);

  setText(id('crisis-hdr-name'), name);
  setText(id('crisis-child-name'), name);
  $$('.crisis-child-name-inline').forEach(el => setText(el, name));
  setText($('.home-crisis-sub'), `${t('home.crisis_sub_named')} ${name}`);

  setText(id('ctx-name'), `${name}, ${age}`);
  setText(id('ctx-tag'), diag);
  setText(id('ctx-emoji'), ava);

  const ci = id('ci'); if (ci) ci.placeholder = t('chat.input_ph');
  setText(id('diary-title'), `${t('insights.title_prefix')} ${name}`);

  setText(id('profile-avatar'), ava);
  setText(id('profile-name'), name);
  setText(id('profile-sub'), ageStr + (CURRENT_LANG === 'ru' ? ' · ' + t('profile.default_city') : ', ' + t('profile.default_city')));

  const profileTags = id('profile-tags');
  if (profileTags) {
    const tags = (data.diagIds && data.diagIds.length) ? data.diagIds.map(diagLabel) : [diagLabel('other')];
    const colors = ['green','red','blue','amber','purple'];
    setHtml(profileTags, tags.map((tag, index) => `<span class="ptag ${colors[index % colors.length]}">${tag}</span>`).join(''));
  }

  const therapistNoteBody = document.getElementById('therapist-note-body');
  if (therapistNoteBody) {
    const asked = gender === 'девочка' ? t('profile.asked_girl') : t('profile.asked_boy');
    const pronoun = gender === 'девочка' ? t('profile.pronoun_girl') : t('profile.pronoun_boy');
    therapistNoteBody.textContent = t('profile.therapist_note_template')
      .replace('{name}', name).replace('{asked}', asked).replace('{pronoun}', pronoun);
  }

  const notifTitle1 = document.getElementById('notif-title-1');
  if (notifTitle1) notifTitle1.textContent = `${t('notify.t1')} ${name}`;
  const notifBody1 = document.getElementById('notif-body-1');
  if (notifBody1) notifBody1.textContent = `${t('notify.b1_named')} ${name}.`;

  updateSystemPrompt(data);
  renderRecommendedArticles(getRecommendationProfile() || extractRecommendationProfileFromChat());
}

function openNotifications() {
  const overlay = document.getElementById('notify-overlay');
  if (overlay) overlay.classList.add('open');
}
function closeNotifications(event) {
  if (event && event.target && event.target.id !== 'notify-overlay') return;
  const overlay = document.getElementById('notify-overlay');
  if (overlay) overlay.classList.remove('open');
}

let CHILD_CONTEXT = '';
function updateSystemPrompt(data) {
  const diag = diagDisplayString(data.diagIds);
  CHILD_CONTEXT = `child_name=${data.name}; age=${data.age}; gender=${data.gender}; diagnosis=${diag}`;
}

/* ================= Users / auth ================= */

const USERS_KEY = 'qushaq_users';
const CURRENT_USER_KEY = 'currentUser';
const RECOMMENDATION_PROFILE_KEY = 'qushaq_recommendation_profile';

function getUsers() { return storage.get(USERS_KEY, []); }
function saveUsers(users) { storage.set(USERS_KEY, users); }
function getCurrentUser() { return storage.get(CURRENT_USER_KEY, null); }
function setCurrentUser(user) { storage.set(CURRENT_USER_KEY, user); }

function getRecommendationStorageKey() {
  const currentUser = getCurrentUser();
  return currentUser ? `${RECOMMENDATION_PROFILE_KEY}_${currentUser.id}` : RECOMMENDATION_PROFILE_KEY;
}
function getRecommendationProfile() { return storage.get(getRecommendationStorageKey(), null); }
function saveRecommendationProfile(profile) { storage.set(getRecommendationStorageKey(), profile); }
function resetRecommendationProfile() { storage.remove(getRecommendationStorageKey()); }

function uniquePush(list, value) { if (value && !list.includes(value)) list.push(value); }

function extractRecommendationProfileFromChat() {
  const profile = { topics: [], triggers: [], goals: [], diagnosis: [], age: null,
    updatedAt: new Date().toISOString(), messageCount: chatHistory.length,
    latestUserText: '', recentUserText: '' };

  const userTurns = chatHistory.filter(m => m.role === 'user');
  if (userTurns.length) profile.latestUserText = userTurns[userTurns.length - 1].content || '';
  profile.recentUserText = userTurns.slice(-4).map(m => m.content || '').join(' \n ');

  const combinedText = chatHistory.map(m => m.content || '').join(' \n ').toLowerCase();
  PROFILE_RULES.forEach(rule => {
    if (rule.patterns.some(pattern => pattern.test(combinedText))) {
      uniquePush(profile[rule.bucket], rule.value);
    }
  });

  const childData = loadChildData();
  if (childData) {
    const parsedAge = parseInt(childData.age, 10);
    profile.age = Number.isFinite(parsedAge) ? parsedAge : null;
    profile.diagnosis = (childData.diagIds || []).map(idKey => diagLabel(idKey).toLowerCase());
  }
  return profile;
}

function updateRecommendationProfileFromChat() {
  const profile = extractRecommendationProfileFromChat();
  saveRecommendationProfile(profile);
  renderRecommendedArticles(profile);
  return profile;
}

function scoreArticle(article, profile) {
  let score = article.priority || 0;
  const profileTopics = profile?.topics || [];
  const profileTriggers = profile?.triggers || [];
  const profileGoals = profile?.goals || [];
  const profileDiagnosis = profile?.diagnosis || [];
  const profileAge = profile?.age;
  const latestUserText = (profile?.latestUserText || '').toLowerCase();
  const recentUserText = (profile?.recentUserText || '').toLowerCase();

  profileTopics.forEach(topic => {
    if ((article.tags || []).some(tag => tag.toLowerCase().includes(topic))) score += 3;
    if (latestUserText.includes(topic)) score += 2;
  });
  profileTriggers.forEach(trigger => {
    if ((article.triggers || []).some(tag => tag.toLowerCase().includes(trigger))) score += 2;
    if ((article.tags || []).some(tag => tag.toLowerCase().includes(trigger))) score += 1;
    if (latestUserText.includes(trigger)) score += 2;
  });
  profileGoals.forEach(goal => {
    if ((article.goals || []).some(tag => tag.toLowerCase().includes(goal))) score += 2;
  });
  profileDiagnosis.forEach(diag => {
    if ((article.diagnoses || []).some(tag => tag.toLowerCase().includes(diag))) score += 2;
  });

  const searchable = [article.title, article.description]
    .concat(article.tags || [], article.triggers || [], article.goals || [])
    .join(' ').toLowerCase();

  if (latestUserText) {
    const tokens = latestUserText.split(/[^\p{L}\p{N}]+/u).filter(tk => tk.length >= 4);
    tokens.forEach(tk => { if (searchable.includes(tk)) score += 2; });
  }
  if (recentUserText && searchable) {
    const recentTokens = recentUserText.split(/[^\p{L}\p{N}]+/u).filter(tk => tk.length >= 5);
    const overlap = recentTokens.filter(tk => searchable.includes(tk)).length;
    score += Math.min(overlap, 4);
  }
  if (profileAge && article.ageMin != null && article.ageMax != null && profileAge >= article.ageMin && profileAge <= article.ageMax) {
    score += 2;
  }
  if (!(profileTopics.length || profileTriggers.length || profileGoals.length)) score += 1;
  return score;
}

function articleCardHtml(article) {
  return `<div class="learn-card" onclick="openArticle('${article.url}', ${JSON.stringify(article.title)})"><div class="learn-accent ${article.accent}"></div><div class="learn-body"><div class="learn-cat ${article.accent}">${article.category}</div><div class="learn-title">${article.title}</div><div class="learn-desc">${article.description}</div><div class="learn-meta"><span class="learn-time"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${article.time}</span>${article.badge ? `<span class="learn-badge ${article.badgeClass || 'new'}">${article.badge}</span>` : ''}</div></div><div class="learn-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div></div>`;
}

function renderAllArticles() {
  const holder = document.getElementById('learn-all-list');
  if (!holder) return;
  holder.innerHTML = getArticleLibrary().map(articleCardHtml).join('');
}

function renderRecommendedArticles(profile = getRecommendationProfile()) {
  const holder = document.getElementById('learn-recommended-list');
  const note = document.getElementById('learn-recommend-note');
  if (!holder) return;

  const ranked = getArticleLibrary()
    .map(article => ({ article, score: scoreArticle(article, profile || {}) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.article);

  holder.innerHTML = ranked.map(articleCardHtml).join('');

  if (note) {
    const latest = (profile?.latestUserText || '').trim();
    note.textContent = latest ? t('learn.recommend_note_query') : t('learn.recommend_note_chat');
  }
}

function clearAuthInputs() {
  ['login-email', 'login-password', 'register-email', 'register-password'].forEach(key => {
    const el = id(key);
    if (el) el.value = '';
  });
}

function logout() {
  storage.remove(CURRENT_USER_KEY);
  clearAuthInputs();
  renderRecommendedArticles(null);
  showAuth('login');
}

function showAuth(which) {
  toggleClass(id('auth-login'), 'active', which === 'login');
  toggleClass(id('auth-register'), 'active', which === 'register');
  $$('.demo-nav button[data-screen]').forEach(btn => {
    toggleClass(btn, 'on', btn.getAttribute('data-screen') === 'auth-' + which);
  });
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  if (!email || !password) { alert(t('auth.err_fill')); return; }

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) { alert(t('auth.err_login')); return; }

  setCurrentUser({ id: user.id, email: user.email });
  clearAuthInputs();
  showAuth(null);

  const childData = loadChildData();
  goMain('home');
  setTimeout(() => {
    if (childData) applyChildData(childData);
    renderRecommendedArticles(getRecommendationProfile() || extractRecommendationProfileFromChat());
  }, 50);
}

function freshChatIntroHtml() {
  const tm = time();
  return `
    <div class="msg-row"><div class="msg-av"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="8" width="18" height="11" rx="4"/><circle cx="9" cy="13.5" r="1.2" fill="white" stroke="none"/><circle cx="15" cy="13.5" r="1.2" fill="white" stroke="none"/><path d="M9 17 Q12 18.5 15 17"/><rect x="10.5" y="5" width="3" height="3.5" rx="1.2"/><circle cx="12" cy="4.2" r=".9" fill="white" stroke="none"/></svg></div><div class="bubble assistant">${t('chat.intro')}</div></div>
    <div class="msg-meta"><span class="msg-meta-time">${tm}</span></div>`;
}

function doRegister() {
  const email = document.getElementById('register-email').value.trim().toLowerCase();
  const password = document.getElementById('register-password').value;
  if (!email || !password) { alert(t('auth.err_fill')); return; }
  if (password.length < 8) { alert(t('auth.err_short_pw')); return; }

  const users = getUsers();
  if (users.some(u => u.email === email)) { alert(t('auth.err_exists')); return; }

  const newUser = { id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()), email, password };
  users.push(newUser);
  saveUsers(users);
  setCurrentUser({ id: newUser.id, email: newUser.email });
  notifyNewRegistration(newUser.email);
  resetRecommendationProfile();
  chatHistory.length = 0;
  localStorage.removeItem('qushaq_chat_history');
  localStorage.removeItem('qushaq_chat_dom');
  localStorage.removeItem('qushaq_child');
  episodes = [];

  const box = document.getElementById('msgs');
  if (box) box.innerHTML = freshChatIntroHtml();

  clearAuthInputs();
  showAuth(null);
  document.getElementById('ob-name').value = '';
  document.getElementById('ob-age').value  = '';
  setGender('мальчик');
  document.querySelectorAll('.ob-diag-chip').forEach(c => c.classList.remove('on'));
  document.getElementById('onboard').classList.add('active');
  renderRecommendedArticles(null);
}

function goMain(name) {
  go(name);
  setTimeout(() => { updateObserveCard(); }, 100);
}

const SCREENS = ['home','chat','insights','work','learn','profile'];
function go(name) {
  showAuth(null);
  toggleClass(id('onboard'), 'active', false);
  SCREENS.forEach(s => {
    toggleClass(id('s-' + s), 'active', s === name);
    toggleClass(id('ni-' + s), 'on', s === name);
  });
  $$('.demo-nav button[data-screen]').forEach(btn => toggleClass(btn, 'on', btn.getAttribute('data-screen') === name));

  if (name === 'chat') setTimeout(() => {
    scrollToBottom('#msgs-wrap');
    const tl = id('chat-time-label');
    if (tl) {
      const d = new Date();
      tl.textContent = t('chat.today') + ' · ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
    }
  }, 60);
}

/* ================= Work / gigs screen ================= */

let currentWorkTab = 'all';

function renderWorkScreen(tab = currentWorkTab) {
  currentWorkTab = tab;
  const list = document.getElementById('work-list');
  const empty = document.getElementById('work-empty');
  const tabs = document.querySelectorAll('.work-tab');
  if (!list || !empty || !tabs.length) return;

  tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
  const jobs = getWorkJobs().filter(job => job.tab === tab);
  const sectionKeys = [];
  jobs.forEach(job => { if (!sectionKeys.includes(job.section)) sectionKeys.push(job.section); });
  const sectionLabel = { today: t('work.section_today'), yesterday: t('work.section_yesterday'), earlier: t('work.section_earlier') };

  list.innerHTML = sectionKeys.map(sectionKey => {
    const items = jobs.filter(job => job.section === sectionKey).map(job => `
      <div class="work-card">
        <div class="work-card-thumb"><img src="${workThumb(job.thumbKey)}" alt="${job.title}"></div>
        <div class="work-card-body">
          <div class="work-card-title">${job.title}</div>
          <div class="work-card-date">${t('work.posted')} ${job.details ? job.details.date : ''}</div>
        </div>
        <div class="work-card-side">
          <div class="work-card-price">${job.price}</div>
          ${job.action === 'details'
            ? `<button class="work-btn details" type="button" onclick="openWorkDetails('${job.id}')">${t('work.details')}</button>`
            : job.action === 'paid'
              ? `<button class="work-btn paid" type="button" disabled>${t('work.paid')}</button>`
              : `<button class="work-btn disabled" type="button" disabled>${t('work.unavailable')}</button>`}
        </div>
      </div>`).join('');
    return `<div class="work-section"><div class="work-section-title">${sectionLabel[sectionKey] || sectionKey}</div>${items}</div>`;
  }).join('');

  empty.classList.toggle('show', jobs.length === 0);
}

function openWorkDetails(jobId) {
  const job = getWorkJobs().find(item => item.id === jobId && item.details);
  if (!job) return;
  const d = job.details;
  document.getElementById('work-detail-amount').textContent = d.amount;
  document.getElementById('work-detail-date').textContent = d.date;
  document.getElementById('work-detail-code').textContent = d.code;
  document.getElementById('work-detail-description').textContent = d.description;
  document.getElementById('work-detail-customer').textContent = d.customer;
  document.getElementById('work-detail-phone').textContent = d.phone;
  document.getElementById('work-detail-city').textContent = d.city;
  document.getElementById('work-detail-since').textContent = d.since;
  document.getElementById('work-detail-avatar').src = makeWorkAvatar(d.avatarKey, '#EAD9C9');
  document.getElementById('work-detail-avatar').alt = d.customer;
  document.getElementById('work-detail-overlay').classList.add('open');
}

function closeWorkDetails() {
  const overlay = document.getElementById('work-detail-overlay');
  if (overlay) overlay.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.work-tab').forEach(btn => {
    btn.addEventListener('click', () => renderWorkScreen(btn.dataset.tab));
  });
  renderWorkScreen('all');
});

/* ================= Crisis flow ================= */

function openCrisis()  { document.getElementById('crisis-overlay').classList.add('open'); }
function closeCrisis() { document.getElementById('crisis-overlay').classList.remove('open'); }

function openLogEpisode() {
  closeCrisis();
  document.getElementById('log-date').value = '';
  document.getElementById('log-place').value = '';
  document.getElementById('log-what').value = '';
  document.getElementById('log-trigger').value = '';
  document.querySelectorAll('#log-tags .log-tag').forEach(t2 => t2.classList.remove('active'));
  document.getElementById('log-overlay').classList.add('open');
}
function closeLogEpisode() { document.getElementById('log-overlay').classList.remove('open'); }

function selectTag(el, value) {
  document.querySelectorAll('#log-tags .log-tag').forEach(t2 => t2.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('log-trigger').value = value;
}

/* ================= Episodes / diary analytics ================= */

let episodes = [];
const MONTHS_SHORT_BY_LANG = {
  ru: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  kk: ['қаң','ақп','нау','сәу','мам','мау','шіл','там','қыр','қаз','қар','жел']
};
function monthsShort() { return MONTHS_SHORT_BY_LANG[CURRENT_LANG] || MONTHS_SHORT_BY_LANG.ru; }

function parseDateInput(val) {
  if (!val) { const n = new Date(); return {day: n.getDate(), monthIdx: n.getMonth(), iso: toIso(n)}; }
  const parts = val.split('-');
  if (parts.length === 3) return {day: parseInt(parts[2],10), monthIdx: parseInt(parts[1],10)-1, iso: val};
  const n = new Date(); return {day: n.getDate(), monthIdx: n.getMonth(), iso: toIso(n)};
}
function toIso(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }

function saveEpisode() {
  const dateVal  = document.getElementById('log-date').value || toIso(new Date());
  const place    = document.getElementById('log-place').value.trim()   || t('log.place_default');
  const what     = document.getElementById('log-what').value.trim()    || t('log.what_default');
  const trigger  = document.getElementById('log-trigger').value.trim() || null;
  const parsed = parseDateInput(dateVal);

  episodes.push({ iso: parsed.iso, day: parsed.day, monthIdx: parsed.monthIdx, place, description: what, trigger });
  updateLastEpisodeBlock();
  updateObserveCard();
  closeLogEpisode();

  const toast = document.getElementById('save-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);

  setTimeout(() => { go('insights'); renderAnalytics(); }, 600);
}

/* Trigger -> category classification, driven by regex matching in all 3 languages */
function classifyFreeText(text) {
  if (!text) return 'НЕ ОПРЕДЕЛЕНО';
  const tt = text.toLowerCase();
  if (/шум|звук|громк|объявл|музык|голос|свет|яркий|noise|loud|sound|music|light|bright|шу|дыбыс|жарық/.test(tt)) return 'СЕНСОРНОЕ';
  if (/люд|людн|толп|народ|много|обстанов|crowd|people|setting|адам|орта/.test(tt)) return 'СРЕДА';
  if (/переход|переключ|смена активн|transition|switch|ауысу/.test(tt)) return 'ПЕРЕХОД';
  if (/устал|сон|усталост|tired|sleep|шаршау|ұйқы/.test(tt)) return 'СОСТОЯНИЕ';
  return 'НЕ ОПРЕДЕЛЕНО';
}

const TAG_CATEGORY_LOOKUP = {
  'громкий звук':'СЕНСОРНОЕ','loud sound':'СЕНСОРНОЕ','қатты дыбыс':'СЕНСОРНОЕ',
  'яркий свет':'СЕНСОРНОЕ','bright light':'СЕНСОРНОЕ','жарқын жарық':'СЕНСОРНОЕ',
  'много людей':'СРЕДА','crowded place':'СРЕДА','адам көп жер':'СРЕДА',
  'смена обстановки':'СРЕДА','change of setting':'СРЕДА','ортаның ауысуы':'СРЕДА',
  'переход между делами':'ПЕРЕХОД','switching activities':'ПЕРЕХОД','іс-әрекеттің ауысуы':'ПЕРЕХОД',
  'усталость':'СОСТОЯНИЕ','tiredness':'СОСТОЯНИЕ','шаршау':'СОСТОЯНИЕ'
};

function resolveCategory(trigger) {
  if (!trigger || trigger.trim() === '') return 'НЕ ОПРЕДЕЛЕНО';
  const known = TAG_CATEGORY_LOOKUP[trigger.trim().toLowerCase()];
  if (known) return known;
  return classifyFreeText(trigger);
}
function catClass(cat) {
  const MAP = { 'СЕНСОРНОЕ':'cat-сенс', 'СРЕДА':'cat-среда', 'ПЕРЕХОД':'cat-переход', 'СОСТОЯНИЕ':'cat-сост', 'НЕ ОПРЕДЕЛЕНО':'cat-none' };
  return MAP[cat] || 'cat-none';
}
function catLabel(cat) {
  const MAP = { 'СЕНСОРНОЕ':'insights.cat_sensory_label', 'СРЕДА':'insights.cat_env_label', 'ПЕРЕХОД':'insights.cat_transition_label', 'СОСТОЯНИЕ':'insights.cat_state_label', 'НЕ ОПРЕДЕЛЕНО':'insights.cat_none_label' };
  return t(MAP[cat] || 'insights.cat_none_label');
}
function getDominantCategory() {
  const counts = {};
  episodes.forEach(ep => { const cat = resolveCategory(ep.trigger); counts[cat] = (counts[cat] || 0) + 1; });
  let best = 'НЕ ОПРЕДЕЛЕНО', bestN = 0;
  Object.entries(counts).forEach(([cat, n]) => { if (n > bestN) { best = cat; bestN = n; } });
  return best;
}

function updateLastEpisodeBlock() {
  const block = document.getElementById('home-last-ep');
  const textEl = document.getElementById('home-last-ep-text');
  const btn = document.getElementById('home-last-ep-btn');
  if (!block || !textEl) return;
  if (!episodes.length) { block.style.display = 'none'; return; }
  const last = episodes[episodes.length - 1];
  const place = last.place || t('insights.not_specified');
  const trigger = last.trigger || last.description || t('insights.not_specified');
  textEl.textContent = place + ' — ' + trigger;
  block.style.display = 'block';
  if (btn) btn.style.display = 'block';
}

function observationTextFor(topTrigger) {
  if (/шум|звук|громк|объявл|музык|голос|свет|яркий|noise|loud|sound|music|light|bright|шу|дыбыс|жарық/.test(topTrigger)) return t('home.observe_noise');
  if (/люд|людн|толп|народ|много|обстанов|crowd|people|адам|орта/.test(topTrigger)) return t('home.observe_crowd');
  if (/переход|переключ|смена активн|между делами|transition|switch|ауысу/.test(topTrigger)) return t('home.observe_transition');
  if (/устал|сон|усталост|tired|шаршау|ұйқы/.test(topTrigger)) return t('home.observe_tired');
  return `${t('home.observe_generic_prefix')} ${topTrigger}`;
}

function updateObserveCard() {
  const card = document.getElementById('home-observe-card');
  const textEl = document.getElementById('home-observe-text');
  const btn = document.getElementById('home-observe-btn');
  if (!card || !textEl || !btn) return;

  const counts = {};
  episodes.forEach(ep => {
    const tt = (ep.trigger || '').toLowerCase();
    if (!tt) return;
    counts[tt] = (counts[tt] || 0) + 1;
  });
  const keys = Object.keys(counts);
  if (!keys.length) {
    textEl.textContent = t('home.observe_default');
    textEl.classList.add('muted');
    btn.style.display = 'none';
    card.classList.add('visible');
    return;
  }
  const topTrigger = keys.reduce((a, b) => counts[a] >= counts[b] ? a : b);
  textEl.textContent = observationTextFor(topTrigger);
  textEl.classList.remove('muted');
  btn.style.display = 'block';
  card.classList.add('visible');
}

function repeatLastEpisode() {
  if (!episodes.length) return;
  const last = episodes[episodes.length - 1];
  const place = last.place || t('insights.not_specified');
  const trigger = last.trigger || last.description || t('insights.not_specified');
  const msg = `${t('chat.repeat_prefix')} ${place}, ${trigger}`;

  go('chat');
  setTimeout(() => {
    const inp = document.getElementById('ci');
    if (inp) { inp.value = msg; send(); }
  }, 150);
}

function renderAnalyticsSeedIfNeeded() {
  // no-op placeholder retained for symmetry with original structure
}

function renderAnalytics(silentRelocalize) {
  const banner = document.getElementById('update-banner');
  if (banner && !silentRelocalize) banner.classList.add('show');

  const total = episodes.length;
  const counts = { 'СЕНСОРНОЕ': 0, 'СРЕДА': 0, 'ПЕРЕХОД': 0, 'СОСТОЯНИЕ': 0, 'НЕ ОПРЕДЕЛЕНО': 0 };
  episodes.forEach(ep => { counts[resolveCategory(ep.trigger)]++; });

  const BASE = { 'СЕНСОРНОЕ': 2, 'СРЕДА': 1, 'ПЕРЕХОД': 1, 'СОСТОЯНИЕ': 0, 'НЕ ОПРЕДЕЛЕНО': 0 };
  const totalAll = total + 4;
  Object.keys(BASE).forEach(k => counts[k] += BASE[k]);

  const dominant = getDominantCategory();

  const titleEl = document.getElementById('pattern-card-title');
  if (titleEl) {
    const TITLES = {
      'СЕНСОРНОЕ': t('insights.title_noise'), 'СРЕДА': t('insights.title_crowd'),
      'ПЕРЕХОД': t('insights.title_transition'), 'СОСТОЯНИЕ': t('insights.title_state'),
      'НЕ ОПРЕДЕЛЕНО': t('insights.title_none')
    };
    titleEl.textContent = TITLES[total === 0 ? 'СЕНСОРНОЕ' : dominant];
  }

  const pcb = document.getElementById('pattern-card-body');
  if (pcb) {
    if (total === 0) {
      pcb.innerHTML = `<strong style="color:var(--ink)">${t('insights.default_pattern_body_1')}</strong> ${t('insights.default_pattern_body_2')} <strong style="color:var(--ink)">${t('insights.default_pattern_body_3')}</strong>.`;
    } else {
      const domCount = counts[dominant];
      const label = catLabel(dominant).toLowerCase();
      pcb.innerHTML = `<strong style="color:var(--ink)">${domCount} ${t('insights.body_of')} ${totalAll} ${t('insights.body_episodes')}</strong> ${t('insights.body_category_prefix')}${label}${t('insights.body_category_suffix')} <strong style="color:var(--ink)">${t('insights.body_regularly')}</strong>.`;
    }
  }

  const recEl = document.getElementById('pattern-rec-body');
  if (recEl) {
    const RECS = { 'СЕНСОРНОЕ': t('insights.rec_sensory'), 'СРЕДА': t('insights.rec_env'), 'ПЕРЕХОД': t('insights.rec_transition'), 'СОСТОЯНИЕ': t('insights.rec_state'), 'НЕ ОПРЕДЕЛЕНО': t('insights.rec_none') };
    recEl.textContent = RECS[total === 0 ? 'СЕНСОРНОЕ' : dominant];
  }

  const chart = document.getElementById('ep-chart');
  if (chart) {
    let todayBar = document.getElementById('ep-bar-today');
    const todayCls = 'ep-bar-fill ' + catClass(dominant);
    const barH = Math.min(20 + total * 20, 100) + '%';
    if (!todayBar) {
      todayBar = document.createElement('div');
      todayBar.className = 'ep-bar-wrap';
      todayBar.id = 'ep-bar-today';
      todayBar.innerHTML = `<div class="ep-bar-outer"><div class="${todayCls}" id="ep-bar-today-fill" style="height:0%;transition:height .6s ease"></div></div><div class="ep-bar-date">${t('insights.today_bar')}</div>`;
      chart.appendChild(todayBar);
      setTimeout(() => { const fill = document.getElementById('ep-bar-today-fill'); if (fill) fill.style.height = barH; }, 80);
    } else {
      const fill = document.getElementById('ep-bar-today-fill');
      const dateEl = todayBar.querySelector('.ep-bar-date');
      if (dateEl) dateEl.textContent = t('insights.today_bar');
      if (fill) { fill.className = todayCls; fill.style.height = barH; }
    }
  }

  const epCard = document.getElementById('episode-card');
  if (epCard) {
    epCard.querySelectorAll('.ep-item.ep-new').forEach(el => el.remove());
    [...episodes].reverse().forEach(ep => {
      const cat = resolveCategory(ep.trigger);
      const cls = catClass(cat);
      const trigLabel = ep.trigger ? ep.trigger : t('insights.not_specified');
      const triggerHtml = `<div class="ep-trigger ${cls}"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>${trigLabel}</div>`;
      const newEp = document.createElement('div');
      newEp.className = 'ep-item ep-new';
      newEp.innerHTML = `<div class="ep-date"><div class="ep-date-day">${ep.day}</div><div class="ep-date-month">${monthsShort()[ep.monthIdx]}</div></div><div class="ep-dot-line"><div class="ep-dot ${cls}"></div><div class="ep-line"></div></div><div><div class="ep-place">${ep.place}</div><div class="ep-behavior">${ep.description}</div>${triggerHtml}</div>`;
      epCard.insertBefore(newEp, epCard.firstChild);
    });
  }

  const insightsScroll = document.querySelector('#s-insights .scroll-y');
  if (insightsScroll && !silentRelocalize) insightsScroll.scrollTop = 0;
}

/* ================= Chat ================= */

function clearChat() {
  if (!confirm(t('chat.clear_confirm'))) return;
  chatHistory.length = 0;
  localStorage.removeItem('qushaq_chat_history');
  localStorage.removeItem('qushaq_chat_dom');
  const box = document.getElementById('msgs');
  box.innerHTML = freshChatIntroHtml();
}

function copyCard(btn) {
  const ar = btn.closest('.action-row');
  let el = ar.previousElementSibling;
  let cardText = '';
  let introText = '';
  while (el) {
    if (el.classList.contains('response-card') && !cardText) {
      el.querySelectorAll('.rc-section').forEach(sec => {
        const title = sec.querySelector('.rc-section-title')?.textContent?.trim() || '';
        cardText += title + '\n';
        sec.querySelectorAll('.rc-bullet, .rc-step-text').forEach(item => { cardText += item.textContent.trim() + '\n'; });
        cardText += '\n';
      });
    }
    if (el.classList.contains('msg-row') && !introText) {
      const bubble = el.querySelector('.bubble.assistant');
      if (bubble) introText = bubble.textContent.trim();
    }
    el = el.previousElementSibling;
  }

  const text = [introText, cardText].filter(Boolean).join('\n\n').trim() || t('chat.no_copy_text');
  const restoreLabel = () => `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>${t('chat.copy')}`;
  const copiedLabel = () => `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${t('chat.copied')}`;

  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = copiedLabel();
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = restoreLabel(); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.innerHTML = copiedLabel();
    setTimeout(() => { btn.innerHTML = restoreLabel(); }, 2000);
  });
}

function addChip(btn) { const ci = document.getElementById('ci'); ci.value = btn.textContent.trim(); ci.focus(); }

function feedbackClick(btn, type) {
  const row = btn.closest('.action-row');
  row.querySelectorAll('.feedback-btn').forEach(b => b.classList.remove('active-helped','active-nope'));
  btn.classList.add(type === 'helped' ? 'active-helped' : 'active-nope');
}

function avHtml() {
  return `<div class="msg-av"><svg viewBox="0 0 20 20" fill="none"><circle cx="7.5" cy="10.5" r="1.2" fill="white"/><circle cx="12.5" cy="10.5" r="1.2" fill="white"/><path d="M8 14 Q10 15.2 12 14" stroke="white" stroke-width="1.1" stroke-linecap="round"/></svg></div>`;
}
function time() { const d = new Date(); return d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0'); }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

const chatHistory = JSON.parse(localStorage.getItem('qushaq_chat_history') || '[]');
function saveChatHistory() { localStorage.setItem('qushaq_chat_history', JSON.stringify(chatHistory)); }
function saveMsgsDom() { const box = document.getElementById('msgs'); if (box) localStorage.setItem('qushaq_chat_dom', box.innerHTML); }
function restoreMsgsDom() {
  const saved = localStorage.getItem('qushaq_chat_dom');
  const box = document.getElementById('msgs');
  if (saved && box) {
    box.innerHTML = saved;
    setTimeout(() => { const w = document.getElementById('msgs-wrap'); if (w) w.scrollTop = 99999; }, 60);
  }
}
window.addEventListener('DOMContentLoaded', () => { restoreMsgsDom(); renderRecommendedArticles(getRecommendationProfile() || extractRecommendationProfileFromChat()); });

function renderResponse(r, box, wrap, elapsed) {
  const iconMap = {
    purple: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
    teal:   '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    blue:   '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    amber:  '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>',
    red:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
  };

  if (r.detect) {
    const dc = document.createElement('div');
    dc.className = 'detect-card';
    dc.innerHTML = `<div class="detect-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></div><div><div class="detect-label">${t('chat.detect_label')}</div><div class="detect-value">${r.detect}</div></div>`;
    box.appendChild(dc);
  }

  const aRow = document.createElement('div');
  aRow.className = 'msg-row';
  aRow.innerHTML = avHtml() + `<div class="bubble assistant">${r.intro}</div>`;
  box.appendChild(aRow);
  const aMeta = document.createElement('div');
  aMeta.className = 'msg-meta';
  aMeta.innerHTML = `<span class="msg-meta-time">${time()}</span>${elapsed ? `<span class="msg-meta-dur">· ${elapsed}с</span>` : ''}`;
  box.appendChild(aMeta);

  let delay = 200;

  if (r.sections && r.sections.length) {
    setTimeout(() => {
      const card = document.createElement('div');
      card.className = 'response-card';
      r.sections.forEach(sec => {
        const s = document.createElement('div');
        s.className = 'rc-section';
        const icon = iconMap[sec.color] || iconMap.purple;
        let html = `<div class="rc-section-head"><div class="rc-section-icon icon-${sec.color}"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">${icon}</svg></div><div class="rc-section-title">${sec.title}</div></div>`;
        if (sec.type === 'steps') {
          html += `<div class="rc-steps">` + sec.items.map((st,i) => `<div class="rc-step"><div class="rc-step-num">${i+1}</div><div class="rc-step-text">${st}</div></div>`).join('') + `</div>`;
        } else {
          html += `<div class="rc-bullets">` + sec.items.map(b => `<div class="rc-bullet">${b}</div>`).join('') + `</div>`;
        }
        s.innerHTML = html;
        card.appendChild(s);
      });
      box.appendChild(card);
      wrap.scrollTop = 99999;
    }, delay); delay += 200;
  }

  if (r.followup) {
    setTimeout(() => {
      const fq = document.createElement('div');
      fq.className = 'followup-bubble';
      fq.textContent = r.followup;
      box.appendChild(fq);
      wrap.scrollTop = 99999;
    }, delay); delay += 150;
  }

  setTimeout(() => {
    const ar = document.createElement('div');
    ar.className = 'action-row';
    ar.innerHTML = `
      <button class="feedback-btn helped" onclick="feedbackClick(this,'helped')">${t('chat.helped')}</button>
      <button class="feedback-btn nope"   onclick="feedbackClick(this,'nope')">${t('chat.nope')}</button>
      <button class="copy-btn" onclick="copyCard(this)">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>${t('chat.copy')}
      </button>`;
    box.appendChild(ar);
    wrap.scrollTop = 99999;
    setTimeout(saveMsgsDom, 100);
  }, delay);
}

function streamingLabels() { return [t('chat.streaming1'), t('chat.streaming2'), t('chat.streaming3'), t('chat.streaming4')]; }

async function send() {
  const inp = document.getElementById('ci');
  const box = document.getElementById('msgs');
  const wrap = document.getElementById('msgs-wrap');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  inp.disabled = true;
  document.querySelector('.send-btn').disabled = true;
  const uRow = document.createElement('div');
  uRow.className = 'msg-row user';
  uRow.innerHTML = `<div class="bubble user">${esc(txt)}</div>`;
  box.appendChild(uRow);
  const uMeta = document.createElement('div');
  uMeta.className = 'msg-meta right';
  uMeta.innerHTML = `<span class="msg-meta-time">${time()}</span><span class="msg-meta-check">✓✓</span>`;
  box.appendChild(uMeta);
  wrap.scrollTop = 99999;

  const labels = streamingLabels();
  const streamRow = document.createElement('div');
  streamRow.className = 'msg-row';
  streamRow.innerHTML = avHtml() + `<div class="bubble assistant stream-bubble"><span class="stream-label">${labels[0]}</span><span class="stream-cursor">▋</span></div>`;
  box.appendChild(streamRow);
  wrap.scrollTop = 99999;

  const streamLabel = streamRow.querySelector('.stream-label');
  let labelIdx = 0;
  const labelTimer = setInterval(() => {
    labelIdx = (labelIdx + 1) % labels.length;
    if (streamLabel) streamLabel.textContent = labels[labelIdx];
  }, 1800);

  chatHistory.push({ role: 'user', content: txt });
  saveChatHistory();
  const sendStartTime = Date.now();

  const lc = txt.toLowerCase();
  let key = 'default';
  if (lc.match(/сенсор|перегруз|истерик|наушник|шум|крик|громк|звук|свет|кричит|sensory|overload|meltdown|headphones|noise|loud|scream|шамадан тыс жүктеме|дағдарыс|құлаққап|шу/)) key = 'sensory';
  else if (lc.match(/сон|спит|усталост|ночь|просыпает|не засыпает|вялый|капризн|sleep|tired|night|wake|ұйқы|шаршау|түн/)) key = 'sleep';
  else if (lc.match(/аба|aba|поведен|терапи|бьёт|кусает|царапает|агресс|behavior|therapy|hit|bite|aggress|мінез-құлық|терапия|соғады/)) key = 'aba';
  else if (lc.match(/эрготерапевт|специалист|найти|врач|центр|specialist|therapist|find|doctor|center|маман|дәрігер|орталық/)) key = 'ot';
  else if (lc.match(/не ест|еда|кушает|питание|аппетит|food|eat|appetite|meal|тамақ|тағам|тәбет/)) key = 'food';
  else if (lc.match(/сад|школ|воспитател|учитель|занят|school|kindergarten|teacher|class|мектеп|балабақша|мұғалім/)) key = 'school';

  const respSet = getResp();
  const fb = respSet[key];
  const fallback = {
    detect: fb.detect,
    intro: fb.intro,
    sections: fb.sections,
    followup: fb.followup
  };

  setTimeout(() => {
    clearInterval(labelTimer);
    chatHistory.push({ role: 'assistant', content: JSON.stringify(fallback) });
    saveChatHistory();
    updateRecommendationProfileFromChat();
    streamRow.style.transition = 'opacity 0.2s';
    streamRow.style.opacity = '0';
    setTimeout(() => {
      streamRow.remove();
      const elapsed = ((Date.now() - sendStartTime) / 1000).toFixed(1);
      renderResponse(fallback, box, wrap, elapsed);
    }, 200);
    inp.disabled = false;
    document.querySelector('.send-btn').disabled = false;
    inp.focus();
  }, 650);
}

/* ================= Article viewer overlay ================= */

function openArticle(url, title) {
  const overlay = document.getElementById('article-overlay');
  const iframe  = document.getElementById('article-iframe');
  const loader  = document.getElementById('article-loader');
  const titleEl = document.getElementById('article-topbar-title');
  titleEl.textContent = title || '';
  iframe.className = 'article-iframe';
  loader.classList.remove('hidden');
  iframe.src = url;
  overlay.classList.add('open');
}
function closeArticle() {
  const overlay = document.getElementById('article-overlay');
  const iframe  = document.getElementById('article-iframe');
  overlay.classList.remove('open');
  iframe.src = '';
  iframe.className = 'article-iframe';
}
function hideArticleLoader() {
  const loader = document.getElementById('article-loader');
  const iframe = document.getElementById('article-iframe');
  loader.classList.add('hidden');
  iframe.classList.add('loaded');
}

/* ================= Landing page interactions ================= */

/* ================= Floating header (hide on scroll down, reveal on scroll up) ================= */

(function () {
  const nav = document.querySelector('.landing-nav');
  if (!nav) return;
  let lastY = window.scrollY;
  let ticking = false;
  const REVEAL_THRESHOLD = 8;   // ignore tiny/jittery scroll deltas
  const TOP_ZONE = 40;          // always show the header near the very top

  function update() {
    const y = window.scrollY;
    const delta = y - lastY;

    if (y <= TOP_ZONE) {
      nav.classList.remove('nav-hidden');
    } else if (delta > REVEAL_THRESHOLD) {
      nav.classList.add('nav-hidden');
    } else if (delta < -REVEAL_THRESHOLD) {
      nav.classList.remove('nav-hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* ================= Mobile category menu (landing page) ================= */

function openMobileMenu() {
  document.getElementById('mobile-menu-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  document.getElementById('mobile-menu-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('[data-reveal]');
  if (window.location.hash) revealItems.forEach(item => item.classList.add('revealed'));
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const preorderForm = document.getElementById('preorder-form');
  const preorderStatus = document.getElementById('preorder-status');
  if (preorderForm) {
    preorderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(preorderForm).entries());
      const saved = JSON.parse(localStorage.getItem('qushaq_preorders') || '[]');
      saved.push({ ...data, createdAt: new Date().toISOString(), lang: CURRENT_LANG });
      localStorage.setItem('qushaq_preorders', JSON.stringify(saved));
      notifyPreorder(data);
      preorderForm.reset();
      preorderStatus?.classList.add('show');
    });
  }
});
