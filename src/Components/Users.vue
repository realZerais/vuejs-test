<script setup>
import { ref, computed, onMounted } from 'vue';

const users = ref([]);
const loading = ref(true);

const fetchUsersData = async () => {
  loading.value = true;

  const APIURL = 'https://jsonplaceholder.typicode.com/users';

  try {
    const response = await fetch(APIURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);

    }
    const data = await response.json();
    users.value = data;

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false;
  }
};

const searchQuery = ref("")

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value; // Just return all users if search is empty
  }
  const query = searchQuery.value.toLowerCase();

  return users.value.filter(item =>
    item.name.toLowerCase().includes(query) // Filter the user by name that only included in the searchQuery
  );

})

onMounted(fetchUsersData);
</script>


<template>

  <div class="min-h-screen flex flex-col gap-5  items-center mt-5">

    <div class="flex  w-[80vw] justify-end">
      <input type="text" class="border text-gray-500 rounded-md p-2 h-[5vh]" placeholder="search" v-model="searchQuery">
    </div>

    <div class="flex-grow w-[80vw] ">

      <p v-if="loading">Loading data...</p>

      <table v-if="!loading" class="table-auto w-[80vw] border text-sm text-left rtl:text-right text-gray-500">

        <thead class="uppercase bg-gray-50 text-xs text-gray-70">
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">City</th>
            <th class="px-6 py-3">Company</th>
          </tr>
        </thead>


        <tbody v-if="filteredUsers.length">
          <tr v-for="user in filteredUsers" :key="user.id" class="border bg-white hover:bg-gray-200 cursor-pointer"
            @click="$router.push({ path: `/user/${user.id}/posts`, query: { name: user.name } })">
            <!-- Reroute the user based on user id and put the user.name in the query -->

            <td class="px-6 py-4 ">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user.address.city }}</td>
            <td class="px-6 py-4">{{ user.company.name }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="4" class="px-6 py-4 text-center text-gray-500">No users found.</td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>
