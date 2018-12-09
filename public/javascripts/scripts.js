// import axios from 'axios';


// let MyModel = require("./data/db.js")
const url = "mongodb://localhost:27017";

Vue.component('lista', {
 props: ['teksti', 'index'],
 template: '<li class="collection-item amber lighten-2 flow-text"><div class="row"><div class="col m10 s10">{{ teksti }}</div><div class="col m2 s2"><a class="btn btn-small waves-effect waves-light blue" v-on:click="$emit(`poisto`, index)">Poista</a></div></div></li>' // template sisältää poistonapin
})

new Vue({
  el: '#app',
  created() {
      console.log('created called.');
      this.getThings();
  },
  data() {
    return {
      message: {
        teksti: String
      },
      ostos: '',
      errors: [],
      messages: [],

   };
  },

  methods: {
    addThing: function(){
      let newThing = {
        teksti: this.ostos
      }
      console.log(newThing);
      axios.post("/posts/create", newThing)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.getThings();
    },

    getThings: function(){
      axios.get("/posts")
        .then(res =>{
          this.messages = res.data;
          // for (var i=0;i++;i<=this.messages.length) {
          //   console.log("\nMESSAGE", this.messages[i].teksti, "\n");
          // }
        })
        .catch(function (error) {
          console.log(error);
        })
    },

    // ostoksen lisääminen listaan
    lisays() {
      // Virhetilanteiden tutkinta
      this.errors = [];
      console.log("lisäyksessä");
      if (!this.ostos) {
        this.errors.push('Ostos vaaditaan.');
        console.log("error");
      }
      if (this.ostos.length > 10) {
        this.errors.push('Ostos liian pitkä. (max 10)');
        console.log("error");
      }
      if (!this.validointi(this.ostos)) {
        this.errors.push('Oikea ostos vaaditaan (Ei erikoismerkkejä!)');
        console.log("error");
      }
      console.log(!this.errors.length);
      console.log(this.ostos);

      // Jos ei virheitä, aloitetaan lisäys
      if (!this.errors.length) {
        if (this.ostos === '') {
          return;
        }
        console.log("noerrors");
        this.addThing();
        this.message.ostos = '';
        this.getThings();
      }
    },

    // Tutkitaan onko sallittuja merkkejä
    validointi: function (ostos) {
      var re = /^[a-öA-Ö0-9.,]*$/;
      return re.test(ostos);
    },

   poisto(index) {
      // this.messages.splice(index, 1);
      // this.savetus();
      var delurl = '/posts/' + this.messages[index]._id + '/delete';
      axios.post(delurl);
      this.getThings();
    },

  }
})
