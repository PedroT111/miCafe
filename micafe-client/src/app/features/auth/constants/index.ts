import { Validators } from "@angular/forms";
import { EmailValidator } from "../validators/check-email";

export const SIGN_UP_FORM_FIELDS = [
    {
        label: 'Nombre',
        name:'name',
        type: 'text',
        id: 'txtName',
        validators:[Validators.required],
    },
    {
        label: 'Apellido',
        name:'lastName',
        type: 'text',
        id: 'txtLastName',
        validators:[Validators.required],
    },
    {
        label: 'Email',
        name:'email',
        type: 'email',
        id: 'txtEmail',
        validators:[Validators.required, Validators.email],
        asyncValidators: [EmailValidator.checkEmail]
    },
    {
        label: 'Contraseña',
        name:'password',
        type: 'password',
        id: 'txtPassword',
        validators:[Validators.required, Validators.minLength(8)],
    },
];

export const SIGN_UP_PAGE= {
    btn_sign_up: 'Registrarse',
    btn_login: 'Iniciar Sesión',
    text_login: 'Ya tenés cuenta?',
    msg_success: 'Por favor, valida tu correo electrónico. Hemos enviado un enlace de confirmación a tu bandeja de entrada.'
}

export const LOGIN_PAGE = {
    title: 'Ingrese a su cuenta',
    txt_sign_up: 'No tenés cuenta?',
    txt_forget_pass: 'Olvidaste tu contraseña?',
    btn_sign_up: 'Registrarse',
    btn_login: 'Iniciar Sesión',
}
export const LOGIN_FORM_FIELDS = [
    {
        label: 'Email',
        name:'email',
        type: 'email',
        id: 'txtEmail',
        validators:[Validators.required, Validators.email],
    },
    {
        label: 'Contraseña',
        name:'password',
        type: 'password',
        id: 'txtPassword',
        validators:[Validators.required],
    },
];

export const RESET_PASS_PAGE = {
    title: 'Olvidaste tu contraseña?',
    txt_btn: 'Restablecer contraseña',
    msg_success: 'Hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.',
    txt_back: 'Volver al inicio'

}