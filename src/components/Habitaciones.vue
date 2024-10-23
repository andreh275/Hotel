<template>
  <div class="hotel-page">

    <!-- Banner con múltiples imágenes -->
    <div class="banner"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave">
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

    <!-- Sección de Tarjetas de Habitaciones -->
    <div class="cards-container">
      <div v-for="(room, index) in rooms" :key="index" class="card">
        <img :src="room.image" :alt="room.title" class="card-image" />
        <h2 class="card-title">{{ room.title }}</h2>
        <p class="card-description">{{ room.details }}</p>
        <p class="card-price">{{ room.price }}</p>
        <button class="reservation-button">Reservar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentBannerIndex: 0,
      isHovered: false,
      autoSlideInterval: null,
      banners: [
        {
          title: "Suite Panorámica",
          description: "Disfruta de vistas espectaculares desde esta habitación exclusiva.",
          image: "https://webbox.imgix.net/images/xnlqhdilkviknnie/5d2c590f-277b-4285-a76c-688c4ef4a167.jpg?auto=format,compress&fit=crop&crop=entropy"
        },
        {
          title: "Habitación Loft",
          description: "Espacio moderno y acogedor para tu estancia.",
          image: "https://hips.hearstapps.com/hmg-prod/images/casa-nildo-jose-loft-ninho-casacor-sao-paulo-2018-01-1538476788.jpg"
        },
        {
          title: "Habitación con Terraza",
          description: "Relájate en la terraza privada con vistas a las montañas.",
          image: "https://www.hotelriberadetriana.com/wp-content/uploads/2021/05/DSC_2693-scaled.jpg"
        },
      ],
      rooms: [
        { title: "Habitación Estándar", details: "Perfecta para viajeros solos.", price: "$150 por noche", image: "https://hotelesdann.com/dann-carlton-bogota/wp-content/uploads/sites/3/2020/08/habitacin-estndar-hotel-dann-carlton-bogot-colombia_37577235816_o.jpg" },
        { title: "Habitación Doble", details: "Ideal para parejas.", price: "$200 por noche", image: "https://www.hotelvictoriamerida.com/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/1/_/1.jpg" },
        { title: "Habitación Familiar", details: "Espacio amplio para familias.", price: "$350 por noche", image: "https://www.swanscayhotel.com/wp-content/uploads/2022/05/hotel-en-bocas-del-toro-habitaciones-familiares.jpg" },
        { title: "Habitación Deluxe", details: "Lujo y confort garantizados.", price: "$300 por noche", image: "https://images.mirai.com/INFOROOMS/100161192/IpZXOjQCx1VgqqWrqJ43/IpZXOjQCx1VgqqWrqJ43_large.jpg" },
        { title: "Suite Presidencial", details: "Vive la experiencia de lujo total.", price: "$500 por noche", image: "https://s3.amazonaws.com/static-webstudio-accorhotels-usa-1.wp-ha.fastbooking.com/wp-content/uploads/sites/19/2022/03/11175445/DUF_7063-v-ok-1170x780.jpg" },
        { title: "Habitación Ejecutiva", details: "Para viajes de negocios.", price: "$250 por noche", image: "https://www.windsortower.com/wp-content/uploads/2015/04/1-1.jpg" },
        { title: "Habitación con Balcón", details: "Vista privilegiada a las montañas.", price: "$275 por noche", image: "https://images.homify.com/v1441997275/p/photo/image/899911/15._Habitaci%C3%B3n_2.jpg" },
        { title: "Habitación con Jacuzzi", details: "Relájate con estilo.", price: "$400 por noche", image: "https://hotelboraboramelgar.com/wp-content/uploads/2020/01/IMG_1900.png" },
        { title: "Habitación Pet-Friendly", details: "Espacio acogedor para ti y tu mascota.", price: "$230 por noche", image: "https://content.arquitecturaydiseno.es/medio/2020/09/04/habitacion-del-hotel-vividora-en-barcelona-pet-friendly_74dcb10f_1500x1125.jpg" },
        { title: "Habitación Romántica", details: "Para momentos inolvidables.", price: "$350 por noche", image: "https://www.hotelpalmerasdeluz.com/media/35459/hotel-palmeras-de-luz-moniquira-noche-romantica-2.png?width=687&height=393&mode=crop" },
        { title: "Loft Moderno", details: "Estilo urbano y minimalista.", price: "$380 por noche", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/538278977.jpg?k=f1e90894de0803f986214c62513784bbcb4856d9cf53d731fbf51477cf37ee8a&o=&hp=1" },
        { title: "Habitación Eco-Friendly", details: "En armonía con la naturaleza.", price: "$210 por noche", image: "https://cf.bstatic.com/xdata/images/hotel/max200/409814139.jpg?k=2587c0aa9a8b46e616970f3b042fd3b8f89002c7424bc39c67a3dcbfcb8bb4f9&o=&hp=1" }
      ]
    };
  },
  computed: {
    currentBanner() {
      return this.banners[this.currentBannerIndex];
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  methods: {
    nextSlide() {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    },
    prevSlide() {
      this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        if (!this.isHovered) {
          this.nextSlide();
        }
      }, 5000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
    onMouseEnter() {
      this.isHovered = true;
    },
    onMouseLeave() {
      this.isHovered = false;
    }
  },
  beforeDestroy() {
    this.stopAutoSlide();
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
</style>
