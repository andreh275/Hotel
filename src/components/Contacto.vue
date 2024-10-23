<template>
  <div class="hotel-page">

    <div class="form-history-icon" @click="toggleFormHistory">
      🗃️ <span class="form-count">{{ submittedForms.length }}</span>
    </div>


    <div v-if="showFormHistory" class="form-history">
      <ul>
        <li 
          v-for="(form, index) in displayedForms" 
          :key="index" 
          class="form-item" 
          @click="selectForm(index)"
          :class="{ selected: selectedFormIndex === index }"
        >
          <div class="form-item-header">
            <strong>Formulario {{ index + 1 }}</strong>
          </div>
          <p><strong>Nombre:</strong> {{ form.name }}</p>
          <p><strong>Email:</strong> {{ form.email }}</p>
          <p><strong>Teléfono:</strong> {{ form.phone }}</p>
          <p><strong>Dirección:</strong> {{ form.address }}</p>
          <button @click.stop="editForm(index)">Editar</button>
          <button @click.stop="deleteForm(index)">Eliminar</button>
        </li>
      </ul>
      <button v-if="submittedForms.length > 4" @click="showAllForms">
        {{ showAll ? 'Ver Menos' : 'Ver Más' }}
      </button>
    </div>


    <div class="contact-form">
      <h2>Contáctanos</h2>
      <form @submit.prevent="submitForm">
        <input 
          type="text" 
          v-model="formData.name" 
          placeholder="Nombre Completo" 
          required 
          @input="validateName"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>

        <input 
          type="email" 
          v-model="formData.email" 
          placeholder="Correo Electrónico" 
          required
          @input="validateEmail"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>

        <input 
          type="text" 
          v-model="formData.phone" 
          placeholder="Teléfono" 
          required 
          @input="validatePhone"
        />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>

        <textarea 
          v-model="formData.message" 
          placeholder="Mensaje"
        ></textarea>

        <input 
          type="text" 
          placeholder="Selecciona tu dirección en el mapa" 
          v-model="formData.address" 
          readonly 
          required
        />
        <span v-if="errors.address" class="error">{{ errors.address }}</span>

        <!-- Mapa debajo del input de dirección -->
        <div class="map-container">
          <p>📍 Selecciona tu ubicación en el mapa:</p>
          <div ref="map" class="leaflet-map"></div>
        </div>

        <button :disabled="!validateForm()" type="submit">Enviar</button>
      </form>
    </div>

    <div v-if="formSubmitted" class="form-submitted-icon">
      ✔️ Formulario Enviado
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        message: '',
        address: '',
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      showFormHistory: false,
      submittedForms: [],
      map: null,
      marker: null,
      formSubmitted: false,
      selectedFormIndex: null, 
      showAll: false, 
    };
  },
  computed: {
    displayedForms() {
      return this.showAll ? this.submittedForms : this.submittedForms.slice(-4);
    },
  },
  methods: {
    validateName() {
      const namePattern = /^[a-zA-Z\s]+$/;
      this.errors.name = namePattern.test(this.formData.name)
        ? ''
        : 'El nombre solo puede contener letras y espacios.';
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.errors.email = emailPattern.test(this.formData.email)
        ? ''
        : 'Por favor, ingresa un correo válido.';
    },
    validatePhone() {
      const phonePattern = /^\d+$/;
      this.errors.phone = phonePattern.test(this.formData.phone)
        ? ''
        : 'El teléfono solo puede contener números.';
    },
    validateForm() {
      this.errors = {};

      if (!this.formData.name) this.errors.name = 'El nombre es obligatorio.';
      if (!this.formData.email) this.errors.email = 'El correo es obligatorio.';
      if (!this.formData.phone) this.errors.phone = 'El teléfono es obligatorio.';
      if (!this.formData.address) this.errors.address = 'La dirección es obligatoria.';

      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (this.validateForm()) {
        this.submittedForms.push({ ...this.formData });
        localStorage.setItem('submittedForms', JSON.stringify(this.submittedForms));
        Swal.fire({
          title: '¡Formulario Enviado!',
          text: 'Nos pondremos en contacto contigo pronto.',
          icon: 'success',
          position: 'top-center',
        });
        this.formSubmitted = true;
        this.resetForm();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Por favor, corrige los errores en el formulario.',
          icon: 'error',
        });
      }
    },
    resetForm() {
      this.formData = { name: '', email: '', phone: '', message: '', address: '' };
      this.formSubmitted = false;
      if (this.marker) this.marker.remove();
    },
    toggleFormHistory() {
      this.showFormHistory = !this.showFormHistory;
    },
    showAllForms() {
      this.showAll = !this.showAll;
    },
    selectForm(index) {
      this.selectedFormIndex = index; 
      this.formData = { ...this.submittedForms[index] }; 
    },
    editForm(index) {
      this.selectForm(index); 
    },
    deleteForm(index) {
      this.submittedForms.splice(index, 1); 
      localStorage.setItem('submittedForms', JSON.stringify(this.submittedForms));
      if (this.selectedFormIndex === index) {
        this.selectedFormIndex = null; 
      }
    },
    async initMap() {
      this.map = L.map(this.$refs.map).setView([-34.397, 150.644], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(this.map);

      this.map.on('click', async (event) => {
        const { lat, lng } = event.latlng;
        await this.getAddress(lat, lng);

        if (this.marker) {
          this.marker.remove();
        }

        this.marker = L.marker([lat, lng], { bounceOnAdd: true }).addTo(this.map);
      });
    },
    async getAddress(lat, lng) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await response.json();
        this.formData.address = data.display_name;
      } catch (error) {
        console.error('Error al obtener la dirección:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la dirección. Inténtalo de nuevo.',
          icon: 'error',
        });
      }
    },
  },
  mounted() {
    this.initMap();
    const storedForms = JSON.parse(localStorage.getItem('submittedForms'));
    if (storedForms) this.submittedForms = storedForms;
  },
};
</script>

<style scoped>
.hotel-page {
  background: linear-gradient(to right, #2196f3, #ffca28);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.contact-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.error {
  color: red;
  font-size: 0.9em;
}

.leaflet-map {
  width: 100%;
  height: 300px;
}

.map-container {
  margin-top: 20px;
}

.form-history {
  position: absolute;
  top: 50px;
  right: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 10px;
  overflow: auto;
  max-height: 400px;
}

.form-history-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.form-submitted-icon {
  margin-top: 10px;
  font-size: 2em;
  color: green;
}
</style>
