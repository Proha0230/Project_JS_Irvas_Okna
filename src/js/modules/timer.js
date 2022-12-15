// модуль с нашиим таймером

const timer = (id, deadline) => {


// функция добавления нуля если в таймере показываются цифры
// <= 9
    const addZero =(num) => {
    if(num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
};

// математическое вычисление секунд, минут, часов, дней для таймера
    const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((t/1000) % 60),
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor((t/(1000 * 60 * 60)) % 24),
          days = Math.floor((t/(1000 * 60 * 60 * 24)));

          return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
          };
    };

// назначение наших математически вычесленных параметров на окна таймера
// так же запуск функции обновленния данных таймера
    const setClock=(selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock(){
    const t = getTimeRemaining(endtime);

// показ данных в таймера через функцию с добавлением нулей если числа будут
// меньше либо равно <= 9 
    days.textContent = addZero(t.days);
    hours.textContent = addZero(t.hours);
    minutes.textContent = addZero(t.minutes);
    seconds.textContent = addZero(t.seconds);

// условие при котором если таймер закончится, то чтобы в окошках таймера
// показывались нули, а сама функция обновления таймера каждую секунду - сбрасывалась.
    if(t.total <= 0){
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
    }
   }
 };
    setClock(id, deadline);
};

export default timer;