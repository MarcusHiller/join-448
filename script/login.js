setTimeout(() => {
    document.getElementById('logoImg').classList.remove('d-none');
}, 1060);


const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
let info = document.getElementById('poppin');
if (msg) {
    let info = document.getElementById('poppin');
    info.classList.remove('opacity');
    info.classList.add('poppins-success');
    info.innerHTML = "";
    info.innerHTML = msg;
} else {
    info.classList.add('opacity');
    info.classList.remove('poppins-success');
}


function login() {
    let email = document.getElementById('email');
    let passwd = document.getElementById('passwd');
    let user = users.find(user => user.email == email.value && user.password == passwd.value)
    console.log(user);
    if (user) {
        console.log(user);
        
        window.location.href = `html/summary.html?name=${encodeURIComponent(user.username)}&email=${encodeURIComponent(email)}`;
    } else {
        document.getElementById('labelPasswd').classList.add('input-field-error');
        info.classList.remove('opacity');
        info.innerHTML = "";
        info.innerHTML = "Check your e-mail and password. Please try again.";
    }
}


function guestLogin(event) {
    event.preventDefault();
    document.getElementById('email').removeAttribute('required');
    document.getElementById('passwd').removeAttribute('required');
    window.location.href = "html/summary.html?name=Guest";
}