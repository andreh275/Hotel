<template>
  <div class="hotel-page">
    <!-- Banner con múltiples imágenes -->
    <div class="banner" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <button @click="prevSlide" class="arrow arrow-left">←</button>
      <div class="banner-content">
        <div class="banner-image-wrapper">
          <transition name="fade">
            <img :src="currentBanner.image" :alt="currentBanner.title" class="banner-image" />
          </transition>
          <div class="banner-text">
            <h2>{{ currentBanner.title }}</h2>
            <p>{{ currentBanner.description }}</p>
          </div>
        </div>
      </div>
      <button @click="nextSlide" class="arrow arrow-right">→</button>
    </div>

    <!-- Sección de Tarjetas -->
    <div class="cards-container">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img :src="card.image" :alt="card.title" class="card-image" />
        <h2 class="card-title">{{ card.title }}</h2>
        <p class="card-description">{{ card.description }}</p>
        <p class="card-price">{{ card.price }}</p>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const currentBannerIndex = ref(0);
    const isHovered = ref(false);
    const autoSlideInterval = ref(null);
    const banners = ref([
      {
        title: "Disfruta de las Mejores Vistas",
        description: "Explora nuestros paisajes",
        image: "https://media2.utp.edu.co/programas/106/Pereira-caf.jpeg"
      },
      {
        title: "Aventura Extrema",
        description: "Vive la adrenalina con nuestros deportes extremos.",
        image: "https://taytamaki.com/wp-content/uploads/2022/12/PUENTE-COLGANTE-1024x683.jpg"
      },
      {
        title: "Relájate en el Spa",
        description: "Descansa con nuestro servicio de spa de primera clase.",
        image: "https://media.cylex.com.co/companies/1113/9062/images/-1269285251-img4_159204_large.jpg"
      },
    ]);
    
    const cards = ref([
      {
        title: "Rafting en el Río Fonce",
        description: "Surca las aguas rápidas del Río Fonce en San Gil.",
        price: "$150 por persona",
        image: "https://static.roadtrip.travel/media/roadtrips/rafting-en-el-rio-fonce-desde-san-gil-santander-1200-81e6563.jpg"
      },
      {
        title: "Parapente en Chicamocha",
        description: "Vuela sobre el imponente Cañón del Chicamocha.",
        price: "$200 por persona",
        image: "https://www.riosycanoas.com/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-26-at-17.22.48.jpeg"
      },
      {
        title: "Bungee Jumping en Santander",
        description: "Siente la adrenalina saltando al vacío desde 70 metros.",
        price: "$180 por persona",
        image: "https://travelerhostel.com/wp-content/uploads/elementor/thumbs/4-copia-1-qrkh3arnl178u1dl9ulcfqsm5ac66mj61u9pzl23v4.jpg"
      },
      {
        title: "Ciclismo de Montaña en Boyacá",
        description: "Recorre senderos desafiantes entre montañas y valles.",
        price: "$80 por persona",
        image: "https://img1.wsimg.com/isteam/ip/8d6c24da-4875-44c5-a47b-0068c8284fef/Cocuy%202008%20(188).jpg"
      },
      {
        title: "Surf en Nuquí",
        description: "Disfruta de las olas del Pacífico colombiano.",
        price: "$250 por persona",
        image: "https://colombiavisible.com/wp-content/uploads/2022/02/Mendihuaca-1024x576.jpg"
      },
      {
        title: "Escalada en Suesca",
        description: "Escala las famosas rocas de Suesca.",
        price: "$100 por persona",
        image: "https://suescalada.com/wp-content/uploads/2023/07/Escalada-en-roca-rock-climbing-Suesca_1.jpg"
      },
      {
        title: "Kitesurf en La Guajira",
        description: "Aprovecha los fuertes vientos en Cabo de la Vela.",
        price: "$300 por persona",
        image: "https://www.salyroca.es/media/salyroca/images/2022/10/30/2022103003172728089.jpg"
      },
      {
        title: "Rappel en Cañones de Antioquia",
        description: "Desciende cañones rodeados de naturaleza.",
        price: "$120 por persona",
        image: "https://s2.wklcdn.com/image_11/339507/34372923/22182008.400x300.jpg"
      },
      {
        title: "Puenting en San Gil",
        description: "Experimenta la emoción del puenting en un entorno natural.",
        price: "$170 por persona",
        image: "https://i.ytimg.com/vi/OpLJkBwx9Ns/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDb9MFo0DqjPJkLFQo3Al48Gmfzlg"
      },
      {
        title: "Canopy en Quindío",
        description: "Deslízate entre las copas de los árboles del Eje Cafetero.",
        price: "$90 por persona",
        image: "https://lh3.googleusercontent.com/proxy/eWrvpaFCfsqeaRjKq2ISI-lLSiKraz0-CPPnmo0pJXg-V63IiHV3t0ZMCyLyj6Lch78Rmad8mGsguMAdYhC0a61og1u3F7Fkz0ckzF7pnGnfMftA9swCMwXe-9MTxSU7IiYujgPS3HpV7BvrkaCwEcWvUwDqjmCZyg"
      },
      {
        title: "Buceo en Providencia",
        description: "Explora el tercer arrecife de coral más grande del mundo.",
        price: "$400 por persona",
        image: "https://i.ytimg.com/vi/j3rAe7TMMFA/maxresdefault.jpg"
      },
      {
        title: "Sandboard en La Tatacoa",
        description: "Deslízate por las dunas del desierto de La Tatacoa.",
        price: "$130 por persona",
        image: "https://www.mapasybanderas.com/wp-content/uploads/2021/01/sandboard-desierto-de-la-tatacoa.jpg"
      }
    ]);

    const currentBanner = computed(() => banners.value[currentBannerIndex.value]);

    const nextSlide = () => {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
    };

    const prevSlide = () => {
      currentBannerIndex.value = (currentBannerIndex.value - 1 + banners.value.length) % banners.value.length;
    };

    const startAutoSlide = () => {
      autoSlideInterval.value = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval.value);
    };

    const onMouseEnter = () => {
      stopAutoSlide();
    };

    const onMouseLeave = () => {
      startAutoSlide();
    };

    onMounted(() => {
      startAutoSlide();
    });

    onBeforeUnmount(() => {
      stopAutoSlide();
    });

    return {
      currentBanner,
      nextSlide,
      prevSlide,
      cards,
      onMouseEnter,
      onMouseLeave
    };
  }
};
</script>

<style scoped>

.hotel-page {
  background: linear-gradient(to right, #1e88e5, #ffca28);
}

.banner {
  margin: 20px 0;
  text-align: center;
  background-color: rgba(30, 136, 229, 0.8);
  padding: 30px;
  border-radius: 10px;
  position: relative;
}

.banner-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
}

.card-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.card-title {
  font-size: 1.1em;
  margin: 8px 0;
}

.card-description {
  font-size: 0.9em;
  color: #555;
  margin: 4px 0;
}

.card-price {
  font-size: 1em;
  color: #28a745;
  margin: 5px 0;
}

.reservation-button {
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 5px;
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

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.arrow-left {
  left: 15px;
}

.arrow-right {
  right: 15px;
}

</style>
