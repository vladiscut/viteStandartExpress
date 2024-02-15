import { defineStore } from 'pinia'
import axios from 'axios'
import {ref} from 'vue'


export const useAuthStore = defineStore('auth', () => {

  const UserInfo = ref({
    token: ''
  })

  const error = ref('')
  const loader = ref(false)

  const signin = async (password) => {
    error.value = ''
    loader.value = true
    try {
      const formData = new FormData()
      formData.append('password', password)

      const config = {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }

      const response = await axios.post('https://recruit.se-bot.ru/kek/auth/sign', formData, config)
          
      UserInfo.value = {
        'token':response.data.bearer_token
      }
      localStorage.setItem('userToken', JSON.stringify({token: UserInfo.value.token}))  
      loader.value = false
    } catch (err) {
      error.value = err.response.data.message
      loader.value = false
      throw error.value
    }
  }
  const logout = () => {
    UserInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    }
  }
  return { signin, UserInfo, error, loader, logout }
})
