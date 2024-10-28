<template>
  <q-layout view="hHh LpR fFf" class="bg-black">
    <!-- Encabezado -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <q-btn dense flat round @click="toggleLeftDrawer" class="absolute-left">
          <q-img
            src="https://www.shareicon.net/data/2016/05/30/773043_multimedia_512x512.png"
            style="width: 32px; height: 32px;"
          />
        </q-btn>

        <q-toolbar-title class="title text-center" @click="$router.push('/')">
          Hotel Colombia Fantasy
        </q-toolbar-title>

        <!-- Botón de Login o imagen de usuario -->
        <div v-if="user">
          <q-avatar>
            <q-img :src="user.photoURL" />
          </q-avatar>
        </div>
        <q-btn
          v-else
          label="Login"
          color="primary"
          class="login-btn"
          @click="showLoginModal = true"
        />
      </q-toolbar>
    </q-header>

    <!-- Menú lateral -->
    <q-drawer
      class="menu-bg"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <q-list>
        <q-item clickable v-ripple @click="$router.push('/')">
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push('/Servicios')">
          <q-item-section>
            <q-item-label>Servicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push('/habitaciones')">
          <q-item-section>
            <q-item-label>Habitaciones</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push('/deportes')">
          <q-item-section>
            <q-item-label>Deportes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="$router.push('/contacto')">
          <q-item-section>
            <q-item-label>Contacto</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Contenido principal -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Modal de Login -->
    <q-dialog v-model="showLoginModal" persistent>
      <q-card>
        <q-card-section class="text-h6">Iniciar Sesión</q-card-section>

        <q-card-section>
          <q-input
            v-model="email"
            label="Correo electrónico"
            type="email"
            outlined
          />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
            class="q-mt-sm"
          />
        </q-card-section>

        <!-- Botones de Login con Google y Facebook -->
        <q-card-section class="row justify-center q-my-md">
          <q-btn
            label="Continuar con Google"
            icon="fa-brands fa-google"
            color="red"
            class="q-mr-md"
            @click="loginWithGoogle"
          />
          <q-btn
            label="Continuar con Facebook"
            icon="fa-brands fa-facebook"
            color="blue"
            @click="loginWithFacebook"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="showLoginModal = false" />
          <q-btn label="Entrar" color="primary" @click="login" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const showLoginModal = ref(false)
    const email = ref('')
    const password = ref('')
    const user = ref(null) 

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const login = () => {
      console.log('Intentando iniciar sesión con:', email.value, password.value)
      showLoginModal.value = false
    }

    const loginWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          user.value = result.user; 
          console.log('Login con Google:', user.value);
          showLoginModal.value = false; 
        })
        .catch((error) => {
          console.error('Error durante el login con Google:', error);
        });
    }

    const loginWithFacebook = () => {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          user.value = result.user; 
          console.log('Login con Facebook:', user.value);
          showLoginModal.value = false; 
        })
        .catch((error) => {
          console.error('Error durante el login con Facebook:', error);
        });
    }

    return {
      leftDrawerOpen,
      showLoginModal,
      email,
      password,
      user,
      toggleLeftDrawer,
      login,
      loginWithGoogle,
      loginWithFacebook
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
}

.title:hover {
  transform: scale(1.1);
  color: #ffeb3b;
}

.login-btn {
  position: absolute;
  right: 16px;
  top: 12px;
}

.bg-black {
  background-color: black !important;
}

.menu-bg {
  background-color: #1c1c1c;
}

.q-btn {
  width: 100%;
  max-width: 250px;
}

.fa-google {
  margin-right: 8px;
}

.fa-facebook {
  margin-right: 8px;
}

.social-button {
  font-size: 20px;
  color: #ffffff;
  margin: 0 5px; 
}
</style>
