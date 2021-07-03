const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const confirmPasswordElem = document.querySelector('#confirm-password');
const emailElem = document.querySelector('#email');
const confirmEmailElem = document.querySelector('#confirm-email');

const form = document.querySelector('#main-form');


const checkUsername = () => {

    let valid = false;

    const min = 3,
          max = 25;

    const username = usernameElem.value.trim();

    if (!isRequired(username)) {
        showError(usernameElem, 'Username tidak boleh kosong.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameElem, `Username harus diantara ${min} dan ${max} karakter.`)
    } else {
        showSuccess(usernameElem);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordElem.value.trim();

    if (!isRequired(password)) {
        showError(passwordElem, 'Password tidak boleh kosong.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordElem, 'Password setidaknya memiliki 8 karakter dengan 1 huruf besar 1 huruf kecil 1 angka dan 1 simbol seperti !@#$%^&*');
    } else {
        showSuccess(passwordElem);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // mengecek confirm password
    const confirmPassword = confirmPasswordElem.value.trim();
    const password = passwordElem.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordElem, 'Masukkan kembali password Anda.');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordElem, 'Password tidak sama!');
    } else {
        showSuccess(confirmPasswordElem);
        valid = true;
    }

    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailElem.value.trim();
    if (!isRequired(email)) {
        showError(emailElem, 'Email tidak boleh kosong.');
    } else if (!isEmailValid(email)) {
        showError(emailElem, 'Email anda tidak valid!')
    } else {
        showSuccess(emailElem);
        valid = true;
    }
    return valid;
};

const checkConfirmEmail = () => {
    let valid = false;
    // mengecek confirm email
    const confirmEmail = confirmEmailElem.value.trim();
    const email = emailElem.value.trim();

    if (!isRequired(confirmEmail)) {
        showError(confirmEmailElem, 'Masukkan kembali email Anda.');
    } else if (email !== confirmEmail) {
        showError(confirmEmailElem, 'Email tidak sama!');
    } else {
        showSuccess(confirmEmailElem);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // mendapatkan element form-field
    const formField = input.parentElement;
    // membuat class error
    formField.classList.remove('success');
    formField.classList.add('error');

    // menampilkan pesan error
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // mendapatkan element form-field
    const formField = input.parentElement;

    // menghapus kelas error
    formField.classList.remove('error');
    formField.classList.add('success');

    // menyembunyikan pesan error
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // mencegah form ter-submit
    e.preventDefault();

    // validasi kolom
    let isUsernameValid = checkUsername(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isEmailValid = checkEmail(),
        isConfirmEmailValid = checkConfirmEmail();

    let isFormValid = isUsernameValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isEmailValid &&
        isConfirmEmailValid;

    // form akan di submit apabila valid semua
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // membatalkan timer sebelumnya
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // membuat timer baru
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;        
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'email':
            checkEmail();
            break;
        case 'confirm-email':
            checkConfirmEmail();
            break;
    }
}));