<template>
  <div class="hotel-page">
    <!-- Banner: Gimnasio -->
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

    <!-- Cartas: Gimnasio -->
    <div id="q-app" class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(card, index) in gimnasioCards" :key="index" class="my-card">
        <img :src="card.image" />
        <q-card-section>
          <div class="text-h6">{{ card.title }}</div>
          <div class="text-subtitle2">{{ card.subtitle }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">{{ card.description }}</q-card-section>
      </q-card>
    </div>

    <!-- Banner: Spa -->
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

    <!-- Cartas: Spa -->
    <div id="q-app" class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(card, index) in spaCards" :key="index" class="my-card">
        <img :src="card.image" />
        <q-card-section>
          <div class="text-h6">{{ card.title }}</div>
          <div class="text-subtitle2">{{ card.subtitle }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">{{ card.description }}</q-card-section>
      </q-card>
    </div>

    <!-- Banner: Comida Gourmet -->
    <div class="banner">
      <img :src="currentBannerImage[2]" class="banner-image" />
      <div class="banner-navigation">
        <button @click="previousImage(2)">&#10094;</button>
        <button @click="nextImage(2)">&#10095;</button>
      </div>
      <transition name="fade">
        <div class="banner-content">
          <h2>{{ banners[2].title }}</h2>
          <p>{{ banners[2].description }}</p>
        </div>
      </transition>
    </div>

    <!-- Cartas: Comida Gourmet -->
    <div id="q-app" class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(card, index) in comidaGourmetCards" :key="index" class="my-card" flat bordered>
        <q-img :src="card.image"></q-img>
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ card.title }}</div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">{{ card.subtitle }}</div>
          <div class="text-caption text-grey">{{ card.description }}</div>
        </q-card-section>
      </q-card>
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
import { ref } from 'vue';

const banners = ref([
  {
    title: "Gimnasio",
    description: "Entrena con equipos de última generación.",
    images: [
      "https://pictures.smartfit.com.br/16220/big/3bf02c76e6cd76d46c7e30580b00ed71.jpeg?1727301001",
      "https://assets.smartfit.com.br/images/new_home_co/maquinas-ultima-tecnologia.jpg",
    ],
  },
  {
    title: "Spa",
    description: "Relájate en nuestro spa de clase mundial.",
    images: [
      "https://spabogota.com.co/wp-content/uploads/2021/11/3-1.jpeg",
      "https://image-tc.galaxy.tf/wijpeg-96jp6m7y33o1r7fe2xrczcsk4/hotel-noi-casa-atacama-03.jpg?width=1920",
    ],
  },
  {
    title: "Cocina Gourmet",
    description: "Descubre sabores únicos en nuestro restaurante.",
    images: [
      "https://gugourmet.com/wp-content/uploads/2023/08/2-1.png",
      "https://oleico.com/wp-content/uploads/2021/03/oleico_oleico_image_777-1.jpeg",
    ],
  },
]);

const gimnasioCards = ref([
  { title: "Cardio Zone", subtitle: "Entrenamiento Cardio", image: "https://okdiario.com/img/2018/09/03/rutinas-de-cardio-655x368.jpg", description: "Entrena con los mejores equipos de cardio." },
  { title: "Pesas Libres", subtitle: "Fuerza", image: "https://i.blogs.es/6e6481/1366_2000-36-/450_1000.jpg", description: "Zona de pesas para entrenamiento de fuerza." },
  { title: "Clases Grupales", subtitle: "Fitness", image: "https://www.orangetheoryfitness.es/wp-content/uploads/2023/07/clases-grupales-orange-2-1.png", description: "Participa en clases dirigidas." },
  { title: "Entrenamiento Personal", subtitle: "Coaching", image: "https://media.gq.com.mx/photos/63ac9f0abbea902575697089/1:1/w_1970,h_1970,c_limit/entrenador_personal_1282804431.jpg", description: "Entrenadores certificados a tu disposición." },
]);

const spaCards = ref([
  { title: "Masajes Relajantes", subtitle: "Relajación", image: "https://dulcefiguraspa.com/wp-content/uploads/2024/01/img-5-tipos-de-masajes-relajante-1.webp", description: "Alivia el estrés con nuestros masajes." },
  { title: "Hidromasaje", subtitle: "Spa", image: "https://www.firplak.com/wp-content/uploads/2023/12/renueva-tu-hotel-o-spa-con-un-hidromasaje-o-jacuzzi.webp", description: "Disfruta del hidromasaje terapéutico." },
  { title: "Aromaterapia", subtitle: "Wellness", image: "https://colineal.com/cdn/shop/articles/que-es-aromaterapia-beneficios.jpg?v=1678207576&width=2048", description: "Terapias con aceites esenciales." },
  { title: "Faciales", subtitle: "Belleza", image: "https://cdn.prod.website-files.com/5d1392024c653e635da785a5/6230e0ce0683f9bf98057db8_attractive-woman-getting-face-beauty-procedures-spa-salon.jpg", description: "Tratamientos faciales personalizados." },
]);

const comidaGourmetCards = ref([
  { title: "Ensalada César", subtitle: "Saludable", image: "https://www.recetasdesbieta.com/wp-content/uploads/2015/06/ensalada-cesar-01.jpg", description: "Clásica ensalada con aderezo casero.", price: "$12.99", rating: 4 },
  { title: "Raviolis de Espinaca", subtitle: "Italiano", image: "https://comedera.com/wp-content/uploads/sites/9/2022/08/raviolis-de-queso-y-espinacas.jpg", description: "Raviolis frescos con espinaca y ricota.", price: "$15.49", rating: 5 },
  { title: "Sushi Mixto", subtitle: "Japonés", image: "https://www.bonsaisushi.net.ve/cache/platos/5-sushi-mixto-VSmc7MYiWMa8NV5qKnzjcw6Eq6jgwq.jpg", description: "Selección de sushi fresco.", price: "$20.99", rating: 4 },
  { title: "Postre de Chocolate", subtitle: "Dulce", image: "https://img.freepik.com/fotos-premium/pastel-lava-fondante-chocolate-fundido-postre-chocolate-caliente-pastel-lava-fresco-fondo-oscuro-ilustracion-generativa-ia-abstracta_162695-9500.jpg", description: "Delicioso postre de chocolate fundido.", price: "$6.99", rating: 5 },
]);

const currentBannerImage = ref(banners.value.map(banner => banner.images[0]));

const nextImage = (index) => {
  currentBannerImage.value[index] = banners.value[index].images[(banners.value[index].images.indexOf(currentBannerImage.value[index]) + 1) % banners.value[index].images.length];
};

const previousImage = (index) => {
  const currentIndex = banners.value[index].images.indexOf(currentBannerImage.value[index]);
  const newIndex = (currentIndex - 1 + banners.value[index].images.length) % banners.value[index].images.length;
  currentBannerImage.value[index] = banners.value[index].images[newIndex];
};
</script>

<style scoped>

.banner {
  position: relative;
  max-height: 400px;
  overflow: hidden;
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
  left: 10%;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.my-card {
  max-width: 300px;
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

  .q-pa-md {
    margin-top: 20px;
    grid-template-rows: auto;
  }
  .my-card {
    width: 300px;
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

  .q-pa-md {
    margin-top: 20px;
  }

  .my-card {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
  }



  .my-card .q-card-section {
    margin-bottom: 10px;
  }

  .my-card .q-card-section:last-of-type {
    margin-bottom: 0;
  }

  .my-card .text-h6 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .my-card .text-subtitle1 {
    font-size: 1rem;
    color: #424242;
  }

  .my-card .text-caption {
    font-size: 0.85rem;
    color: #757575;
    line-height: 1.4;
  }

  .q-card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .q-btn {
    margin: 5px 0;
  }

  .q-separator {
    margin: 10px 0;
  }

  .q-card-section .row {
    margin-top: 8px;
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .my-card {
  width: 300px;
  height: 400px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
}

.my-card img {
  width: 100%; 
  height: 150px; 
  object-fit: cover; 
  border-radius: 10px;
}


.q-card-section {
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}

.my-card .text-h6 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.my-card .text-subtitle1 {
  font-size: 1rem;
  color: #424242;
}

.my-card .text-caption {
  font-size: 0.85rem;
  color: #757575;
  line-height: 1.4;
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
