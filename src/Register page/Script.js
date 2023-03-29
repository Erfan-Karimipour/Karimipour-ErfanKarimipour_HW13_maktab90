`use strict`

const body=document.querySelector(`body`)
const nickName=document.querySelector(`.name`);
const email=document.querySelector(`.email`);
const password=document.querySelector(`.password`);
const registerBtn=document.querySelector(`.register`);
const loginLink=document.querySelector(`.loginLink`);
const nameError=document.querySelector(`.name-error`);
const emailError=document.querySelector(`.email-error`);
const passwordError=document.querySelector(`.password-error`);
const theme=document.querySelector(`.theme`);


registerBtn.addEventListener(`click`,(event)=>{

    event.preventDefault();

    let emailProblem=false; 
    let passwordProblem=false;
    let nameProblem=false;

    if (!nickName.value) {
        nameError.classList.remove(`hidden`);
        nameProblem=true;
    }else{
        nameError.classList.add(`hidden`);
        nameProblem=false;
    }

    if (!email.value||!email.value.includes(`@`)) {
        emailError.classList.remove(`hidden`);
        emailProblem=true;
    }else{
        emailError.classList.add(`hidden`);
        emailProblem=false;
    }

    if (!password.value) {
        passwordError.classList.remove(`hidden`);
        passwordProblem=true;
    }else{
        passwordError.classList.add(`hidden`);
        passwordProblem=false;
    }

    if(emailProblem==false && passwordProblem==false){

        let Accs=[];

        if(localStorage.getItem(`Accounts`)){
            Accs=JSON.parse(localStorage.getItem(`Accounts`));
        }

        let newUser={
            NickName:`${nickName.value}`,
            Email:`${email.value}`,
            Password:`${password.value}`
        };

        Accs.push(newUser);

        localStorage.setItem(`Accounts`, JSON.stringify(Accs));

        window.open(`../Login page/Index.html`, `_self`)
    }
})

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