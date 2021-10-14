<template>
    <header class="header">
        <div id="bars">
            <font-awesome-icon icon="bars" @click.stop="switchSidebar"/>
        </div>
        <div class="profileHeader"><span>{{ email }}</span><font-awesome-icon icon="user-circle"/></div>
    </header>
</template>

<script>
export default {
    props: ['email'],
    data() {
        return {
            usuario : 'Usuário'
        }
    }, methods: {
        switchSidebar() {
            this.$emit('switchsidebar')
        }
}}
</script>

<style>
#bars {
    padding: 8px 10px;
    border-radius: 50%;
    transition: 1.5s;
}
#bars:hover {
    transition: 1.5s;
    background: rgba(255, 255, 255, .2);
}
.header {
    background: cornflowerblue;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    padding: 0 20px;
    transition: width 2s;
}
.header svg {
    font-size: 2.2em;
}
.profileHeader {
    display: flex;
    gap: 10px;
    align-items: center;
}
.profileHeader span {
    font-size: 1.225em;
    padding: 5px 8px;
    background: rgba(0, 0, 0, .5);
    transition: 0.15s;
    border-radius: 5px;
    cursor: pointer;
}
.profileHeader span:hover {
    background: rgba(0, 0, 0, .65);
}
</style>