// модуль создания модального окна в котором будет отображаться большая версия картинки
// при клике на картинку


const images = () => {

// создаем модальное окно и элемент в котором будет отображаться картинка
// в большем размере в области с картинками
const imgPopup = document.createElement('div'),
      workSection = document.querySelector('.works'),
      bigImage = document.createElement('img'),
      scroll = calcScroll();


imgPopup.classList.add('popup');
workSection.appendChild(imgPopup);

imgPopup.style.justifyContent='center';
imgPopup.style.alignItems='center';
imgPopup.style.display='none';
imgPopup.appendChild(bigImage);


// отменяем стандартное поведение браузера для того, чтобы
// при клике на картинку он не переходил по ее ссылке
// а оставался на сайте
workSection.addEventListener('click', (e) => {
    e.preventDefault();
let target = e.target;

// условия что если мы нажали на какую либо маленькую картинку то у нас
// модальное окно с картинкой будет отображаться и в ней будет изображение
// адрес местоположения которого берется из дива находящегося рядом с дивом мелкой картинки
// parentNode - в родительском элемента мелкой картинки
    if(target && target.classList.contains('preview')) {
        imgPopup.style.display='flex';
  const path = target.parentNode.getAttribute('href');
        bigImage.setAttribute('src', path);
        document.body.style.overflow="hidden";
        document.body.style.marginRight=`${scroll}px`;
    }
// если нажмем на подложку модального окна в серую зону, то модальное окно скроется
// и снова можно будет прокручивать сайти (скроллить) вверх/вниз
    if(target && target.matches('div.popup')) {
        imgPopup.style.display= 'none';
        document.body.style.overflow="";       
        document.body.style.marginRight=`0px`;
    }
    
  });

// функция добавления отступа при появлении модального окна - в зоне где распологается
// скролл страницы, т.к. мы убираем возможность скроллинга страницы при открытии модального окна
// у нас скролл пропадает и происходит дергание страницы. мы добавляем marginRight на ширину скролла
  function calcScroll(){
    let div = document.createElement('div');

    div.style.width='50px';
    div.style.height='50px';
    div.style.overflowY='scroll';
    div.style.visibility='hidden';

// здесь мы находим ширину скролла, т.к. в разных браузерах эта ширина может отличаться
// мы из всего пространства брайзера с нашим сайтом - вычитаем пространство занимаемое нашими контентом
// включая все бордеры и маржины, и таким образом получаем ширину скролла
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

};

export default images;
