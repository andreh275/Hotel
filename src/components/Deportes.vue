<template>
  <div class="hotel-page">
    <!-- Primer Banner: Historia del hotel -->
    <div class="banner" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <button @click="prevSlide(0)" class="arrow arrow-left">←</button>
      <div class="banner-content">
        <div class="banner-image-wrapper">
          <transition name="fade">
            <img :src="currentBanner[0].image" :alt="currentBanner[0].title" class="banner-image" />
          </transition>
          <div class="banner-text">
            <h2>{{ currentBanner[0].title }}</h2>
            <p>{{ currentBanner[0].description }}</p>
          </div>
        </div>
      </div>
      <button @click="nextSlide(0)" class="arrow arrow-right">→</button>
    </div>

    <!-- Sección: Tipos de Habitaciones -->
    <h3 class="section-title">Tipos de habitaciones de nuestro hotel</h3>
    <div class="cards-container">
      <div
        v-for="(room, index) in rooms"
        :key="index"
        class="card"
        @mouseover="onMouseEnter(room)"
        @mouseleave="onMouseLeave(room)"
        @click="onCardClick(room)"
      >
        <img :src="room.image" :alt="room.title" class="card-image" @click.stop="goToLink(room.link)" />
        <h2 class="card-title">{{ room.title }}</h2>
        <p class="card-description">{{ room.description }}</p>
      </div>
    </div>


    <div v-if="selectedItem" class="message-box">
      <h3>{{ selectedItem.title }}</h3>
      <p>{{ selectedItem.description }}</p>
    </div>

    <!-- Segundo Banner: Servicios del hotel -->
    <div class="banner" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <button @click="prevSlide(1)" class="arrow arrow-left">←</button>
      <div class="banner-content">
        <div class="banner-image-wrapper">
          <transition name="fade">
            <img :src="currentBanner[1].image" :alt="currentBanner[1].title" class="banner-image" />
          </transition>
          <div class="banner-text">
            <h2>{{ currentBanner[1].title }}</h2>
            <p>{{ currentBanner[1].description }}</p>
          </div>
        </div>
      </div>
      <button @click="nextSlide(1)" class="arrow arrow-right">→</button>
    </div>

    <!-- Sección: Deportes Extremos -->
    <h3 class="section-title">Deportes Extremos</h3>
    <div class="cards-container">
      <div
        v-for="(sport, index) in extremeSports"
        :key="index"
        class="card"
        @mouseover="onMouseEnter(sport)"
        @mouseleave="onMouseLeave(sport)"
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

<script>
export default {
  data() {
    return {
      banners: [
        {
          title: "Historia del Hotel",
          description: "El diseño del hotel refleja la rica cultura colombiana, con habitaciones decoradas con artesanías locales y vistas impresionantes de la exuberante vegetación que rodea la región.",
          images: [
            "https://www.momondo.com.co/rimg/kimg/31/aa/9a4eb172-60b750aa-8.jpeg?width=968&height=607&crop=true",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/66/7e/80/alejandria-resort.jpg?w=1200&h=-1&s=1",
            "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2022/10/15/634af63a9c1ea.jpeg",
          ],
        },
        {
          title: "Servicios del Hotel",
          description: "Ofrecemos spa, gimnasio, restaurante gourmet y mucho más.",
          images: [
            "https://fotografias.correryfitness.com/clipping/cmsimages02/2016/08/01/4DC29812-B537-4839-8AF1-69E7F86C2058/69.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/0d/d1/dc/08/vista-do-salao-do-restaurante.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/dc/83/2f/meson-del-cuchicute.jpg?w=1200&h=-1&s=1",
          ],
        },
      ],
      currentBanner: [
        { image: "https://www.momondo.com.co/rimg/kimg/31/aa/9a4eb172-60b750aa-8.jpeg?width=968&height=607&crop=true", title: "Historia del Hotel", description: "El diseño del hotel refleja la rica cultura colombiana, con habitaciones decoradas con artesanías locales y vistas impresionantes de la exuberante vegetación que rodea la región." },
        { image: "https://fotografias.correryfitness.com/clipping/cmsimages02/2016/08/01/4DC29812-B537-4839-8AF1-69E7F86C2058/69.jpg", title: "Servicios del Hotel", description: "Ofrecemos spa, gimnasio, restaurante gourmet y mucho más." }
      ],
      rooms: [
        { title: "Habitación Deluxe", description: "Con vista al río y balcón privado.", image: "https://media-cdn.tripadvisor.com/media/photo-s/03/28/57/53/howard-johnson-plaza.jpg", link: "/Habitaciones" },
        { title: "Suite Presidencial", description: "Lujosa suite con jacuzzi y sala de estar.", image: "https://images.trvl-media.com/lodging/45000000/44240000/44237100/44237083/ba22fdf7.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill", link: "/Habitaciones" },
        { title: "Habitación Familiar", description: "Espacio amplio y cómodo para toda la familia.", image: "https://www.hotelboutiquecaney.com/media/30164/hote-boutique-caney-villa-de-leyva-habitacion-familiar-hero.jpeg", link: "/Habitaciones" },
        { title: "Habitación Estándar", description: "Comodidad y tranquilidad a un precio accesible.", image: "https://www.hotelvaldorba.com/wp-content/uploads/2014/11/Habitacion-de-Hotel-rural-Valdorba-en-Navarra-1920x1080.jpg", link: "/Habitaciones" },
      ],
      extremeSports: [
        { title: "Parapente", description: "Vuela sobre los hermosos paisajes de la región.", image: "https://s3.amazonaws.com/hfcdn-ux/images/post_images/61b0e3c191fd4550aa1e35e118a3dc68.jpg", link: "/Deportes" },
        { title: "Rafting", description: "Desciende por los emocionantes ríos de la zona.", image: "https://s3.amazonaws.com/hfcdn-ux/images/post_images/9c4c272e6e8e427295c66ae645e89edb.jpg", link: "/Deportes" },
      ],
      currentBannerImage: [0, 0], 
      selectedItem: null,
      bannerIntervals: [],
    };
  },
  mounted() {
    this.startBannerRotation();
  },
  beforeDestroy() {
    this.stopBannerRotation();
  },
  methods: {
    onMouseEnter(item) {
      this.selectedItem = item;
    },
    onMouseLeave() {
      this.selectedItem = null;
    },
    onCardClick(item) {
      this.$router.push(item.link);
    },
    goToLink(link) {
      window.open(link, "_blank");
    },
    nextSlide(index) {
      this.currentBanner[index] = (this.currentBanner[index] + 1) % this.banners[index].images.length;
      this.currentBanner[index].image = this.banners[index].images[this.currentBanner[index]];
    },
    prevSlide(index) {
      this.currentBanner[index] = (this.currentBanner[index] - 1 + this.banners[index].images.length) % this.banners[index].images.length;
      this.currentBanner[index].image = this.banners[index].images[this.currentBanner[index]];
    },
    startBannerRotation() {
      this.bannerIntervals = [
        setInterval(() => this.nextSlide(0), 5000), // Rotar el primer banner cada 5 segundos
        setInterval(() => this.nextSlide(1), 5000), // Rotar el segundo banner cada 5 segundos
      ];
    },
    stopBannerRotation() {
      this.bannerIntervals.forEach(interval => clearInterval(interval));
    },
  },
};
</script>

<style scoped>

.hotel-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner {
  position: relative;
  width: 100%;
  max-width: 1200px;
}

.banner-image {
  width: 100%;
  height: auto;
}

.banner-image-wrapper {
  position: relative;
}

.banner-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
}

.arrow {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.card {
  width: 200px;
  margin: 10px;
  text-align: center;
}

.card-image {
  width: 100%;
  height: auto;
}

.message-box {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
}

.footer {
  background-color: #222;
  color: white;
  padding: 10px;
  width: 100%;
  text-align: center;
}

.social-media img {
  margin: 0 10px;
}


  
.hotel-page{
    
    background: linear-gradient(to right, #1e88e5, #ffca28);
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #1e88e5; 
    color: white;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
  }
  
  .navbar li {
    margin-right: 20px;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .navbar a:hover {
    color: #ff5722; 
  }
  

  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    position: relative;
    background-color: rgba(30, 136, 229, 0.8); 
    background: linear-gradient(to right, #1e88e5, #ffca28);
  }
  
  .banner-content {
    text-align: center;
    position: relative;
    width: 100%;
    background: linear-gradient(to right, #1e88e5, #ffca28);
  
  }
  
  .banner-image-wrapper {
    position: relative;
    max-width: 100%;
    overflow: hidden;
    
  }
  
  .banner-image {
    width: 100%;
    max-width: 1000px;
    height: 500px;
    border-radius: 10px;
    transition: opacity 1s ease-in-out;
    
  }
  
  .banner-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    text-align: center;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2); 
  }
  
  .banner-text h2 {
    font-size: 2em;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }
  
  .banner-text p {
    font-size: 1.2em;
    margin: 5px 0 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }
  
  .arrow {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 2em;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
  }
  
  .arrow:hover {
    background-color: rgba(255, 87, 34, 0.7);
  }
  
  .arrow-left {
    left: 0;
  }
  
  .arrow-right {
    right: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active en versiones anteriores de Vue */ {
    opacity: 0;
  }
  

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0px;
    
  }
  
  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  }
  
  .card-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .card-title {
    font-size: 1.5em;
    margin: 10px 0;
  }
  
  .card-description {
    font-size: 1em;
    margin: 10px 0;
  }
  
  .card-price {
    font-size: 1.2em;
    color: #28a745; /
    font-weight: bold;
  }
  
  </style>
