const signInEmailInput =  document.querySelector('.sign-in-email');
const signInPasswordInput = document.querySelector('.sign-in-password');
const signUpEmailInput = document.querySelector('.sign-up-email');
const signUpPasswordInput = document.querySelector('.sign-up-password');

async function signIn(event){
    event.preventDefault();

    const email = signInEmailInput.value.trim();
    const password = signInPasswordInput.value.trim();
    
    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({
            email,
            password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

async function signUp(event){
    event.preventDefault();

    const email = signUpEmailInput.value.trim();
    const password = signUpPasswordInput.value.trim();
  
    if (email && password) {
        const response = await fetch('/api/user', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}