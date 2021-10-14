<template>
  <main>
    <h1 class="title">Minha lista de tarefas</h1>
    <form class="formInputTask">
      <input type="text" placeholder="Adicione aqui sua tarefa" v-model="novaTarefa" @keydown.enter.prevent="adicionar">
      <div>
        <font-awesome-icon icon="paper-plane" @click.prevent="adicionar"></font-awesome-icon>
      </div>
    </form>
    <ul class="taskList">
      <li v-for="(tarefa, index) of tarefas" :key="index">
        <label :class="{riscado: tarefa.checked}">
          <input type="checkbox" v-model="tarefa.checked">
          {{ tarefa.title }}
          <button>Excluir</button>
        </label>
      </li>
    </ul>
  </main>
</template>

<script>
import { auth, tasksCollection } from '../plugins/firebase.js'
import { where, getDocs, addDoc, query } from 'firebase/firestore'


export default {
  name: 'Home',
  data() {
    return {
      uid: '',
      novaTarefa: '',
      tarefas: []
    }
  },
    mounted(){
    this.uid = auth.currentUser.uid;
    console.log(this.uid)
    this.buscarTarefasFirebase();
    this.tarefas = []
  },
  methods: {
    adicionar() {
      if (this.novaTarefa != '') {
        addDoc(tasksCollection, {
          title: this.novaTarefa,
          owner: this.uid,
        })
        this.novaTarefa = ''
        this.buscarTarefasFirebase();
      } else {
        window.alert('Você não pode adicionar tarefas com nomes vazios')
      }
    }, async buscarTarefasFirebase() {
      this.tarefas = [];
      const logTasks = query(tasksCollection, where('owner', '==', this.uid))
      const docsTasks = await getDocs(logTasks);
      docsTasks.docs.forEach(doc => {
        this.tarefas.push({
          id: doc.id,
          title: doc.data().title,
          checked: false
        })
      });
  }
  }
}
</script>

<style>
.riscado {
  text-decoration: line-through;
  font-style: italic;
  color: gray;
}
.taskList button {
  font-size: 0.7em;
  display: inline-block;
  padding: 3px 10px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%)
}
.taskList {
  margin: 30px auto auto 100px;
}
.taskList input {
  margin: 0 15px;
}
.taskList li label {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}
.taskList li + li {
  margin-top: 5px;
}
.taskList li {
  color: black;
  height: 60px;
  border-radius: 5px;
  line-height: 60px;
  background: rgba(100, 148, 237, 0.521);
  text-align: left;
  position: relative;
  width: 600px;
}
.taskList li button {
  position: absolute;
  right: 10px;
}
.title {
  font-size: 3em;
  margin: 75px auto 75px 100px;
}
.formInputTask {
  margin-left: 100px;
  width: 600px;
  border-bottom: 2px solid cornflowerblue;
  position: relative;
  height: 45px;
}
.formInputTask div {
  color: cornflowerblue;
  font-size: 1.5em;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%)
}
.formInputTask input{
  font-size: 1.8em;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
