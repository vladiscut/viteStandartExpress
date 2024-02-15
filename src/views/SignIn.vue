<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import {ref} from 'vue';
import { useAuthStore } from '../stores/auth';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';

const password = ref()

const authStore = useAuthStore()
const router = useRouter()

const signin = async () => {
await authStore.signin(password.value)
router.push('/table')
}

</script>


<template>
    <h2>Аутентификация</h2>
    <form class="flex flex-column gap-3">
      <Message v-if="authStore.error" severity="warn">{{authStore.error}}</Message>
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
            <i class="pi pi-at"></i>
        </span>
        <InputText type="password" v-model="password" placeholder="Пароль" />
      </div>
      <Loader v-if="authStore.loader" />
      <div v-else class="flex flex-column gap-3">
        <Button label="Войти" @click="signin" />
      </div>
    </form>
  </template>