<template>
    <main>
        <h1 class="h1profile">Meu perfil</h1>
        <form class="formProfile">
            <input type="text" v-model="nome" placeholder="Nome">
            <input type="text" v-model="sobrenome" placeholder="Sobrenome">
            <button class="profilesave" @click.prevent="salvarProfile">Salvar</button>
        </form>
    </main>
</template>

<script>
import { auth, profileCollection } from '../plugins/firebase.js';
import { where, query, addDoc, getDocs } from 'firebase/firestore';

export default {
    data() {
        return {
            nome: '',
            sobrenome: '',
            uid: '',
            hasProfile: false,
            profileId: '',
        }
    }, async mounted() {
        this.uid = auth.currentUser.uid;
        const userProfile = query(profileCollection, where('uid', '==', this.uid));
        const docs = await getDocs(userProfile);
        if (docs.docs.length > 0) {
            this.hasProfile = true;
            const perfil = docs.docs[0]
            this.profileId = perfil.id;
            this.nome = perfil.data().nome;
            this.sobrenome = perfil.data().sobrenome;
        } else {
            console.log('Não tem!')
        }
    }, methods: {
        async salvarProfile() {
            if (this.nome == '' || this.sobrenome == '') {
                window.alert('Você deve inserir um nome e sobrenome')
                return
            } else {
                if (this.hasProfile) {
                window.alert('Você já está cadastrado e não pode alterar suas informações')
                } else {
                await addDoc(profileCollection, {
                    uid: this.uid,
                    nome: this.nome,
                    sobrenome: this.sobrenome
                })
            }
            }
            
        }
    }, printarNome() {
        this.$emit()
    }  
}
</script>

<style>
.h1profile {
    margin: 75px auto 30px 100px;
    font-size: 3em;
}
.formProfile {
    margin: 0 0 0 100px;
    width: 600px;
}
.formProfile input {
    padding: 0 10px;
    font-size: 1.5em;
    width: 100%;
    height: 45px;
    outline: none;
    border-bottom: 2px solid cornflowerblue;
    border-top: none;
    border-left: none;
    border-right: none;
}
.formProfile input + input {
    margin-top: 30px;
}
.formProfile button {
    margin-top: 40px;
    padding: 5px 20px;
    font-size: 1.7em;
    background: cornflowerblue;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    transition: .2s;
}
.formProfile button:hover {
    background: rgb(56, 118, 233);
    transition: .2s;
}
</style>