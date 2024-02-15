<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import {computed} from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const token = computed(() => authStore.UserInfo.token);

const checkUser = () => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  if (token) {
    authStore.UserInfo.token = token.token
  }
}

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userToken')
  router.push('/')
}

checkUser()
</script>

<template>
  <div class="menu">
    <router-link class="menu__link" to="/" v-if="token" @click.prevent="logout">Выйти</router-link>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  margin: auto;
  font-family: 'Arial', sans-serif;
  max-width: 700px;
}
.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.menu__link {
  color: #000;
  margin: 0 20px;
  font-family: 'Arial', sans-serif;
}
</style>
