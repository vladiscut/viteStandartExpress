<script setup>
import Calendar from 'primevue/calendar';
import { ref } from "vue";
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter()
const signin = async () => {
router.push('/signin')
}
</script>

<template>
  <div class="flex flex-column gap-3">
    <h1>Тестовое задание</h1>
    <Button label="К авторизации" @click="signin" />
  </div>
</template>
