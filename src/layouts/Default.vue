<template>
    <div id="app" :class="{ sidebarDesligado: sidebarOff}">
    <Sidebar v-if="!sidebarOff" @hidesidebar="sidebarOff = !sidebarOff"/>
    <Header @switchsidebar="sidebarOff = !sidebarOff" :email="email"/>
    <router-view class="content"></router-view>
    <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { auth } from '../plugins/firebase.js';

export default ({
    data() {
    return {
        sidebarOff: false,
        app: true,
        email: ''
    }
    },
    components: { Header, Sidebar, Footer },
    async mounted(){
        this.email = auth.currentUser.email;
    }
})
</script>


<style>
</style>
