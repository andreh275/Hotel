<template>
  <q-page-container class="page-container">
    <q-toolbar class="toolbar">
      <q-toolbar-title>Contactos</q-toolbar-title>

      <!-- Icono con número de formularios enviados -->
      <div class="icon-container" @click="toggleMenu">
        <q-icon name="folder" size="32px" style="cursor: pointer; color: white;" />
        <span class="badge">{{ submittedForms.length }}</span>
      </div>

      <!-- Menú desplegable con lista de formularios -->
      <q-menu v-if="showMenu" class="menu-list">
        <div v-if="submittedForms.length === 0">No hay formularios enviados</div>
        <div v-for="(form, index) in submittedForms" :key="index" class="form-item">
          <h4>{{ form.name }}</h4>
          <p>Email: {{ form.email }}</p>
          <p>Tel: {{ form.phone }}</p>
          <p>Asunto: {{ form.subject }}</p>
          <p>Mensaje: {{ form.message }}</p>
          <hr />
        </div>
      </q-menu>
    </q-toolbar>

    <div class="contact-card">
      <h2>Contáctanos</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nombre Completo</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>

        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>

        <div class="form-group">
          <label for="phone">Teléfono</label>
          <input type="tel" id="phone" v-model="formData.phone" required />
        </div>

        <div class="form-group">
          <label for="subject">Asunto</label>
          <input type="text" id="subject" v-model="formData.subject" required />
        </div>

        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea id="message" v-model="formData.message" rows="4" required></textarea>
        </div>

        <button type="submit" class="submit-button">Enviar</button>
      </form>

      <div class="map-container">
        <h3>Encuéntranos en esta ubicación</h3>
        <iframe
          width="100%"
          height="250"
          frameborder="0"
          style="border:0"
          :src="googleMapsUrl"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer-content">
        <div class="contact-info">
          <p>Email: contacto@hotel.com</p>
          <p>Teléfono: +57 1 2345678</p>
          <p>
            Dirección: Calle Falsa 123, San Gil 
            <a href="https://www.google.com/maps/place/Calle+Falsa+123,+San+Gil,+Santander/@6.5714846,-73.1341889,15z/data=!4m6!3m5!1s0x8e4a1cb34ebf89f7:0xa3ab7d2b490a2b94!8m2!3d6.5714846!4d-73.1341889!16s%2Fg%2F11gq_pnxtk?entry=ttu" target="_blank">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/map-marker.png" alt="Mapa" />
            </a>
          </p>
        </div>
        <div class="social-media">
          <a href="https://www.facebook.com" target="_blank">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter-squared.png" alt="Twitter" />
          </a>
        </div>
      </div>
    </footer>
  </q-page-container>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Contactos',
  setup() {
    const formData = ref({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    const submittedForms = ref([]); 
    const showMenu = ref(false); 
    const googleMapsUrl = ref(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094725!2d144.95373531531853!3d-37.816279179751984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f4f9e7b1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1604296168881!5m2!1sen!2sau'
    );

    const submitForm = () => {
      // Guardar los datos enviados en el array
      submittedForms.value.push({ ...formData.value });

      // Resetear el formulario
      formData.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      };

      console.log('Formulario enviado:', submittedForms.value);
    };

    const toggleMenu = () => {
      showMenu.value = !showMenu.value; 
    };

    return {
      formData,
      submittedForms,
      showMenu,
      googleMapsUrl,
      submitForm,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
.page-container {
  background: linear-gradient(to right, #2196f3, #ffca28);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.toolbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #000;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.badge {
  background-color: #ff4081;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 5px;
}

.menu-list {
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: #333;
  color: white;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
}

.form-item h4 {
  margin: 5px 0;
  color: #FFD700;
}

.contact-card {
  max-width: 500px;
  margin-top: 80px;
  padding: 15px;
  background-color: #000;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  font-family: 'Georgia', serif;
  color: #fff;
}

h2, h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #FFD700;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #FFD700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #333;
  color: #fff;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #FFD700;
  color: black;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e6c200;
}

.map-container {
  margin-top: 15px;
  text-align: center;
}
.footer {
  background: #333;
  color: #fff;
  padding: 20px;
}
.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer {
  width: 100%; 
  background-color: #0dc48d;
  color: #ffffff;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-content {
  width: 90%;
  max-width: 1400px; 
  margin: 0 auto; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

footer.footer{
  padding: 0;
  max-width: 150%;
  margin-top: 20px;
  margin-left: -20px;
  margin-bottom: -20px;
}
</style>
