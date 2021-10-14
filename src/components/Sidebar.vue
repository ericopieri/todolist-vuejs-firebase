<template>
    <nav class="sidebar">
        <header class="sidebarHeader">
            <div id="leftArrow">
                <font-awesome-icon icon="arrow-left" @click.stop="hideSidebar"/>
            </div>
            <p>My todo list</p>
        </header>
        <nav class="sidebar-menu">
            <ul>
                <li>Cadastre-se em "Perfil"</li>
                <li v-for="(item, index) of itensmenu" :key="index">
                    <div>
                        <font-awesome-icon :icon="item.icon"></font-awesome-icon>
                    </div>
                    <span>{{item.title}}</span>
                    <router-link :to="item.to" class="sidebar-routerlink"></router-link>
                </li>
            </ul>
        </nav>
        
    </nav>
</template>

<script>
export default {
    data() {
        return {
            itensmenu: [
                {title: 'Home', icon: 'home', to: '/'},
                {title: 'Perfil', icon: 'id-badge', to: '/perfil'},
                {title: 'Sair', icon: 'sign-out-alt', to: '/login'}
            ]
        }
    },
    methods: {
        hideSidebar() {
            this.$emit('hidesidebar')
        }
    }
}
</script>

<style>
.sidebar-routerlink {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: transparent;
}
#leftArrow {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.2em;
    padding: 5px 8px;
    border-radius: 50%;
    transition: 1.5s;
}
#leftArrow:hover {
    transition: 1.5s;
    background: rgba(255, 255, 255, .2);
}
.sidebarHeader {
    color: white;
    display: flex;
    align-items: center;
    position: relative;
    height: 75px;
    background: cornflowerblue;
}
.sidebar .sidebarHeader p{
    line-height: 1;
    width: 100%;
    text-align: center;
    font-size: 1.225em;
    font-weight: 700;
    font-style: italic;
}
.sidebar-menu {
    padding: 10px;
}
.sidebar-menu ul li {
    border-radius: 4px;
    height: 65px;
    position: relative;
    width: 100%;
    transition: 0.2s;
}
.sidebar-menu ul li + li {
    margin-top: 3px;
}
.sidebar-menu ul li + li:hover {
    background: rgba(0, 0, 0, .05);
}
.sidebar-menu ul li:first-child {
    margin-bottom: 10px;
    background-color: rgba(100, 148, 237, 0.233);
    cursor: auto;
    text-align: center;
    line-height: 65px;
}
.sidebar-menu ul li span {
    color: black;
    display: inline-block;
    line-height: 65px;
    height: 100%;
    font-size: 1.125em;
}
.sidebar-menu ul li div {
    display: inline-block;
    height: 100%;
    line-height: 65px;
    text-align: center;
    width: 75px;
}
.sidebar-menu ul li div svg {
    font-size: 1.6em;
}
</style>