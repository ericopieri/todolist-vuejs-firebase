<template>
    <main class="appLogin">
        <form>
            <h3>Autenticação</h3>
            <input type="text" name="inputemail" id="email" v-model="user.email" placeholder="E-mail">
            <input type="password" name="inputpassword" id="password" v-model="user.senha" placeholder="Senha">
            <button @click.prevent="login">Entrar</button>
            <span id="error"></span>
        </form>
        <div id="dialog" v-show="novaConta">
            <div class="card">
                <h2>Conta não encontrada</h2>
                <p>Deseja criar uma conta com os dados fornecidos?</p>
                <div>
                    <button @click.prevent="signup">Sim</button>
                    <button @click.prevent="novaConta =  false">Não</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { auth } from '../plugins/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    data() {
        return {
            novaConta: false,
            user: {}
        }
    },
    methods: {
        async login() {
            try {
                await signInWithEmailAndPassword(auth, this.user.email, this.user.senha)
                window.alert('Sucesso! redirecionando para à página principal')
                setTimeout(() => {
                    this.$router.push({ name: 'Home' })
                }, 1000)
            } catch(error) {
                const codigoErro = error.code;
                console.log(codigoErro);
                switch(codigoErro) {
                    case 'auth/wrong-password':
                        setTimeout(() => {
                            window.alert('Senha errada!')
                        }, 1500)
                        break
                    case 'auth/invalid-email':
                        setTimeout(() => {
                            window.alert('E-mail inválido!')
                        }, 1500)
                        break
                    case 'auth/user-not-found':
                        setTimeout(() => {
                            this.novaConta = true
                        }, 1500)
                        break
                    default:
                        setTimeout(() => {
                            window.alert('Algo deu errado!')
                        }, 1500)
                }
            }
        },
        async signup() {
            this.novaConta = false;
            await createUserWithEmailAndPassword(auth, this.user.email, this.user.senha);
            this.login();
        }
    }
}
</script>

<style>
#dialog {
    z-index: 1;
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.90);
}
#dialog .card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 100px;
    background: white;
    border-radius: 10px;
}
#dialog .card h2 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 15px;
}
#dialog .card p {
    font-size: 1.5em;
    text-align: center;
    color: gray;
}
#dialog .card div {
    position: absolute;
    right: 25px;
    bottom: 25px;
}
#dialog .card div button {
    color: white;
    cursor: pointer;
    transition: 0.2s;
    font-size: 1.5em;
    padding: 5px 30px;
    border: none;
    border-radius: 5px;
}
#dialog .card div button + button {
    margin-left: 10px;
}
#dialog .card div button:first-child {
    background: green;
}
#dialog .card div button:first-child:hover {
    background: darkgreen;
}
#dialog .card div button:last-child {
    background: red;
}
#dialog .card div button:last-child:hover {
    background: darkred;
}
.appLogin {
    height: 100vh;
    background: linear-gradient(135deg, cornflowerblue, rgb(23, 104, 255))
}
.appLogin form {
    background-color: white;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 30px 60px;
}
.appLogin form h3 {
    padding-bottom: 40px;
    text-align: center;
    font-size: 3em;
    color: cornflowerblue;

}
.appLogin form input {
    padding: 0 10px;
    width: 100%;
    height: 45px;
    outline: none;
    font-size: 1.2em;
}
.appLogin form input + input {
    margin-top: 12px;
}
.appLogin form button {
    font-weight: 600;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 1.2em;
    width: 100%;
    height: 45px;
    margin-top: 17px;
    background: cornflowerblue;
    border: 2px solid cornflowerblue;
    transition: .2s;
}
.appLogin form button:hover {
    color: cornflowerblue;
    background: transparent;
}
</style>