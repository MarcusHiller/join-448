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
        window.location.href = "html/summary.html";
    } else {
        info.classList.remove('opacity');
        info.innerHTML = "";
        info.innerHTML = "Check your e-mail and password. Please try again.";
    }
}