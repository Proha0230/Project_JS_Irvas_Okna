import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
const windowForm = document.querySelectorAll('.balcon_icons_img'),
      windowWidth = document.querySelectorAll('#width'),
      windowHeight = document.querySelectorAll('#height'),
      windowType = document.querySelectorAll('#view_type'),
      windowProfile = document.querySelectorAll('.checkbox');

// задаем валидацию благодаря модулю которому мы вынесли с валидацией
// при вводе букв они будут удаляться и останутся только цифры в полях 
// инпутов ширины и высоты в калькуляторе 
checkNumInputs('#width');
checkNumInputs('#height');


//в функции мы перебираем каждый элемент который указали и задаем ему событие при котором будут
// вводиться данные в стэйт при 'клике', при 'вводе данных в инпут', при 'изменении данных в инпуте'.
// и вводим в наш state - параметр(prop - который сами указываем) со значением полученных благодаря
// методу инструкции Switch Case.
// инструкция switch сравнивает выражение со случаями перечисленными внутри нее, а затем выполняются
// соотв. инструкции.
// case 'SPAN' - указывается имя узла в верхнем регистре т.к. метод получения имени узла 
// item.nodeName - возвращает его в верхнем регистре

function bindActionToElems(event, elem, prop) {
    elem.forEach((item, i) => {
        item.addEventListener(event, ()=> {
        switch (item.nodeName) {
            case 'SPAN':
                state[prop] = i;
                break;

            case 'INPUT':
            // проверка на то что если у элемента есть тип и в нем значение checkbox
            if(item.getAttribute('type') === 'checkbox'){
                i===0 ? state[prop]="Холодное" : state[prop]="Теплое";
            
            // если есть элементы с типом checkbox то мы перебираем их
            // и проверяем состояние - true когда стоит галка и false когда не стоит галка.
            // мы этой проверкой принудительно все галки снимаем и ставить будет лишь туда
            // куда нажмет клиент. выберет Холодный тип отстекление то будет на нем галка стоять, 
            // а если передумает и нажмет н Теплый тип - то с холодного галка пропадет и будет только 
            // на Теплом 
            elem.forEach((box,j) => {
                box.checked = false;
                if (i==j){
                    box.checked = true;
                }
            });

            // если же нет checkbox То это обычный инпут и мы сохраняем в стэит его текущее значение
                } else {
                    state[prop] = item.value;
                }
                break;
            // это для списка с вариантами, где в стэит заносится тот вариант, который выбрал клиент
            case 'SELECT':
                state[prop] = item.value;
                break;
        }
        console.log(state);
     });
   });
  }

// здесь мы задаем наши элементы, какой тип события будет у них, что это за элементы, и как они будут
// подписаны в стэйте
  bindActionToElems('click', windowForm, 'form');
  bindActionToElems('input', windowHeight, 'height');
  bindActionToElems('input', windowWidth, 'width');
  bindActionToElems('change', windowType, 'type');
  bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;