
// just some practice. Learning XMLHttpRequest (local server)
//  DOM Event delegation
// XMLHttpRequest(AJAX)
// JSON  
// MAMP (a local server environment)
// getAttribute()
// spinner loader
// insertAdjacentElement()

const btns = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');

function modalOpen(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
};

function modalClose(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

btns.forEach((btn, i)=>{
    btn.addEventListener('click',modalOpen)
});

modal.addEventListener('click',(e)=>{
    // if(e.target.classList.contains('modal') || e.target.getAttribute('modal__close')){
        if(e.target.classList.contains('modal') || e.target.classList.contains('modal__close')){
        modalClose()
    }
});
document.addEventListener('keydown',(e)=>{

    if(e.code === 'Escape'){
        modalClose()
    }
});

//================================================================================================================================

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner.svg',
    success: 'Thank you! We will contact you shortly!',
    failure: 'Something went wrong...'
};

forms.forEach(item => {
    postData(item);
});

function postData(form){
    form.addEventListener('submit', (e)=> {
        e.preventDefault();

        const statusMessage = document.createElement('img'); 
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend',statusMessage);

        const request = new XMLHttpRequest(); 
        request.open('POST', 'server.php');
    
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form); 

        const object = {}; 
        formData.forEach((value, key)=>{
            object[key] = value;
        });

         const json = JSON.stringify(object);
         request.send(json);

        request.addEventListener('load', ()=> {
                if(request.status === 200){
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove()
                }
                else{
                    showThanksModal(message.failure)
                }
        });
    });   
}

function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        modalOpen();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div data-close class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal); 
        //modal.append(thanksModal); // m version
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            modalClose();
        },4000);
        
}







