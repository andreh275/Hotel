<template>
    <div class="main-container">
      <header class="app-header">
        <h1 class="app-title">Navegación con Quasar y Vue Router</h1>
      </header>
  
      <!-- Quasar Tabs Navigation -->
      <q-tabs v-model="tab" inline-label class="styled-tabs" @update:model-value="navigateToRoute">
        <q-tab name="/" label="Inicio" />
        <q-tab name="/deportes"  label="Deportes" />
        <q-tab name="/servicio"  label="Servicio" />
        <q-tab name="/habitaciones"  label="Habitaciones" />
      </q-tabs>
  
       
      <!--<nav class="navigation-links">
        <h3><router-link to="/">Inicio</router-link></h3>
        <h3><router-link to="/deportes">Deportes</router-link></h3>
        <h3><router-link to="/servicio">Servicio</router-link></h3>
        <h3><router-link to="/habitaciones">Habitaciones</router-link></h3>
      </nav>-->
  
      <!-- Renderizado del componente según la ruta -->
      <section class="content-section">
        <router-view></router-view>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        tab: '/', // La pestaña seleccionada por defecto (ruta raíz)
      };
    },
    watch: {
      // Verifica cuando cambia la ruta para sincronizar la pestaña activa
      $route(to) {
        this.tab = to.path;
      },
    },
    methods: {
      // Redirigir a la ruta según el nombre de la pestaña
      navigateToRoute(route) {
        this.$router.push(route);
      },
    },
    mounted() {
      // Inicializa la pestaña seleccionada según la ruta actual
      this.tab = this.$route.path;
    },
  };
  </script>
  
  <style scoped>
  /* Estilo general del contenedor principal */
  .main-container {
    font-family: 'Roboto', sans-serif;
    color: #2c3e50;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
  }
  
  /* Estilos para la cabecera */
  .app-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .app-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #1e88e5;
  }
  
  /* Estilos para las rutas de navegación */
  .navigation-links {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .navigation-links h3 {
    margin: 0 15px;
  }
  
  .navigation-links a {
    text-decoration: none;
    color: #1e88e5;
    transition: color 0.3s ease;
  }
  
  .navigation-links a:hover {
    color: #ff5722;
  }
  
  /* Estilos para las pestañas */
  .styled-tabs {
    margin: 0 auto;
    background: linear-gradient(45deg, #1e88e5, #42a5f5);
    border-radius: 8px;
    padding: 10px;
    max-width: 800px;
    margin-bottom: 20px;
  }
  
  .q-tab {
    font-weight: bold;
    font-size: 1rem;
    color: #ffffff;
  }
  
  .q-tab--active .q-tab__content {
    color: #ffd54f; /* Color para la pestaña activa */
  }
  
  .q-tab__icon {
    color: #ffffff;
  }
  
  /* Estilos para la sección de contenido */
  .content-section {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  