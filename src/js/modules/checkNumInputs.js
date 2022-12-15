const checkNumInputs=(selector)=> {
    const numInputs = document.querySelectorAll(selector);

    // перебирает все инпуты и если человек вводит в поле инпута буквы (любые) - то благодаря
    // методу replace и фильтру /\D/, буквы будут удаляться и останутся только цифры
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;