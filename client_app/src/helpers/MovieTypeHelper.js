export const PageTypeEnum = {
  MovFor: {
    val: 1,
    isActive: true,
    text: 'зарубежные_фильмы',
    btnSel: '#btnMovFor',
    selector: '#newmovfor',
    cssClass: 'success',
    caption: 'Зарубежные фильмы',
  },
  MovRus: {
    val: 2,
    isActive: true,
    text: 'российские_фильмы',
    btnSel: '#btnMovRus',
    selector: '#newmovrus',
    cssClass: 'success',
    caption: 'Российские фильмы',
  },
  SerFor: {
    val: 3,
    isActive: true,
    text: 'зарубежные_сериалы',
    btnSel: '#btnSerFor',
    selector: '#newserfor',
    cssClass: 'info',
    caption: 'Зарубежные сериалы',
    isSer: true,
  },
  SerRus: {
    val: 4,
    isActive: true,
    text: 'российские_сериалы',
    btnSel: '#btnSerRus',
    selector: '#newserrus',
    cssClass: 'info',
    caption: 'Российские сериалы',
    isSer: true,
  },
  SerAni: {
    val: 5,
    text: 'аниме_сериалы',
    btnSel: '#btnSerAni',
    selector: '#newserani',
    cssClass: 'warning',
    caption: 'Аниме сериалы',
    isSer: true,
  },
  MovAni: {
    val: 6,
    isActive: true,
    text: 'аниме_фильмы',
    btnSel: '#btnMovAni',
    selector: '#newmovani',
    cssClass: 'warning',
    caption: 'Аниме фильмы',
  },
  RipFor: {
    val: 7,
    isActive: true,
    text: 'экранки',
    btnSel: '#btnRipFor',
    selector: '#newripfor',
    cssClass: 'primary',
    caption: 'Экранки',
  },
  RipRus: {
    val: 8,
    text: 'российские_экранки',
    btnSel: '#btnRipRus',
    selector: '#newriprus',
    cssClass: 'primary',
    caption: 'Российские экранки',
  },

  Abc: {
    val: 9,
    text: 'каталог',
    btnSel: '#btnAbc',
    selector: '',
    cssClass: '',
    caption: '',
  },
  Fav: {
    val: 10,
    text: 'избранное',
    btnSel: '#btnFavs',
    selector: '',
    cssClass: '',
    caption: '',
  },
  Search: {
    val: 11,
    text: 'поиск',
    btnSel: '#btnSearch',
    selector: '',
    cssClass: '',
    caption: '',
  },
  Pop: {
    val: 12,
    text: 'популярное',
    btnSel: '#btnPop',
    selector: '#pops',
    cssClass: 'danger',
    caption: 'Популярное',
  },
};

export function getType(i) {
  const searched = +i;
  const keys = Object.getOwnPropertyNames(PageTypeEnum);
  for (let key in keys) {
    let val = PageTypeEnum[keys[key]];
    if (val.val === searched) return val;
  }
  return null;
}
