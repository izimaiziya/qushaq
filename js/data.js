
const ARTICLE_LIBRARY_BY_LANG = {
ru: [
  { id: 'sensory_sound_light', title: 'Почему дети «перегружаются» от звуков и света', description: 'Что происходит с ребёнком во время сильной перегрузки и почему это не каприз.', category: 'Сенсорика', accent: 'teal', time: '4 мин', badge: 'Новое', badgeClass: 'new', url: 'https://pedsovet.org/article/cto-takoe-sensornaa-peregruzka-u-detej-i-kak-s-nej-rabotat', tags: ['сенсорика','звук','шум','свет','перегрузка','крик'], triggers: ['шум','громкий звук','яркий свет'], goals: ['успокоить','снизить срывы'], diagnoses: ['рас / аутизм','сенсорные нарушения','сдвг'], ageMin: 2, ageMax: 10, priority: 8 },
  { id: 'transitions_switching', title: 'Как помочь ребёнку переключаться между делами', description: 'Конкретные приёмы для снижения истерик при смене занятий.', category: 'Переходы', accent: 'amber', time: '5 мин', url: 'https://moaplaneta.com/%D0%B3%D1%80%D0%B0%D0%BD%D1%82%D1%8B/%D0%B3%D1%80%D0%B0%D0%BD%D1%82%D1%8B-%D0%BA%D1%83%D0%B1%D0%B0%D0%BD%D0%B8/%D0%BD%D0%B0%D0%B2%D1%8B%D0%BA-%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BE%D0%B2-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8-%D1%83-%D0%B4%D0%B5%D1%82/', tags: ['переходы','смена','переключение','распорядок','истерика'], triggers: ['переход между делами','смена обстановки'], goals: ['подготовить','переключить'], diagnoses: ['рас / аутизм','сдвг'], ageMin: 2, ageMax: 9, priority: 7 },
  { id: 'self_harm_head_banging', title: 'Почему дети бьются головой в сложные моменты', description: 'Что это означает и как спокойно и безопасно реагировать.', category: 'Поведение', accent: 'red', time: '6 мин', badge: 'Сохранено', badgeClass: 'saved', url: 'https://letidor.ru/psihologiya/plokhoe-vospitanie-ili-nervnoe-rasstroistvo-chto-delat-esli-rebenok-betsya-golovoi-o-stenu.htm', tags: ['поведение','бьется головой','самоповреждение','срыв'], triggers: ['перегрузка','стресс'], goals: ['безопасность','успокоить'], diagnoses: ['рас / аутизм','сдвг'], ageMin: 2, ageMax: 12, priority: 8 },
  { id: 'communication_break_request', title: 'Научите ребёнка просить перерыв', description: 'Простой жест или карточка, чтобы ребёнок мог попросить о помощи до кризиса.', category: 'Коммуникация', accent: 'blue', time: '4 мин', url: 'https://autismjournal.help/articles/kak-navyk-prosby-o-pereryve-mozhet-uluchshit-povedenie-rebenka', tags: ['коммуникация','просить помощь','перерыв','карточка'], triggers: ['усталость','срыв'], goals: ['научить просить','предотвратить кризис'], diagnoses: ['рас / аутизм','задержка речи'], ageMin: 2, ageMax: 12, priority: 7 },
  { id: 'sleep_and_behavior', title: 'Сон и поведение — прямая связь', description: 'Как выстроить режим сна, который работает для детей с аутизмом.', category: 'Сон', accent: 'purple', time: '5 мин', url: 'https://aba-kurs.com/blog/organizatsiya-sna-i-rezhima-dnya-dlya-rebenka-s-ras/', tags: ['сон','режим','усталость','ночь'], triggers: ['усталость'], goals: ['наладить сон','режим дня'], diagnoses: ['рас / аутизм','сдвг'], ageMin: 2, ageMax: 12, priority: 7 },
  { id: 'sensory_diet_intro', title: 'Что такое сенсорная диета и как её попросить', description: 'Простое объяснение и вопросы, которые стоит задать на первом приёме у ОТ.', category: 'Терапия', accent: 'orange', time: '7 мин', badge: 'Новое', badgeClass: 'new', url: 'https://autism-frc.ru/education/interventions/workingmethods/18', tags: ['терапия','сенсорика','сенсорная диета','эрготерапия','от','поддержка','специалист'], triggers: ['шум','свет','трудности в общественных местах','сенсорная перегрузка'], goals: ['понять терапию','задать вопросы','понять сенсорную диету'], diagnoses: ['рас / аутизм','сенсорные нарушения'], ageMin: 2, ageMax: 12, priority: 10 }
],
en: [
  { id: 'sensory_sound_light', title: 'Why children get "overloaded" by sound and light', description: "What happens to a child during heavy sensory overload, and why it isn't a tantrum.", category: 'Sensory', accent: 'teal', time: '4 min', badge: 'New', badgeClass: 'new', url: 'https://pedsovet.org/article/cto-takoe-sensornaa-peregruzka-u-detej-i-kak-s-nej-rabotat', tags: ['sensory','sound','noise','light','overload','crying'], triggers: ['noise','loud sound','bright light'], goals: ['calm down','reduce meltdowns'], diagnoses: ['asd / autism','sensory issues','adhd'], ageMin: 2, ageMax: 10, priority: 8 },
  { id: 'transitions_switching', title: 'How to help a child switch between activities', description: 'Concrete techniques for reducing meltdowns during activity changes.', category: 'Transitions', accent: 'amber', time: '5 min', url: 'https://moaplaneta.com/%D0%B3%D1%80%D0%B0%D0%BD%D1%82%D1%8B/%D0%B3%D1%80%D0%B0%D0%BD%D1%82%D1%8B-%D0%BA%D1%83%D0%B1%D0%B0%D0%BD%D0%B8/%D0%BD%D0%B0%D0%B2%D1%8B%D0%BA-%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BE%D0%B2-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8-%D1%83-%D0%B4%D0%B5%D1%82/', tags: ['transitions','switching','routine','meltdown'], triggers: ['switching activities','change of setting'], goals: ['prepare','switch'], diagnoses: ['asd / autism','adhd'], ageMin: 2, ageMax: 9, priority: 7 },
  { id: 'self_harm_head_banging', title: 'Why children bang their heads in hard moments', description: 'What it means and how to respond calmly and safely.', category: 'Behavior', accent: 'red', time: '6 min', badge: 'Saved', badgeClass: 'saved', url: 'https://letidor.ru/psihologiya/plokhoe-vospitanie-ili-nervnoe-rasstroistvo-chto-delat-esli-rebenok-betsya-golovoi-o-stenu.htm', tags: ['behavior','head banging','self-harm','meltdown'], triggers: ['overload','stress'], goals: ['safety','calm down'], diagnoses: ['asd / autism','adhd'], ageMin: 2, ageMax: 12, priority: 8 },
  { id: 'communication_break_request', title: 'Teach your child to ask for a break', description: 'A simple gesture or card so a child can ask for help before a crisis.', category: 'Communication', accent: 'blue', time: '4 min', url: 'https://autismjournal.help/articles/kak-navyk-prosby-o-pereryve-mozhet-uluchshit-povedenie-rebenka', tags: ['communication','ask for help','break','card'], triggers: ['tiredness','meltdown'], goals: ['teach to ask','prevent a crisis'], diagnoses: ['asd / autism','speech delay'], ageMin: 2, ageMax: 12, priority: 7 },
  { id: 'sleep_and_behavior', title: 'Sleep and behavior — a direct link', description: 'How to build a sleep routine that works for children with autism.', category: 'Sleep', accent: 'purple', time: '5 min', url: 'https://aba-kurs.com/blog/organizatsiya-sna-i-rezhima-dnya-dlya-rebenka-s-ras/', tags: ['sleep','routine','tiredness','night'], triggers: ['tiredness'], goals: ['fix sleep','daily routine'], diagnoses: ['asd / autism','adhd'], ageMin: 2, ageMax: 12, priority: 7 },
  { id: 'sensory_diet_intro', title: 'What a "sensory diet" is and how to ask for one', description: 'A simple explanation and questions worth asking at your first OT appointment.', category: 'Therapy', accent: 'orange', time: '7 min', badge: 'New', badgeClass: 'new', url: 'https://autism-frc.ru/education/interventions/workingmethods/18', tags: ['therapy','sensory','sensory diet','occupational therapy','ot','support','specialist'], triggers: ['noise','light','difficulty in public places','sensory overload'], goals: ['understand therapy','ask questions','understand a sensory diet'], diagnoses: ['asd / autism','sensory issues'], ageMin: 2, ageMax: 12, priority: 10 }
],
kk: [
  { id: 'sensory_sound_light', title: 'Балалар дыбыс пен жарықтан неге «шамадан асады»', description: 'Күшті сенсорлық шамадан тыс жүктеме кезінде балаға не болады және бұл неге өкпе емес.', category: 'Сенсорика', accent: 'teal', time: '4 мин', badge: 'Жаңа', badgeClass: 'new', url: 'https://pedsovet.org/article/cto-takoe-sensornaa-peregruzka-u-detej-i-kak-s-nej-rabotat', tags: ['сенсорика','дыбыс','шу','жарық','шамадан тыс жүктеме','жылау'], triggers: ['шу','қатты дыбыс','жарқын жарық'], goals: ['сабырландыру','дағдарысты азайту'], diagnoses: ['рас / аутизм','сенсорлық бұзылыстар','сдвг'], ageMin: 2, ageMax: 10, priority: 8 },
  { id: 'transitions_switching', title: 'Баланың бір істен екіншісіне ауысуына қалай көмектесуге болады', description: 'Іс-әрекет ауысқандағы дағдарыстарды азайтудың нақты тәсілдері.', category: 'Ауысулар', accent: 'amber', time: '5 мин', url: 'https://moaplaneta.com/%D0%B3%D1%80%D0%B0%D0%BD%D1%82%D1%8B/%D0%B3%D1%80%D0%B0%D0%BD%D1%82%D1%8B-%D0%BA%D1%83%D0%B1%D0%B0%D0%BD%D0%B8/%D0%BD%D0%B0%D0%B2%D1%8B%D0%BA-%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BE%D0%B2-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%B8%D1%8F%D0%BC%D0%B8-%D1%83-%D0%B4%D0%B5%D1%82/', tags: ['ауысулар','ауысу','ауыстыру','тәртіп','дағдарыс'], triggers: ['іс-әрекеттің ауысуы','ортаның ауысуы'], goals: ['дайындау','ауыстыру'], diagnoses: ['рас / аутизм','сдвг'], ageMin: 2, ageMax: 9, priority: 7 },
  { id: 'self_harm_head_banging', title: 'Балалар неге қиын сәттерде басын соғады', description: 'Бұл нені білдіреді және қалай сабырлы әрі қауіпсіз әрекет ету керек.', category: 'Мінез-құлық', accent: 'red', time: '6 мин', badge: 'Сақталды', badgeClass: 'saved', url: 'https://letidor.ru/psihologiya/plokhoe-vospitanie-ili-nervnoe-rasstroistvo-chto-delat-esli-rebenok-betsya-golovoi-o-stenu.htm', tags: ['мінез-құлық','басын соғады','өзін-өзі зақымдау','дағдарыс'], triggers: ['шамадан тыс жүктеме','стресс'], goals: ['қауіпсіздік','сабырландыру'], diagnoses: ['рас / аутизм','сдвг'], ageMin: 2, ageMax: 12, priority: 8 },
  { id: 'communication_break_request', title: 'Балаңызды үзіліс сұрауға үйретіңіз', description: 'Дағдарысқа дейін бала көмек сұрай алатын қарапайым ым немесе карточка.', category: 'Коммуникация', accent: 'blue', time: '4 мин', url: 'https://autismjournal.help/articles/kak-navyk-prosby-o-pereryve-mozhet-uluchshit-povedenie-rebenka', tags: ['коммуникация','көмек сұрау','үзіліс','карточка'], triggers: ['шаршау','дағдарыс'], goals: ['сұрауға үйрету','дағдарысты болдырмау'], diagnoses: ['рас / аутизм','сөйлеу тежелуі'], ageMin: 2, ageMax: 12, priority: 7 },
  { id: 'sleep_and_behavior', title: 'Ұйқы мен мінез-құлық — тікелей байланыс', description: 'Аутизмі бар балаларға жарамды ұйқы режимін қалай құруға болады.', category: 'Ұйқы', accent: 'purple', time: '5 мин', url: 'https://aba-kurs.com/blog/organizatsiya-sna-i-rezhima-dnya-dlya-rebenka-s-ras/', tags: ['ұйқы','режим','шаршау','түн'], triggers: ['шаршау'], goals: ['ұйқыны реттеу','күн тәртібі'], diagnoses: ['рас / аутизм','сдвг'], ageMin: 2, ageMax: 12, priority: 7 },
  { id: 'sensory_diet_intro', title: 'Сенсорлық диета деген не және оны қалай сұрау керек', description: 'Эрготерапевттің алғашқы қабылдауында қоятын қарапайым түсіндірме және сұрақтар.', category: 'Терапия', accent: 'orange', time: '7 мин', badge: 'Жаңа', badgeClass: 'new', url: 'https://autism-frc.ru/education/interventions/workingmethods/18', tags: ['терапия','сенсорика','сенсорлық диета','эрготерапия','қолдау','маман'], triggers: ['шу','жарық','қоғамдық орындардағы қиындықтар','сенсорлық шамадан тыс жүктеме'], goals: ['терапияны түсіну','сұрақ қою','сенсорлық диетаны түсіну'], diagnoses: ['рас / аутизм','сенсорлық бұзылыстар'], ageMin: 2, ageMax: 12, priority: 10 }
]
};

function getArticleLibrary() {
  return ARTICLE_LIBRARY_BY_LANG[CURRENT_LANG] || ARTICLE_LIBRARY_BY_LANG.ru;
}

const PROFILE_RULES = [
  { bucket: 'topics', value: 'сенсорика', patterns: [/сенсор/i, /шум/i, /громк/i, /звук/i, /свет/i, /закрыва[ею]т уши/i, /перегруз/i, /sensory/i, /noise/i, /loud/i, /light/i, /overload/i, /сенсор/i, /шу/i, /дыбыс/i, /жарық/i, /шамадан тыс жүктеме/i] },
  { bucket: 'topics', value: 'переходы', patterns: [/переход/i, /переключ/i, /смен[аы] занятий/i, /смен[аы] обстанов/i, /transition/i, /switch/i, /ауысу/i] },
  { bucket: 'topics', value: 'поведение', patterns: [/истерик/i, /бь[её]тся головой/i, /кричит/i, /срыв/i, /агрес/i, /самоповреж/i, /meltdown/i, /head.?bang/i, /aggress/i, /дағдарыс/i, /басын соғ/i] },
  { bucket: 'topics', value: 'коммуникация', patterns: [/не говорит/i, /не просит/i, /карточк/i, /жест/i, /перерыв/i, /коммуникац/i, /communicat/i, /card/i, /break/i, /үзіліс/i, /карточка/i] },
  { bucket: 'topics', value: 'сон', patterns: [/сон/i, /не спит/i, /просыпа/i, /ноч/i, /режим/i, /устал/i, /sleep/i, /night/i, /tired/i, /ұйқы/i, /шаршау/i] },
  { bucket: 'triggers', value: 'шум', patterns: [/шум/i, /громк/i, /звук/i, /музык/i, /объявлен/i, /noise/i, /loud/i, /sound/i, /music/i, /шу/i, /дыбыс/i] },
  { bucket: 'triggers', value: 'яркий свет', patterns: [/свет/i, /ярк/i, /light/i, /bright/i, /жарық/i] },
  { bucket: 'triggers', value: 'много людей', patterns: [/люд/i, /толп/i, /магазин/i, /обществен/i, /crowd/i, /people/i, /shop/i, /адам/i, /дүкен/i] },
  { bucket: 'triggers', value: 'смена обстановки', patterns: [/смен[аы] обстанов/i, /новое место/i, /new place/i, /setting/i, /ортаның ауысуы/i] },
  { bucket: 'triggers', value: 'переход между делами', patterns: [/переход/i, /переключ/i, /switch/i, /transition/i, /ауысу/i] },
  { bucket: 'triggers', value: 'усталость', patterns: [/устал/i, /сон/i, /вечер/i, /утом/i, /tired/i, /evening/i, /шаршау/i] },
  { bucket: 'goals', value: 'успокоить', patterns: [/что делать/i, /как помочь/i, /успоко/i, /снизить/i, /what to do/i, /how to help/i, /calm/i, /не істеу/i, /сабырландыру/i] },
  { bucket: 'goals', value: 'предотвратить кризис', patterns: [/предотврат/i, /заранее/i, /до кризиса/i, /prevent/i, /before crisis/i, /болдырмау/i] },
  { bucket: 'goals', value: 'наладить сон', patterns: [/сон/i, /режим/i, /уложить/i, /sleep/i, /routine/i, /ұйқы/i] },
  { bucket: 'goals', value: 'научить просить', patterns: [/просить/i, /сказать/i, /объяснить/i, /карточк/i, /жест/i, /ask/i, /explain/i, /сұрау/i] },
  { bucket: 'goals', value: 'понять терапию', patterns: [/что такое/i, /объясн/i, /сенсорн(ая|ую|ой) диет/i, /эрготерап/i, /what is/i, /explain/i, /occupational therap/i, /терапия/i] }
];

const DIAGNOSIS_IDS = ['asd','adhd','speech','sensory','devdelay','downs','none','other'];
function diagLabel(diagId) {
  const map = {
    asd: 'onboard.diag1', adhd: 'onboard.diag2', speech: 'onboard.diag3',
    sensory: 'onboard.diag4', devdelay: 'onboard.diag5', downs: 'onboard.diag6',
    none: 'onboard.diag7', other: 'onboard.diag8'
  };
  return t(map[diagId] || 'onboard.diag8');
}

function makeWorkThumb(bg, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect width="88" height="88" rx="20" fill="${bg}"/><text x="44" y="50" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700" fill="#4B5563">${label}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}
function makeWorkAvatar(label, bg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="${bg}"/><text x="48" y="53" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" fill="#5A535F">${label}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

const WORK_JOBS_BY_LANG = {
ru: [
  { id: 'english-tutor', tab: 'all', section: 'today', title: 'Репетитор английского', price: '16000 tg', action: 'details', thumbKey: 'en',
    details: { amount: '16000 тенге', date: '30 мая 2023', code: '5242124422', description: 'Нужен репетитор английского для мальчика 7 лет, три раза в неделю, оплата после каждого занятия, уровень Pre-Intermediate, удобное время - 10:00.', customer: 'Sasha Trusova', phone: '+7 7757264894', city: 'Актобе', since: '30 мая 2021', avatarKey: 'ST' } },
  { id: 'dress-order', tab: 'all', section: 'today', title: 'Пошив платья на заказ', price: '20000 tg', action: 'disabled', thumbKey: 'dress' },
  { id: 'translator', tab: 'all', section: 'yesterday', title: 'Нужен переводчик на 2 часа!', price: '15000 tg', action: 'details', thumbKey: 'en',
    details: { amount: '15000 tenge', date: '2 мая 2025', code: '6615182480', description: 'Нужен переводчик на 2 часа для встречи. Английский и русский, офис в центре, оплата сразу после выполнения.', customer: 'Aigerim N.', phone: '+7 7025550142', city: 'Алматы', since: '11 января 2022', avatarKey: 'AN' } },
  { id: 'cookies', tab: 'all', section: 'yesterday', title: 'Домашнее печенье', price: '5000 tg', action: 'details', thumbKey: 'cookie',
    details: { amount: '5000 tenge', date: '12 января 2023', code: '3002181182', description: 'Нужно домашнее печенье для небольшого семейного мероприятия. Доставка к вечеру, только классические вкусы.', customer: 'Madina K.', phone: '+7 7073101254', city: 'Астана', since: '5 октября 2020', avatarKey: 'MK' } },
  { id: 'time-planner', tab: 'all', section: 'yesterday', title: 'Тайм-планер', price: '7800 tg', action: 'disabled', thumbKey: 'planner' },
  { id: 'cupcakes', tab: 'others', section: 'today', title: 'Нужны капкейки', price: '13000 tg', action: 'details', thumbKey: 'cupcake',
    details: { amount: '13000 tenge', date: '4 мая 2023', code: '8124401174', description: 'Нужны капкейки на день рождения. Двенадцать штук, пастельное оформление, забрать вечером.', customer: 'Dana S.', phone: '+7 7472801941', city: 'Караганда', since: '18 марта 2021', avatarKey: 'DS' } },
  { id: 'smm-manager', tab: 'others', section: 'today', title: 'Онлайн SMM-менеджер', price: '20000 tg', action: 'details', thumbKey: 'smm',
    details: { amount: '20000 tenge', date: '4 мая 2023', code: '9027711118', description: 'Нужен онлайн SMM-менеджер для небольшого магазина. Публикация сторис, простой дизайн, ответы на сообщения в будни.', customer: 'Saltanat B.', phone: '+7 7011264188', city: 'Шымкент', since: '2 июня 2022', avatarKey: 'SB' } },
  { id: 'gloves', tab: 'others', section: 'earlier', title: 'Пошив перчаток', price: '5000 tg', action: 'details', thumbKey: 'gloves',
    details: { amount: '5000 tenge', date: '3 мая 2023', code: '4721184410', description: 'Нужна тёплая пара перчаток из мягкой ткани. Простой дизайн, без украшений.', customer: 'Aruzhan T.', phone: '+7 7086334411', city: 'Костанай', since: '8 февраля 2021', avatarKey: 'AT' } },
  { id: 'canva', tab: 'others', section: 'earlier', title: 'Графический дизайн в Canva', price: '9000 tg', action: 'disabled', thumbKey: 'canva' },
  { id: 'my-english', tab: 'my', section: 'earlier', title: 'Репетитор английского', price: '25000 tg', action: 'paid', thumbKey: 'en' },
  { id: 'my-cupcakes', tab: 'my', section: 'earlier', title: 'Capcakes', price: '7500 tg', action: 'paid', thumbKey: 'cupcake' }
],
en: [
  { id: 'english-tutor', tab: 'all', section: 'today', title: 'English tutor', price: '16000 tg', action: 'details', thumbKey: 'en',
    details: { amount: '16,000 tenge', date: 'May 30, 2023', code: '5242124422', description: 'Looking for an English tutor for a 7-year-old boy, three times a week, paid after each lesson, Pre-Intermediate level, convenient time - 10:00.', customer: 'Sasha Trusova', phone: '+7 7757264894', city: 'Aktobe', since: 'May 30, 2021', avatarKey: 'ST' } },
  { id: 'dress-order', tab: 'all', section: 'today', title: 'Custom dress sewing', price: '20000 tg', action: 'disabled', thumbKey: 'dress' },
  { id: 'translator', tab: 'all', section: 'yesterday', title: 'Need a translator for 2 hours!', price: '15000 tg', action: 'details', thumbKey: 'en',
    details: { amount: '15,000 tenge', date: 'May 2, 2025', code: '6615182480', description: 'Need a translator for a 2-hour meeting. English and Russian, office downtown, paid right after.', customer: 'Aigerim N.', phone: '+7 7025550142', city: 'Almaty', since: 'January 11, 2022', avatarKey: 'AN' } },
  { id: 'cookies', tab: 'all', section: 'yesterday', title: 'Homemade cookies', price: '5000 tg', action: 'details', thumbKey: 'cookie',
    details: { amount: '5,000 tenge', date: 'January 12, 2023', code: '3002181182', description: 'Need homemade cookies for a small family event. Delivery by evening, classic flavors only.', customer: 'Madina K.', phone: '+7 7073101254', city: 'Astana', since: 'October 5, 2020', avatarKey: 'MK' } },
  { id: 'time-planner', tab: 'all', section: 'yesterday', title: 'Time planner', price: '7800 tg', action: 'disabled', thumbKey: 'planner' },
  { id: 'cupcakes', tab: 'others', section: 'today', title: 'Need cupcakes', price: '13000 tg', action: 'details', thumbKey: 'cupcake',
    details: { amount: '13,000 tenge', date: 'May 4, 2023', code: '8124401174', description: 'Need cupcakes for a birthday. Twelve pieces, pastel decoration, pickup in the evening.', customer: 'Dana S.', phone: '+7 7472801941', city: 'Karaganda', since: 'March 18, 2021', avatarKey: 'DS' } },
  { id: 'smm-manager', tab: 'others', section: 'today', title: 'Online SMM manager', price: '20000 tg', action: 'details', thumbKey: 'smm',
    details: { amount: '20,000 tenge', date: 'May 4, 2023', code: '9027711118', description: 'Need an online SMM manager for a small shop. Posting stories, simple design, answering messages on weekdays.', customer: 'Saltanat B.', phone: '+7 7011264188', city: 'Shymkent', since: 'June 2, 2022', avatarKey: 'SB' } },
  { id: 'gloves', tab: 'others', section: 'earlier', title: 'Custom glove sewing', price: '5000 tg', action: 'details', thumbKey: 'gloves',
    details: { amount: '5,000 tenge', date: 'May 3, 2023', code: '4721184410', description: 'Need a warm pair of gloves sewn from soft fabric. Simple design, no decorations.', customer: 'Aruzhan T.', phone: '+7 7086334411', city: 'Kostanay', since: 'February 8, 2021', avatarKey: 'AT' } },
  { id: 'canva', tab: 'others', section: 'earlier', title: 'Graphic design in Canva', price: '9000 tg', action: 'disabled', thumbKey: 'canva' },
  { id: 'my-english', tab: 'my', section: 'earlier', title: 'English tutor', price: '25000 tg', action: 'paid', thumbKey: 'en' },
  { id: 'my-cupcakes', tab: 'my', section: 'earlier', title: 'Cupcakes', price: '7500 tg', action: 'paid', thumbKey: 'cupcake' }
],
kk: [
  { id: 'english-tutor', tab: 'all', section: 'today', title: 'Ағылшын тілінен репетитор', price: '16000 tg', action: 'details', thumbKey: 'en',
    details: { amount: '16000 теңге', date: '2023 ж. 30 мамыр', code: '5242124422', description: '7 жастағы ұл балаға ағылшын тілінен репетитор керек, аптасына үш рет, әр сабақтан кейін төлем, Pre-Intermediate деңгейі, ыңғайлы уақыты - 10:00.', customer: 'Sasha Trusova', phone: '+7 7757264894', city: 'Ақтөбе', since: '2021 ж. 30 мамыр', avatarKey: 'ST' } },
  { id: 'dress-order', tab: 'all', section: 'today', title: 'Тапсырыспен көйлек тігу', price: '20000 tg', action: 'disabled', thumbKey: 'dress' },
  { id: 'translator', tab: 'all', section: 'yesterday', title: '2 сағатқа аудармашы керек!', price: '15000 tg', action: 'details', thumbKey: 'en',
    details: { amount: '15000 теңге', date: '2025 ж. 2 мамыр', code: '6615182480', description: 'Кездесуге 2 сағатқа аудармашы керек. Ағылшын және орыс тілдері, орталықтағы кеңсе, орындалғаннан кейін бірден төлем.', customer: 'Aigerim N.', phone: '+7 7025550142', city: 'Алматы', since: '2022 ж. 11 қаңтар', avatarKey: 'AN' } },
  { id: 'cookies', tab: 'all', section: 'yesterday', title: 'Үй жасаған печенье', price: '5000 tg', action: 'details', thumbKey: 'cookie',
    details: { amount: '5000 теңге', date: '2023 ж. 12 қаңтар', code: '3002181182', description: 'Шағын отбасылық іс-шараға үй жасаған печенье керек. Кешке дейін жеткізу, тек классикалық дәмдер.', customer: 'Madina K.', phone: '+7 7073101254', city: 'Астана', since: '2020 ж. 5 қазан', avatarKey: 'MK' } },
  { id: 'time-planner', tab: 'all', section: 'yesterday', title: 'Уақыт жоспарлағышы', price: '7800 tg', action: 'disabled', thumbKey: 'planner' },
  { id: 'cupcakes', tab: 'others', section: 'today', title: 'Капкейктер керек', price: '13000 tg', action: 'details', thumbKey: 'cupcake',
    details: { amount: '13000 теңге', date: '2023 ж. 4 мамыр', code: '8124401174', description: 'Туған күнге капкейктер керек. Он екі дана, пастель безендіру, кешке алу.', customer: 'Dana S.', phone: '+7 7472801941', city: 'Қарағанды', since: '2021 ж. 18 наурыз', avatarKey: 'DS' } },
  { id: 'smm-manager', tab: 'others', section: 'today', title: 'Онлайн SMM-менеджер', price: '20000 tg', action: 'details', thumbKey: 'smm',
    details: { amount: '20000 теңге', date: '2023 ж. 4 мамыр', code: '9027711118', description: 'Шағын дүкенге онлайн SMM-менеджер керек. Сторис жариялау, қарапайым дизайн, жұмыс күндері хабарламаларға жауап беру.', customer: 'Saltanat B.', phone: '+7 7011264188', city: 'Шымкент', since: '2022 ж. 2 маусым', avatarKey: 'SB' } },
  { id: 'gloves', tab: 'others', section: 'earlier', title: 'Қолғап тігу', price: '5000 tg', action: 'details', thumbKey: 'gloves',
    details: { amount: '5000 теңге', date: '2023 ж. 3 мамыр', code: '4721184410', description: 'Жұмсақ маталы жылы қолғап керек. Қарапайым дизайн, әшекейсіз.', customer: 'Aruzhan T.', phone: '+7 7086334411', city: 'Қостанай', since: '2021 ж. 8 ақпан', avatarKey: 'AT' } },
  { id: 'canva', tab: 'others', section: 'earlier', title: 'Canva-да графикалық дизайн', price: '9000 tg', action: 'disabled', thumbKey: 'canva' },
  { id: 'my-english', tab: 'my', section: 'earlier', title: 'Ағылшын тілінен репетитор', price: '25000 tg', action: 'paid', thumbKey: 'en' },
  { id: 'my-cupcakes', tab: 'my', section: 'earlier', title: 'Капкейктер', price: '7500 tg', action: 'paid', thumbKey: 'cupcake' }
]
};

function getWorkJobs() {
  return WORK_JOBS_BY_LANG[CURRENT_LANG] || WORK_JOBS_BY_LANG.ru;
}
function workThumb(key) { return makeWorkThumb(
  { en:'#DCE8FF', dress:'#FFE6E1', cookie:'#F7E7E7', planner:'#E7F7F5', cupcake:'#FFF0DE', smm:'#E5F4FF', gloves:'#F2ECE4', canva:'#EAF7F0' }[key] || '#EEE',
  { en:'EN', dress:'SEW', cookie:'CK', planner:'TP', cupcake:'CUP', smm:'SMM', gloves:'GL', canva:'CV' }[key] || ''
); }

const RESP_BY_LANG = {
ru: {
  default: { detect: 'Анализирую ситуацию', intro: 'Я слышу вас. Давайте разберём вместе — это поможет найти точный ответ.',
    sections: [
      { color:'purple', title:'На что обратить внимание', type:'bullets', items:['• Когда именно происходит — время дня, место, ситуация', '• Что было до этого — усталость, смена обстановки, еда', '• Как долго это продолжается и как часто повторяется'] },
      { color:'teal', title:'Что делать прямо сейчас', type:'steps', items:['Сохраняйте спокойствие — ребёнок чувствует ваше состояние', 'Не объясняйте и не уговаривайте в момент срыва', 'Опишите мне подробнее — я дам точные рекомендации'] },
      { color:'blue', title:'Полезно знать', type:'bullets', items:['• Большинство трудных ситуаций имеют конкретную причину', '• Чем больше деталей — тем точнее я смогу помочь'] }
    ], followup: 'Расскажите подробнее: что именно происходит и в какой момент?' },
  food: { detect: 'Трудности с едой — частая ситуация при сенсорных особенностях', intro: 'Отказ от еды у детей с сенсорными особенностями — это не каприз. Вкус, запах, текстура могут быть физически невыносимы.',
    sections: [
      { color:'purple', title:'Почему это происходит', type:'bullets', items:['• Сенсорная чувствительность к текстуре, запаху или виду еды', '• Тревога и стресс подавляют аппетит', '• Жёсткий режим — ребёнок ест только «свои» продукты'] },
      { color:'teal', title:'Что помогает прямо сейчас', type:'steps', items:['Не заставляйте и не уговаривайте — это усиливает отвращение', 'Предложите знакомые «безопасные» продукты без давления', 'Пусть ребёнок просто сидит за столом — без требования есть'] },
      { color:'blue', title:'На будущее', type:'bullets', items:['• Медленно вводите новые продукты рядом с любимыми — без принуждения', '• Эрготерапевт может помочь с «расширением» рациона'] }
    ], followup: 'Ребёнок полностью отказывается от новой еды или есть определённые продукты, которые он ест?' },
  school: { detect: 'Трудности в саду или школе', intro: 'Сложное поведение в саду или школе часто связано с перегрузкой — слишком много людей, звуков и требований одновременно.',
    sections: [
      { color:'purple', title:'Почему это происходит', type:'bullets', items:['• Шум, яркий свет, тесное пространство — накапливается за день', '• Смена деятельности без предупреждения вызывает тревогу', '• Социальные требования истощают быстрее, чем кажется'] },
      { color:'teal', title:'Что делать прямо сейчас', type:'steps', items:['После сада дайте 30–40 минут «разгрузки» — тихо, без вопросов', 'Не расспрашивайте сразу «как прошёл день»', 'Поговорите с воспитателем о сенсорных триггерах'] },
      { color:'blue', title:'На будущее', type:'bullets', items:['• Попросите «тихое место» в группе, куда ребёнок может уйти', '• Визуальное расписание дня снижает тревогу от неожиданностей'] }
    ], followup: 'Это происходит каждый день или в определённые дни / ситуации?' },
  sensory: { detect: 'Резкий громкий звук — сенсорная перегрузка', intro: 'Похоже, это была сенсорная перегрузка от резкого звука. Для ребёнка это не каприз — его нервная система реагирует острее, чем у большинства детей.',
    sections: [
      { color:'purple', title:'Почему это происходит', type:'bullets', items:['• Удары головой — способ справиться с перегрузкой, не агрессия', '• Обычные наушники снижают общий шум, но не блокируют резкие внезапные звуки'] },
      { color:'teal', title:'Что помогает прямо сейчас', type:'steps', items:['Спокойно уйдите в тихое место — не торопитесь', 'Помолчите рядом — не объясняйте и не уговаривайте', 'Если бьётся — тихо скажите <strong>«руки отдыхают»</strong> один раз'] },
      { color:'blue', title:'На будущее', type:'bullets', items:['• <strong>Наушники с шумоподавлением</strong> — специально для резких звуков', '• Надевайте <strong>до входа</strong> в шумное место, не после'] }
    ], followup: 'Это случилось сразу после объявления или напряжение накапливалось до этого?' },
  sleep: { detect: 'Возможно, связано с качеством сна', intro: 'Плохой сон сильно влияет на то, как ребёнок справляется со сложными ситуациями в течение дня.',
    sections: [
      { color:'purple', title:'Почему это происходит', type:'bullets', items:['• Даже одна неспокойная ночь повышает чувствительность к стрессу', '• Свет или шум ночью могут мешать глубокому сну'] },
      { color:'teal', title:'Что помогает прямо сейчас', type:'steps', items:['Сохраняйте одинаковое время подъёма — даже после сложной ночи', 'Сегодня вечером: затемните комнату и включите белый шум', 'Уберите экраны за 30 минут до сна'] },
      { color:'blue', title:'На будущее', type:'bullets', items:['• Одинаковое время подъёма каждый день — включая выходные', '• Попробуйте простой ритуал перед сном в картинках (3–4 шага)'] }
    ], followup: 'Ребёнку трудно уснуть вечером или он просыпается среди ночи?' },
  aba: { detect: 'Возможно, нет способа попросить перерыв', intro: 'Скорее всего, у ребёнка пока нет простого способа сказать «мне нужно остановиться». Сложное поведение — это его язык.',
    sections: [
      { color:'purple', title:'Почему это происходит', type:'bullets', items:['• Нет простого способа сказать «мне нужен перерыв»', '• Сложное поведение — единственный доступный ему сигнал'] },
      { color:'teal', title:'Что помогает прямо сейчас', type:'steps', items:['Введите простой сигнал «хочу перерыв» — карточка или жест', 'Реагируйте сразу каждый раз, когда он его использует', 'Хвалите конкретно: <strong>«Молодец, что показал карточку»</strong>'] },
      { color:'blue', title:'На будущее', type:'bullets', items:['• Практикуйте сигнал в спокойные моменты — не во время срыва', '• Стоит найти специалиста с опытом в сенсорных особенностях'] }
    ], followup: 'Бывало ли, что ребёнок по-своему давал понять, что ему нужна пауза?' },
  ot: { detect: 'Возможно, поможет специалист по сенсорике', intro: 'Эрготерапевт (ОТ-специалист) может составить личный план именно для ребёнка — это намного эффективнее общих рекомендаций.',
    sections: [
      { color:'purple', title:'Почему это стоит попробовать', type:'bullets', items:['• Общие советы часто не подходят — нужна оценка именно вашего ребёнка', '• Без плана сложно понять, что реально помогает'] },
      { color:'teal', title:'С чего начать', type:'steps', items:['Попросите педиатра направление к эрготерапевту', 'Попробуйте центр <strong>Мүмкіндік</strong> или <strong>BrainChild Clinic</strong>', 'Возьмите на первый приём записи последних 3–5 сложных ситуаций'] },
      { color:'blue', title:'Что спросить специалиста', type:'bullets', items:['• «Используете ли вы метод сенсорной интеграции Айрес?»', '• «Можно получить сенсорный план для дома?»'] }
    ], followup: 'Ребёнок уже проходил оценку у эрготерапевта или это будет впервые?' }
},
en: {
  default: { detect: 'Analyzing the situation', intro: "I hear you. Let's work through this together — it'll help us find the right answer.",
    sections: [
      { color:'purple', title:'What to pay attention to', type:'bullets', items:['• Exactly when it happens — time of day, place, situation', '• What came before it — tiredness, a change of setting, food', '• How long it lasts and how often it repeats'] },
      { color:'teal', title:'What to do right now', type:'steps', items:['Stay calm — your child can feel your state', "Don't explain or reason during the meltdown itself", 'Describe it to me in more detail — I can give precise recommendations'] },
      { color:'blue', title:'Good to know', type:'bullets', items:['• Most hard situations have a specific cause', '• The more detail you give, the more precisely I can help'] }
    ], followup: 'Tell me more: exactly what happens and at what moment?' },
  food: { detect: 'Trouble with food — common with sensory differences', intro: "A child with sensory differences refusing food isn't a tantrum. Taste, smell and texture can be physically unbearable.",
    sections: [
      { color:'purple', title:'Why this happens', type:'bullets', items:['• Sensory sensitivity to texture, smell or the look of food', '• Anxiety and stress suppress appetite', '• A rigid routine — the child eats only their "safe" foods'] },
      { color:'teal', title:'What helps right now', type:'steps', items:["Don't force or persuade — that increases aversion", 'Offer familiar "safe" foods without pressure', 'Let the child simply sit at the table — no requirement to eat'] },
      { color:'blue', title:'For the future', type:'bullets', items:['• Slowly introduce new foods next to favorites — without pressure', '• An occupational therapist can help "expand" the diet'] }
    ], followup: 'Does the child refuse new food entirely, or are there specific foods they do eat?' },
  school: { detect: 'Trouble at daycare or school', intro: 'Difficult behavior at daycare or school is often linked to overload — too many people, sounds and demands at once.',
    sections: [
      { color:'purple', title:'Why this happens', type:'bullets', items:['• Noise, bright light, cramped space — it builds up over the day', '• Switching activities without warning causes anxiety', '• Social demands drain energy faster than it seems'] },
      { color:'teal', title:'What to do right now', type:'steps', items:['After daycare give 30–40 minutes to "decompress" — quiet, no questions', 'Avoid asking "how was your day" right away', 'Talk to the teacher about sensory triggers'] },
      { color:'blue', title:'For the future', type:'bullets', items:['• Ask for a "quiet corner" in the group the child can retreat to', '• A visual daily schedule reduces anxiety about surprises'] }
    ], followup: 'Does this happen every day, or on certain days / in specific situations?' },
  sensory: { detect: 'A sudden loud sound — sensory overload', intro: "This sounds like sensory overload from a sudden loud sound. It isn't a tantrum for your child — their nervous system reacts more sharply than most children's.",
    sections: [
      { color:'purple', title:'Why this happens', type:'bullets', items:['• Head-banging is a way to cope with overload, not aggression', '• Regular headphones reduce general noise but don\'t block sudden loud sounds'] },
      { color:'teal', title:'What helps right now', type:'steps', items:["Calmly move to a quiet place — don't rush", "Stay quiet beside them — don't explain or reason", 'If they bang their head — quietly say <strong>"hands rest"</strong> once'] },
      { color:'blue', title:'For the future', type:'bullets', items:['• <strong>Noise-cancelling headphones</strong> — specifically for sudden sounds', '• Put them on <strong>before</strong> entering a noisy place, not after'] }
    ], followup: 'Did this happen right after the announcement, or was tension building before that?' },
  sleep: { detect: 'This may be related to sleep quality', intro: 'Poor sleep strongly affects how a child copes with difficult situations during the day.',
    sections: [
      { color:'purple', title:'Why this happens', type:'bullets', items:['• Even one restless night raises sensitivity to stress', '• Light or noise at night can disrupt deep sleep'] },
      { color:'teal', title:'What helps right now', type:'steps', items:['Keep the same wake-up time — even after a hard night', 'Tonight: darken the room and turn on white noise', 'Remove screens 30 minutes before bed'] },
      { color:'blue', title:'For the future', type:'bullets', items:['• Same wake-up time every day — including weekends', '• Try a simple picture-based bedtime routine (3–4 steps)'] }
    ], followup: 'Does the child struggle to fall asleep at night, or do they wake up in the middle of the night?' },
  aba: { detect: "Maybe there's no way to ask for a break", intro: 'Most likely, the child doesn\'t yet have a simple way to say "I need to stop." Difficult behavior is their language.',
    sections: [
      { color:'purple', title:'Why this happens', type:'bullets', items:['• There\'s no simple way to say "I need a break"', '• Difficult behavior is the only signal available to them'] },
      { color:'teal', title:'What helps right now', type:'steps', items:['Introduce a simple "I want a break" signal — a card or gesture', 'Respond immediately every time they use it', 'Praise it specifically: <strong>"Great job showing the card"</strong>'] },
      { color:'blue', title:'For the future', type:'bullets', items:['• Practice the signal during calm moments — not during a meltdown', "• It's worth finding a specialist experienced with sensory differences"] }
    ], followup: 'Has the child ever shown, in their own way, that they needed a pause?' },
  ot: { detect: 'A sensory specialist could help', intro: 'An occupational therapist (OT) can create a personal plan just for your child — that\'s far more effective than general advice.',
    sections: [
      { color:'purple', title:'Why it\'s worth trying', type:'bullets', items:["• General advice often doesn't fit — your child needs their own assessment", "• Without a plan it's hard to know what actually helps"] },
      { color:'teal', title:'Where to start', type:'steps', items:['Ask the pediatrician for a referral to an occupational therapist', 'Try a center that specializes in sensory support', 'Bring notes from the last 3–5 difficult situations to the first visit'] },
      { color:'blue', title:'What to ask the specialist', type:'bullets', items:['• "Do you use the Ayres Sensory Integration method?"', '• "Can we get a sensory plan for home?"'] }
    ], followup: 'Has the child already had an OT assessment, or would this be the first one?' }
},
kk: {
  default: { detect: 'Жағдайды талдап жатырмын', intro: 'Сізді естіп тұрмын. Бірге қарастырайық — бұл дәл жауап табуға көмектеседі.',
    sections: [
      { color:'purple', title:'Неге назар аудару керек', type:'bullets', items:['• Дәл қашан болады — күн уақыты, орын, жағдай', '• Алдында не болды — шаршау, ортаның ауысуы, тамақ', '• Бұл қанша уақыт жалғасады және қаншалықты жиі қайталанады'] },
      { color:'teal', title:'Дәл қазір не істеу керек', type:'steps', items:['Сабырлы болыңыз — бала сіздің жағдайыңызды сезінеді', 'Дағдарыс сәтінде түсіндірмеңіз және көндірмеңіз', 'Маған толығырақ айтыңыз — нақты ұсыныстар беремін'] },
      { color:'blue', title:'Білу пайдалы', type:'bullets', items:['• Қиын жағдайлардың көбінің нақты себебі болады', '• Толық ақпарат болса, көмек те дәл болады'] }
    ], followup: 'Толығырақ айтыңызшы: нақты не болып жатыр және қай сәтте?' },
  food: { detect: 'Тамақпен қиындықтар — сенсорлық ерекшеліктерде жиі кездеседі', intro: 'Сенсорлық ерекшелігі бар балалардың тамақтан бас тартуы — өкпе емес. Дәм, иіс, құрылым дене жағынан төзгісіз болуы мүмкін.',
    sections: [
      { color:'purple', title:'Бұл неге болады', type:'bullets', items:['• Тамақтың құрылымына, иісіне немесе түріне сенсорлық сезімталдық', '• Мазасыздық пен стресс тәбетті басады', '• Қатаң тәртіп — бала тек «өз» тағамдарын жейді'] },
      { color:'teal', title:'Дәл қазір не көмектеседі', type:'steps', items:['Мәжбүрлемеңіз және көндірмеңіз — бұл жиіркенішті күшейтеді', 'Қысымсыз таныс «қауіпсіз» тағамдарды ұсыныңыз', 'Бала үстел басында жай отырсын — жеу талап етілмесін'] },
      { color:'blue', title:'Болашаққа', type:'bullets', items:['• Жаңа тағамдарды сүйіктілерінің қасына мәжбүрлемей, баяу енгізіңіз', '• Эрготерапевт рационды «кеңейтуге» көмектесе алады'] }
    ], followup: 'Бала жаңа тамақтан толық бас тарта ма, әлде жейтін белгілі тағамдары бар ма?' },
  school: { detect: 'Балабақшада немесе мектепте қиындықтар', intro: 'Балабақша немесе мектептегі қиын мінез-құлық көбіне шамадан тыс жүктемеге байланысты — бір мезгілде тым көп адам, дыбыс және талап.',
    sections: [
      { color:'purple', title:'Бұл неге болады', type:'bullets', items:['• Шу, жарқын жарық, тар кеңістік — күн бойы жинақталады', '• Ескертусіз іс-әрекет ауысуы мазасыздық тудырады', '• Әлеуметтік талаптар көрінгеннен тезірек шаршатады'] },
      { color:'teal', title:'Дәл қазір не істеу керек', type:'steps', items:['Балабақшадан кейін 30–40 минут «босаңсуға» уақыт беріңіз — тыныш, сұрақсыз', '«Күнің қалай өтті» деп бірден сұрамаңыз', 'Тәрбиешімен сенсорлық тудырғыштар туралы сөйлесіңіз'] },
      { color:'blue', title:'Болашаққа', type:'bullets', items:['• Топта бала бара алатын «тыныш бұрыш» сұраңыз', '• Күннің көрнекі кестесі күтпеген жағдайлардан мазасыздықты азайтады'] }
    ], followup: 'Бұл күн сайын бола ма, әлде белгілі күндерде / жағдайларда ма?' },
  sensory: { detect: 'Кенеттен қатты дыбыс — сенсорлық шамадан тыс жүктеме', intro: 'Бұл кенеттен қатты дыбыстан болған сенсорлық шамадан тыс жүктеме сияқты. Бала үшін бұл өкпе емес — оның жүйке жүйесі көптеген балалардан гөрі күштірек әрекет етеді.',
    sections: [
      { color:'purple', title:'Бұл неге болады', type:'bullets', items:['• Басын соғу — шамадан тыс жүктемемен күресу тәсілі, агрессия емес', '• Әдеттегі құлаққаптар жалпы шуды азайтады, бірақ кенеттен қатты дыбыстарды бөгемейді'] },
      { color:'teal', title:'Дәл қазір не көмектеседі', type:'steps', items:['Асықпай тыныш жерге барыңыз', 'Қасында үндемей отырыңыз — түсіндірмеңіз, көндірмеңіз', 'Егер басын соқса — бір рет тыныш «қолдар дем алады» деп айтыңыз'] },
      { color:'blue', title:'Болашаққа', type:'bullets', items:['• <strong>Шуды басатын құлаққап</strong> — арнайы кенеттен дыбыстарға', '• Шулы жерге кірер алдында тағыңыз, кейін емес'] }
    ], followup: 'Бұл хабарландырудан кейін бірден болды ма, әлде кернеу бұрыннан жиналған ба?' },
  sleep: { detect: 'Мүмкін, бұл ұйқы сапасына байланысты', intro: 'Нашар ұйқы баланың күн бойы қиын жағдайлармен қалай күресетініне қатты әсер етеді.',
    sections: [
      { color:'purple', title:'Бұл неге болады', type:'bullets', items:['• Тыныш өтпеген бір түн де стреске сезімталдықты арттырады', '• Түнде жарық немесе шу терең ұйқыға кедергі келтіруі мүмкін'] },
      { color:'teal', title:'Дәл қазір не көмектеседі', type:'steps', items:['Қиын түннен кейін де тұру уақытын өзгертпеңіз', 'Бүгін кешке бөлмені қараңғылатып, ақ шуды қосыңыз', 'Ұйықтар алдында 30 минут бұрын экрандарды алып тастаңыз'] },
      { color:'blue', title:'Болашаққа', type:'bullets', items:['• Демалыс күндерін қоса, күн сайын бірдей уақытта тұрыңыз', '• Ұйықтар алдында суреттермен қарапайым рәсім жасап көріңіз (3–4 қадам)'] }
    ], followup: 'Балаға кешке ұйықтау қиын ба, әлде түн ортасында оянып кете ме?' },
  aba: { detect: 'Мүмкін, үзіліс сұраудың жолы жоқ шығар', intro: 'Бәлкім, баланың «маған тоқтау керек» дегенді айтудың қарапайым жолы жоқ шығар. Қиын мінез-құлық — оның тілі.',
    sections: [
      { color:'purple', title:'Бұл неге болады', type:'bullets', items:['• «Маған үзіліс керек» деудің қарапайым жолы жоқ', '• Қиын мінез-құлық — оған қолжетімді жалғыз белгі'] },
      { color:'teal', title:'Дәл қазір не көмектеседі', type:'steps', items:['«Үзіліс керек» деген қарапайым белгі енгізіңіз — карточка немесе ым', 'Ол оны қолданған сайын бірден жауап беріңіз', 'Нақты мақтаңыз: <strong>«Карточканы көрсеткенің жарайсың»</strong>'] },
      { color:'blue', title:'Болашаққа', type:'bullets', items:['• Белгіні сабырлы сәттерде жаттықтырыңыз — дағдарыс кезінде емес', '• Сенсорлық ерекшеліктер бойынша тәжірибелі маман тапқан жөн'] }
    ], followup: 'Бала өз тәсілімен үзіліс керек екенін білдірген кезі болды ма?' },
  ot: { detect: 'Сенсорика бойынша маман көмектесуі мүмкін', intro: 'Эрготерапевт нақ балаңызға арналған жеке жоспар құра алады — бұл жалпы кеңестерден әлдеқайда тиімді.',
    sections: [
      { color:'purple', title:'Неге көріп алған жөн', type:'bullets', items:['• Жалпы кеңестер көбіне сай келмейді — балаңызға жеке бағалау керек', '• Жоспарсыз нақты не көмектесетінін түсіну қиын'] },
      { color:'teal', title:'Неден бастау керек', type:'steps', items:['Педиатрдан эрготерапевтке жолдама сұраңыз', 'Сенсорлық қолдауға маманданған орталықты көріп көріңіз', 'Алғашқы қабылдауға соңғы 3–5 қиын жағдайдың жазбаларын алып барыңыз'] },
      { color:'blue', title:'Маманнан не сұрау керек', type:'bullets', items:['• «Айрес сенсорлық интеграция әдісін қолданасыз ба?»', '• «Үйге арналған сенсорлық жоспар алуға бола ма?»'] }
    ], followup: 'Бала эрготерапевттен бағалаудан бұрын өтті ме, әлде бұл алғашқысы бола ма?' }
}
};

function getResp() {
  return RESP_BY_LANG[CURRENT_LANG] || RESP_BY_LANG.ru;
}
