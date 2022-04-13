const signInEmailInput =  document.querySelector('.sign-in-email');
const signInPasswordInput = document.querySelector('.sign-in-password');
const signUpEmailInput = document.querySelector('.sign-up-email');
const signUpPasswordInput = document.querySelector('.sign-up-password');

async function signIn(event){
    event.preventDefault();
    // session logic
}

async function signUp(event){
    event.preventDefault();

    const email = signUpEmailInput.value.trim();
    const password = signUpPasswordInput.value.trim();
  
    if (email && password) {
        const response = await fetch('/api/users', {
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