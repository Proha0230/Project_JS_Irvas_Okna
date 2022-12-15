import checkNumInputs from "./checkNumInputs";

const forms =(state)=> {


// задаем валидацию благодаря модулю которому мы вынесли с валидацией
// при вводе букв они будут удаляться и останутся только цифры в полях 
// ввода номера телефона клиента 
checkNumInputs('input[name="user_phone"]');

const form = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input');
    

// создаем сообщения которые будут показываться в зависимости от статуса отправки 
// данных на сервер php
const message = {
    loading:'Загрузка...',
    success:'Спасибо! скоро мы с вами свяжемся',
    failure:'Что-то пошло не так...'
};

// ф-ция переборки инпутов и их очистки
const clearInputs = () => {
    inputs.forEach(item => {
        item.value = '';
    });
};

// Асинхронная функция отправки данных с инпутов на сервер
// во время отправки будет показываться сообщение Загрузка...
const postData = async (url, data) => {
    document.querySelector('.status').textContent=message.loading;
// ф-ция будет дожидаться когда отправятся данные и затем будет продолжена
    let res = await fetch( url, {
        method:"POST",
        body: data
    });
// так же ф-ция будет дожидаться пока получит результаты данных в text формате
// и будет продолжена 
    return await res.text();
};

form.forEach(item => {
    item.addEventListener('submit', (e) =>{
        e.preventDefault();

    // создаем новый див с классом status и который будет в конце списка 
    // родительского элемента формы
    let statusMessage=document.createElement('div');
    statusMessage.classList.add('status');
    item.appendChild(statusMessage);

    // мы задали нашей конечной форме отправки данных которая появляется после калькулятора
    // дата атрибут - data-calc="end" и вот при формировании
    // formData - будет учитываться что отправлять на сервер, и если мы будет делать отправку с 
    // конечной формы после калькулятора, то отправятся как имя с телефоном клиента, так и данные со state
    // в котором находятся данные того, что он выбрал и ввел в калькуляторе 
    const formData = new FormData(item);
    if(item.getAttribute('data-calc') === "end"){
        for(let key in state){
            formData.append(key, state[key]);
        }
    }

    //отправка данных на сервер php а так же при успешной отправке формы на сервер
    // будет показываться сообщение Спасибо! скоро мы с вами свяжемся
    // так же при успешной отправке все данные что отправятся на сервер с нашей формы
    // будут продублированы в консоль
    postData('assets/server.php', formData)
    .then (res => {
        console.log(res);
        statusMessage.textContent=message.success;
    })
    // при ошибке отправки данных покажет сообщение - Что-то пошло не так...
    .catch (()=> statusMessage.textContent=message.failure)
    
    // этот метод finally выполнится в любом случае, успешном или нет - отправки данных на сервер
    // он выполнит ф-цию очистки инпутов, а так же удалить созданный нами div с классом status 
    // через 5 секунд после его создания
    .finally(()=>{
        clearInputs();
        setTimeout(()=>{
            statusMessage.remove();

            // это команда для обновления текущей вкладки. работает как нажатие F5
            location.reload();
        }, 5000);
    });
  });
});
};

export default forms;