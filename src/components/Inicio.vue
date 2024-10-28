<template>
  <div class="hotel-page">
    <!-- Primer Banner: Historia del hotel -->
    <div class="banner">
      <img :src="currentBannerImage[0]" class="banner-image" />
      <div class="banner-navigation">
        <button @click="previousImage(0)">&#10094;</button>
        <button @click="nextImage(0)">&#10095;</button>
      </div>
      <transition name="fade">
        <div class="banner-content">
          <h2>{{ banners[0].title }}</h2>
          <p>{{ banners[0].description }}</p>
        </div>
      </transition>
    </div>

    <!-- Sección: Tipos de Habitaciones -->
    <h3 class="section-title">Tipos de habitaciones de nuestro hotel</h3>
    <div class="cards-container">
      <div
        v-for="(room, index) in rooms"
        :key="index"
        class="card"
        @mouseover="onMouseEnter(room)"
        @mouseleave="onMouseLeave"
        @click="onCardClick(room)"
      >
        <img :src="room.image" :alt="room.title" class="card-image" @click.stop="goToLink(room.link)" />
        <h2 class="card-title">{{ room.title }}</h2>
        <p class="card-description">{{ room.description }}</p>
      </div>
    </div>

    <!-- Mensaje dinámico al hacer clic en una tarjeta -->
    <div v-if="selectedItem" class="message-box">
      <h3>{{ selectedItem.title }}</h3>
      <p>{{ selectedItem.description }}</p>
    </div>

    <!-- Segundo Banner: Servicios del hotel -->
    <div class="banner">
      <img :src="currentBannerImage[1]" class="banner-image" />
      <div class="banner-navigation">
        <button @click="previousImage(1)">&#10094;</button>
        <button @click="nextImage(1)">&#10095;</button>
      </div>
      <transition name="fade">
        <div class="banner-content">
          <h2>{{ banners[1].title }}</h2>
          <p>{{ banners[1].description }}</p>
        </div>
      </transition>
    </div>

    <!-- Sección: Deportes Extremos -->
    <h3 class="section-title">Deportes Extremos</h3>
    <div class="cards-container">
      <div
        v-for="(sport, index) in extremeSports"
        :key="index"
        class="card"
        @mouseover="onMouseEnter(sport)"
        @mouseleave="onMouseLeave"
        @click="onCardClick(sport)"
      >
        <img :src="sport.image" :alt="sport.title" class="card-image" @click.stop="goToLink(sport.link)" />
        <h2 class="card-title">{{ sport.title }}</h2>
        <p class="card-description">{{ sport.description }}</p>
      </div>
    </div>

    <!-- Pie de página -->
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const banners = ref([
      {
        title: "Historia del Hotel",
        description: "El diseño del hotel refleja la rica cultura colombiana, con habitaciones decoradas con artesanías locales y vistas impresionantes de la exuberante vegetación que rodea la región. Cada rincón del hotel está impregnado de la historia y la calidez del pueblo, brindando a los visitantes una experiencia auténtica y memorable.",
        images: [
          "https://www.invertour.com.mx/wp-content/uploads/2022/05/inver-marriott.jpg",
          "https://image-tc.galaxy.tf/wijpeg-1f4npejxl3tqu37y1tt47r18f/banner-web-hoteles-1920-x-1080-px-2.jpg?width=1920",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/188407515.jpg?k=a3cbef788c62397a27e7880b4ae521969251fe9dceee01bf8b846cc251d0f6c5&o=&hp=1",
        ],
      },
      {
        title: "Servicios del Hotel",
        description: "Ofrecemos spa, gimnasio, restaurante gourmet y mucho más.",
        images: [
          "https://medac.es/sites/default/files/blog/destacadas/gimnasios-boutique.jpg",
          "https://paraleloestudio.com/wp-content/uploads/Distribucion_de_Restaurante_01-1024x683.jpeg",
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/dc/83/2f/meson-del-cuchicute.jpg?w=1200&h=-1&s=1",
        ],
      },
    ]);

    const rooms = ref([
      { title: "Habitación Deluxe", description: "Con vista al río y balcón privado.", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/28/57/53/howard-johnson-plaza.jpg", link: "/Habitaciones" },
      { title: "Suite Presidencial", description: "Lujosa suite con jacuzzi y sala de estar.", image: "https://images.trvl-media.com/lodging/45000000/44240000/44237100/44237083/ba22fdf7.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill", link: "/Habitaciones" },
      { title: "Habitación Familiar", description: "Espacio amplio y cómodo para toda la familia.", image: "https://www.hotelboutiquecaney.com/media/30164/hote-boutique-caney-villa-de-leyva-habitacion-familiar-hero.jpeg", link: "/Habitaciones" },
      { title: "Habitación Estándar", description: "Comodidad y tranquilidad a un precio accesible.", image: "https://www.hotelvaldorba.com/wp-content/uploads/2014/11/Habitacion-de-Hotel-rural-Valdorba-en-Navarra-1920x1080.jpg", link: "/Habitaciones" },
    ]);

    const extremeSports = ref([
      { title: "Rafting", description: "Aventura en grupo en el río Fonce.", image: "https://www.explornatura.com/templates/yootheme/cache/FAMILY-RAFTING-1-8df42449.jpeg", link: "/Deportes" },
      { title: "Parapente", description: "Vuela sobre los paisajes de Santander.", image: "https://www.parapentesangil.com/wp-content/uploads/2022/04/Parapentesangil-768x660.jpg", link: "/Deportes" },
      { title: "Escalada", description: "Desafía las montañas más altas.", image: "https://media-cdn.tripadvisor.com/media/photo-s/17/85/1f/06/conoce-los-mejores-lugares.jpg", link: "/Deportes" },
      { title: "Kayak", description: "Aventura individual en el río Fonce.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Sea_Kayak.JPG/640px-Sea_Kayak.JPG", link: "/Deportes" },
    ]);

    const currentBannerImage = ref(banners.value[0].images);
    const selectedItem = ref(null);
    const currentBannerIndex = ref(0);

    const nextImage = (bannerIndex) => {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value[bannerIndex].images.length;
      currentBannerImage.value[bannerIndex] = banners.value[bannerIndex].images[currentBannerIndex.value];
    };

    const previousImage = (bannerIndex) => {
      currentBannerIndex.value = (currentBannerIndex.value - 1 + banners.value[bannerIndex].images.length) % banners.value[bannerIndex].images.length;
      currentBannerImage.value[bannerIndex] = banners.value[bannerIndex].images[currentBannerIndex.value];
    };

    const goToLink = (link) => {
      window.location.href = link;
    };

    const onCardClick = (item) => {
      selectedItem.value = item;
    };

    const onMouseEnter = (item) => {
      selectedItem.value = item;
    };

    const onMouseLeave = () => {
      selectedItem.value = null;
    };

    return {
      banners,
      rooms,
      extremeSports,
      currentBannerImage,
      selectedItem,
      nextImage,
      previousImage,
      goToLink,
      onCardClick,
      onMouseEnter,
      onMouseLeave,
    };
  },
};
</script>

<style scoped>


.banner-image {
  width: 100%;
  height: auto;
}
.banner-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}
.card {
  cursor: pointer;
}
.message-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
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

.hotel-page {
  font-family: Arial, sans-serif;
}

.banner {
  position: relative;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
}

.banner-navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.banner-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
}

.section-title {
  text-align: center;
  margin: 20px 0;
  color: rgb(0, 0, 0);
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: auto;
}

.card-title {
  font-size: 1.2em;
  margin: 10px 0;
}

.card-description {
  font-size: 0.9em;
  margin: 10px 0;
}

.message-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
  background-color: #f9f9f9;
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

.contact-info, .social-media {
  margin: 10px 0;
}

.contact-info p {
  margin: 5px 0;
}

.social-media a {
  margin: 0 10px;
}

div.q-page-container.page-container{
  padding: 0;
}
footer.footer{
  padding: 0;
  max-width: 150%;
  margin-top: 20px;
  margin-left: -20px;
  margin-bottom: -20px;
}

.contact-info p {
  margin: 5px 0;
}

.social-media img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}


.hotel-page {
  font-family: Arial, sans-serif;
}

.banner {
  position: relative;
}

.banner-image {
  width: 100%;
  height: auto;
}

.banner-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.banner-content {
  position: absolute;
  bottom: 10%;
  left: 5%;
  color: white;
}

.section-title {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.message-box {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 20px;
}
.social-media a {
  margin: 0 10px;
}

.social-media img {
  width: 30px; 
}


.hotel-page {
  background: linear-gradient(to right, #1e88e5, #ffca28);
  padding: 20px;
}

.banner {
  margin: 20px 0;
  text-align: center;
  background-color: rgba(30, 136, 229, 0.8);
  padding: 40px;
  border-radius: 10px;
  position: relative;
}

.banner-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.banner-navigation button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.banner-image {
  width: 100%;
  height: 450px;
  object-fit: cover; 
  border-radius: 10px;
}

.banner-content h2 {
  font-size: 2.5em;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

.banner-content p {
  font-size: 1.2em;
  color: white;
}

.section-title {
  text-align: center;
  margin: 30px 0;
  font-size: 2em;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 200px; 
  transition: transform 0.3s;
  text-align: center;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-title {
  font-size: 1.5em;
  color: #333;
}

.card-description {
  padding: 0 10px;
}

.contact-info {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
}
.banner-content h2[data-v-e6923d7c] {
    font-size: 2.5em;
    color: rgb(0, 0, 0);
    text-shadow: 2px 2px 5px rgba(255, 147, 147, 0.7);
}
.banner-content p[data-v-e6923d7c] {
    font-size: 1.2em;
    color: #ffffff;
    text-shadow: 2px 2px 5px rgba(15, 0, 49, 0.7);
}
</style>
