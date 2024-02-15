<script setup>
import {ref, onMounted} from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import Loader from '../components/Loader.vue';

const showLoader = ref(false);
const authStore = useAuthStore()

const getCities = async () => {
    showLoader.value = true;
    try {
        const token = authStore.UserInfo.token;
        let offset = 0;
        let allCities = [];
        let allMembers = [];
        let allPositions = [];

        // Запрос городов
        while (true) {
            const citiesConfig = {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    limit: 10,
                    offset: offset
                }
            };

            const citiesResponse = await axios.get('https://recruit.se-bot.ru/kek/cities/get', citiesConfig);
            const cities = citiesResponse.data.cities;

            if (cities.length === 0) {
                break;
            }

            allCities = allCities.concat(cities);
            offset += cities.length;
        }

        // Запрос сотрудников
        offset = 0;
        while (true) {
            const membersConfig = {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    limit: 10,
                    offset: offset
                }
            };

            const membersResponse = await axios.get(`https://recruit.se-bot.ru/kek/members/get`, membersConfig);
            const members = membersResponse.data.members;

            if (members.length === 0) {
                break;
            }

            allMembers = allMembers.concat(members);
            offset += members.length;
        }

        // Запрос должностей сотрудников
        offset = 0;
        while (true) {
            const positionsConfig = {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    limit: 10,
                    offset: offset
                }
            };

            const positionsResponse = await axios.get(`https://recruit.se-bot.ru/kek/members/positions/get`, positionsConfig);
            const positions = positionsResponse.data.positions;

            if (positions.length === 0) {
                break;
            }

            allPositions = allPositions.concat(positions);
            offset += positions.length;
        }

        showLoader.value = false;
        // Обработка данных их городов, сотрудников и должностей
        console.log(allCities);
        console.log(allMembers);
        console.log(allPositions);

        // Сохранение данных в реактивной переменной tableData
        tableData.value = {
            cities: allCities,
            members: allMembers,
            positions: allPositions
        };

    } catch (error) {
        showLoader.value = false;
        throw error;
    }
};

const tableData = ref({
    cities: [],
    members: [],
    positions: []
});

const getCityName = (cityId) => {
    const city = tableData.value.cities.find(city => city.id === cityId);
    return city ? city.name : '';
};

const getPositionName = (positionId) => {
    const position = tableData.value.positions.find(position => position.id === positionId);
    return position ? position.name : '';
};

onMounted(async () => {
  await getCities();
});

</script>

<template>
    <div class="flex flex-column gap-3">
      <Loader v-if="showLoader" />
      <table v-if="!showLoader">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>City</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in tableData.members" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.surname }}</td>
            <td>{{ getCityName(member.city_id) }}</td>
            <td>{{ getPositionName(member.position_id) }}</td>
            <td>{{ member.salary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
