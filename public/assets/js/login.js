const emailInput =  document.querySelector('.sign-in-email');
const passwordInput = document.querySelector('.sign-in-password');

function signIn(event){
    event.preventDefault()
    // session logic
}

function signUp(event){
    event.preventDefault()
    // session logic
    const emailInput =  document.querySelector('.sign-up-email').value; 
    const passwordInput =  document.querySelector('.sign-up-password').value; 

    const data = { email: emailInput, password: passwordInput };

    fetch('/api/user/signup', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    if (data.id){
        document.location.replace('/')
    } else {console.log('fail to sign up')}
    })
    .catch((error) => {
    console.error('Error:', error);
    });

}