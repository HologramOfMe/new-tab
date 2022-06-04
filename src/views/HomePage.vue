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

              <!-- Favorite Site Cards -->
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

              <!-- New Card Form -->
              <ion-row>
                <ion-col size-xl="4" size-md="6" size-xs="12">
                  <form>
                    <ion-list>
                      <ion-item>
                        <ion-label for="new-card-name">Name: </ion-label>
                        <ion-input
                          type="text"
                          id="new-card-name"
                          v-model="newCardName"></ion-input>
                      </ion-item>
                      <ion-item>
                        <ion-label for="new-card-url">Site Url: </ion-label>
                        <ion-input
                          type="text"
                          id="new-card-url"
                          v-model="newCardUrl"></ion-input>
                      </ion-item>
                      <ion-item>
                        <ion-label for="new-card-filename">Image File: </ion-label>
                        <ion-input
                          type="file"
                          id="new-card-filename"
                          v-model="newCardFileName"></ion-input>
                      </ion-item>
                    </ion-list>
                    <ion-button @click="createCard">Add Dummy</ion-button>
                  </form>
                </ion-col>
              </ion-row>

            </ion-col>
          </ion-row>
        </ion-grid>

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
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  toastController } from '@ionic/vue';
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
    IonButton,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
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
      ],
      newCardName: "",
      newCardUrl: "",
      newCardFileName: "",
    }
  },
  methods: {
    gotoFav(url: string) {
      // console.log(url)
      window.open(url, '_blank');
    },
    async openToast(message: string) {
      const toast = await toastController
        .create({
          message: message,
          duration: 3000
        })
      return toast.present();
    },
    async createCard() {
      // Reference to the firestore cards collection
      const collectionRef = collection(db, 'cards');

      // Dummy data to send to db
      const cardData = {
        name: this.newCardName, 
        url: this.newCardUrl,
        imgUrl: `assets/img/${this.trimFilename(this.newCardFileName)}`,
        altText: `${this.newCardName.toLowerCase()} logo`,
      };

      // create document and return reference to it
      const docRef = await addDoc(collectionRef, cardData);

      // Clear the form ready for new data
      this.newCardName = "";
      this.newCardUrl = "";
      this.newCardFileName = "";

      // access auto-generated ID with '.id'
      console.log('Document was created with ID:', docRef.id)

      // Display feedback for the user
      this.openToast('New card created.');
    },
    trimFilename(filename: any): string {
      // TODO: Collect the file and upload to google cloudstore
      console.log(filename);
      return 'bogus.jpg';
    },
  },
});
</script>

<style scoped>

form {
  margin: 10px;
}

ion-button {
  margin-top: 20px;
}

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
