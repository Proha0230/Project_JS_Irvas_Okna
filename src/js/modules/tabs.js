const tabs = (headerSelect, tabSelector, contentSelector, activeClass, display="block") => {
const header = document.querySelector(headerSelect),
      tab = document.querySelectorAll(tabSelector),
      content = document.querySelectorAll(contentSelector);

      // перебирает дивы с классом указанным для content'а и делает им display="none",
      // затем перебирает дивы с классом указанным для tab'ов и удаляет из их дивов класс - activeClass
      // указанный в main.js 
      function hideTabContent () {
        content.forEach(item => {
            item.style.display = "none";
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
      }

      // в выбранном диве [i] указанном как content приписывает стиль display="block",
      // в выбранном диве [i] указанном как tab добавляет активный класс для его выделения как текущего 
      // указанный в activeClass в main.js 
      function showTabContent(i=0){
        content[i].style.display=display;
        tab[i].classList.add(activeClass);
      }

      hideTabContent();
      showTabContent();

      // Задаем событие для хэдера со всеми табами указанный как header и проверяем
      // что то, куда мы нажали содержит класс tabSelector без точки либо его родительский класс
      // .parentNode . Метеодом перебора forEach мы перебираем эти табы и контент и показываем изначально
      // 0 там и контент т.е. первый так как I=0. а указанного параметра у нас нет.
      header.addEventListener('click', (e)=>{
        const target = e.target;
        if(target &&
           (target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            
            tab.forEach((item,i) =>{
                if(target==item || target.parentNode==item){
                hideTabContent();
                showTabContent(i);                   
                }
            });
           }
      });
};

export default tabs;