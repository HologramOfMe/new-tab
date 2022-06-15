<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>New Tab</ion-title>
        <ion-icon
          class="header-icon"
          src="assets/icon/finger-print.svg"
          slot="end"
          size="large"
          @click="authenticate">
        </ion-icon>
        <!-- <ion-icon name="finger-print"></ion-icon> -->
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col v-if="isAuthenticated" size-lg="10" offset-lg="1"><!-- Contains all nested Columns -->

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
                          @change="getImageFile"></ion-input>
                      </ion-item>
                    </ion-list>
                    <ion-button @click="createCard">Add Card</ion-button>
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
  IonIcon,
  toastController } from '@ionic/vue';
import { defineComponent } from 'vue';

// firestore methods
import { collection, addDoc, getDocs } from "firebase/firestore";
// the firebase service instances
import { db, storage, auth } from '../firebase/init';
// the cloud storage for storing image files
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";
// firebase authentication modules
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
// Interface for working with Cards
import { FavCard } from "../models/favCard";

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
    IonIcon,
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.isAuthenticated = true;
        console.log(`User is authenticated ${user.email}`)

        // Fetch the cards data from the database
      this.getCards();
      }else{
        this.isAuthenticated = false;
        console.log('No user is authenticated')
      }
    });
    
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
      ],
      isAuthenticated: false,
      newCardName: "",
      newCardUrl: "",
      newCardFileName: "",
      imgData: null,
    }
  },
  methods: {
    gotoFav(url: string) {
      // console.log(url)
      window.open(url, '_self');
    },
    async openToast(message: string) {
      const toast = await toastController
        .create({
          message: message,
          duration: 3000
        })
      return toast.present();
    },
    getImageFile(event: any) {
      const imgData = event.target.files[0];
      this.newCardFileName = `${imgData.name}`;
      this.imgData = imgData;
      console.log(this.imgData);
    },
    async createCard() {
      // File types to accept // TODO: How to use this to prevent incorrect file types
      // const fileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg'];

      // 'file' comes from the Blob or File API
      if(this.isAuthenticated && this.imgData) {
        const storageRef = await ref(storage, `${this.newCardFileName}`);
        uploadBytes(storageRef, this.imgData).then((snapshot) => {
        console.log(`Image Storage md5 Hash: ${snapshot.metadata.md5Hash}`);
        });
      }else{
        this.openToast('Please select an image file.');
      }

      // Reference to the firestore cards collection
      const collectionRef = collection(db, 'cards');

      // Data to send to db
      const cardData = {
        name: this.newCardName, 
        url: this.newCardUrl,
        imgUrl: this.newCardFileName,
        altText: `${this.newCardName.toLowerCase()} logo`,
      };

      // create document and return reference to it
      await addDoc(collectionRef, cardData);

      // Clear the form ready for new data
      this.newCardName = "";
      this.newCardUrl = "";
      this.newCardFileName = "";

      // Display feedback for the user
      this.openToast('New card created.');
    },
    async getCards() {
      const querySnapshot = await getDocs(collection(db, "cards"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        // fetch the download url of the image for each card
        getDownloadURL(ref(storage, doc.data().imgUrl))
          .then((storageUrl) => {
            // create a FavCard object, assign the storage url to imgUrl
            const card: FavCard = {
              url: doc.data().url,
              imgUrl: storageUrl,
              name: doc.data().name,
              altText: doc.data().altText,
            };

            // Push the data to this.favCards array
            // TODO: fix problem where card can't be pushed to this.favCards when it's empty
            this.favCards.push(card);
          });
      });
    },
    authenticate() {
      console.log('Authenticading...could take a while...');

      // TODO: Figure out how to prevent anyone other than me signing in
      // Must be some sort of Authentication config business...?

      // Use google as authentication provider
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential?.accessToken
          const user = result.user;
          console.log(user.email);

          // Update auth state to make content visible
          this.isAuthenticated = true;
        })
        .catch((error) => {
          // There has been an error. Make sure no data is presented
          this.isAuthenticated = false;
          // Handle Errors here.
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          // const email = error.customData.email;
          // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
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

.header-icon {
  margin-right: 20px;
}
</style>
