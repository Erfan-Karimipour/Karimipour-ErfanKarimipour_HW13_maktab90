`use strict`

const body=document.querySelector(`body`)
const email=document.querySelector(`.email`);
const password=document.querySelector(`.password`);
const loginBtn=document.querySelector(`.login`);
const registerLink=document.querySelector(`.registerLink`);
const emailError=document.querySelector(`.email-error`);
const passwordError=document.querySelector(`.password-error`);
const theme=document.querySelector(`.theme`);

loginBtn.addEventListener(`click`,(event)=>{

    event.preventDefault();

    let accs = JSON.parse(localStorage.getItem(`Accounts`)) || undefined;

    if(accs!=undefined){

        accs.forEach(account => {
            
            if (account.Email==email.value && account.Password==password.value){

                localStorage.setItem(`CurrentUser`, JSON.stringify(`${account.NickName}`));

                localStorage.setItem(`LoggedIn`, JSON.stringify(`True`));

                window.open(`../Main page/Index.html`,`_self`);

            } else {
                
                emailError.classList.remove(`hidden`);
                passwordError.classList.remove(`hidden`);
                localStorage.setItem(`LoggedIn`,JSON.stringify(false));

            }

        });

    } else {
                
        emailError.classList.remove(`hidden`);
        passwordError.classList.remove(`hidden`);

    }

});

theme.addEventListener(`click`, () => {
    body.classList.toggle(`dark`);
    if (body.classList.contains(`dark`)){
        body.style.backgroundImage=`url("../../Images/LightMain.jpg")`;
        theme.setAttribute(`name`, `sunny-outline`);
    } else {
        body.style.backgroundImage=`url("../../Images/Dark-Sky-at-Sand-dunes.jpg")`;
        theme.setAttribute(`name`, `moon`)
    }
})