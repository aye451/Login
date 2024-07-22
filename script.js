document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide')

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    emailInput.addEventListener('change', function() {
        clearError(emailError);
    });

    passwordInput.addEventListener('blur', function() {
        validatePassword();
    });

    passwordInput.addEventListener('change', function() {
        clearError(passwordError);
    });

    confirmPasswordInput.addEventListener('blur', function() {
        validatePasswordMatch();
    });

    confirmPasswordInput.addEventListener('change', function() {
        clearError(confirmPasswordError);
    });

    showHideButton.addEventListener('click', function() {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
    });

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const PasswordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && PasswordMatch) {
            saveToLocalStorage();
            alert('Has ingresado con éxito');
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();

        if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Ingresa un email válido');
            return false;
        }
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 8) {
            showError(passwordError, 'Ingresa una contraseña de al menos 8 caracteres.\n');
            return false;
        }
        if (!/[A-Z]/.test(passwordValue)) {
            showError(passwordError, 'La contraseña debe tener al menos una letra mayúscula.\n');
            return false;
        }
        if (!/[a-z]/.test(passwordValue)) {
            showError(passwordError, 'La contraseña debe tener al menos una letra minúscula.\n');
            return false;
        }
        if (!/[0-9]/.test(passwordValue)) {
            showError(passwordError, 'La contraseña debe tener al menos un número.\n');
            return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            showError(passwordError, 'La contraseña debe tener al menos un carácter especial.\n');
            return false;
        }
        return true;
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue !== confirmPasswordValue) {
            showError(confirmPasswordError, 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        };
    }
});
