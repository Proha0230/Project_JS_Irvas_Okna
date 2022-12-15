const modals =()=> {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();


          // мы перебираем все триггеры - кнопки и прочее по нажатию на которые - будут
          // открываться модальные окна и выключаться прокрутка сайта вверх-вниз при открытом
          // модальном окне
          trigger.forEach(item =>{
            item.addEventListener('click', (e) => {
                if(e.target){
                    e.preventDefault();
                }

                modal.style.display="block";
                document.body.style.overflow="hidden";
                document.body.style.marginRight=`${scroll}px`;
            });
          });

          // мы получаем все модальные окна по дата атрибуту для того чтобы их
          // все закрыть при нажатии на подложку модального окна (серой зоны) либо
          // где то отключить это закрытие в случае если польз введет какие либо данные
          // и случайно мисскликнет 
          windows.forEach(item => {
            item.style.display='none';
          });


          // закрытие всех модальных окон при клике на крестик 
          close.addEventListener("click", ()=>{
            
            windows.forEach(item => {
              item.style.display='none';
            });
            
            modal.style.display="none";
            document.body.style.overflow="";
            document.body.style.marginRight=`0px`;
          });


          // закрытие модальных окон всех при клике на подложку (серую зону) модального окна при
          // выполнении всех условий (если будет передан false, то закрытие с конкретного модального окна
          // осуществляться не будет) а так же включение прокручивании вниз-вверх нашего сайта 
          // так как когда у нас открывается модальное окно - прокручивание блокируется.
          modal.addEventListener("click", (e) =>{
            if(e.target === modal && closeClickOverlay) {

              windows.forEach(item => {
                item.style.display='none';
              });
                
              modal.style.display="none";
                document.body.style.overflow="";
                document.body.style.marginRight=`0px`;
            }
          });
    }


    // функция вызова модального окна спустя 60 секунд пребывания на сайте
    function showModalByTime (selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display="block";
            document.body.style.overflow="hidden";
        }, time);
    }


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

    // вызываем нашу функцию bindModal передавая в нее все нужные перечисленные div классы
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup', 60000);
};

export default modals;