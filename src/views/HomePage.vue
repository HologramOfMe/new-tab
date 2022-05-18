<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>New Tab</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col size-lg="10" offset-lg="1"><!-- Contains all nested Columns -->
              <ion-row>
                <ion-col size-xl="2" size-lg="3" size-md="4" size-xs="6" v-for="card in favCards" :key="card.name">
                  <div class="card-container">
                    <ion-card @click="gotoFav(card.url)">
                      <img :src="card.imgUrl" :alt="card.altText">
                      <ion-card-content>
                        {{ card.name }}
                      </ion-card-content>
                    </ion-card>
                  </div>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button @click="createCard">Add Dummy</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

// firestore methods
import { collection, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init'


export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton
  },
  data() {
    return {
      favCards: [
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Vue", 
          url: "https://www.vuejs.org/",
          imgUrl: "assets/img/vue.svg",
          altText: "Vue J S",
        },
        {
          name: "Firebase",
          url: "https://firebase.google.com/",
          imgUrl: "assets/img/firebase.svg",
          altText: "Firebase"
        }
      ]
    }
  },
  methods: {
    gotoFav(url: string) {
      // console.log(url)
      window.open(url, '_blank');
    },
    async createCard() {
      // Reference to the firestore cards collection
      const collectionRef = collection(db, 'cards');

      // Dummy data to send to db
      const cardData = {
        name: "Vue", 
        url: "https://www.vuejs.org/",
        imgUrl: "assets/img/vue.svg",
        altText: "Vue J S",
      };

      // create document and return reference to it
      const docRef = await addDoc(collectionRef, cardData);

      // access auto-generated ID with '.id'
      console.log('Document was created with ID:', docRef.id)
    }
  },
  created() {
    this.createCard
  }
});
</script>

<style scoped>
#container {
  color: var(--ion-color-secondary);
  /* width: 80%; */
  margin: auto;
  text-align: center;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

ion-card img {
  height: 200px;
}

.card-container {
  background-color: none;
}
</style>
