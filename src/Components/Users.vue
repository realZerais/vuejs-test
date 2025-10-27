<script setup>
import { ref, watch, onMounted } from 'vue';

const usersData = ref([]);
const users = ref([]) // for DOM
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
    usersData.value = data;
    users.value = data;

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false;
  }

};

const searchQuery = ref("")

watch(() => searchQuery.value, (newVal) => {

  if (newVal) {

    const query = searchQuery.value.toLowerCase();

    users.value = users.value.filter(item =>
      item.name.toLowerCase().includes(query)  // Filter the user by name that only included in the searchQuery
    );

  } else if (!newVal || newVal == null || newVal == "") {
    users.value = usersData.value; // Just return all initial usersData if search is empty
  }
})

onMounted(fetchUsersData);

</script>


<template>

  <div class="min-h-screen flex flex-col gap-5  items-center mt-5">

    <div class="flex  w-[80vw] justify-end gap-4">
      <input type="text" class="border text-gray-500 rounded-md p-2 h-[5vh]" placeholder="search" v-model="searchQuery">
    </div>

    <div class="flex-grow w-[80vw] ">

      <p v-if="loading">Loading data...</p>

      <table v-if="!loading" class="table-fixed w-[80vw] border text-sm text-left rtl:text-right text-gray-500">

        <thead class="uppercase bg-gray-50 text-xs text-gray-70">
          <tr>
            <th class="px-6 py-3 w-[25%]">Name</th>
            <th class="px-6 py-3 w-[25%]">Email</th>
            <th class="px-6 py-3 w-[25%]">City</th>
            <th class="px-6 py-3 w-[25%]">Company</th>
          </tr>
        </thead>


        <tbody v-if="users.length">
          <tr v-for="user in users" :key="user.id" class="border bg-white hover:bg-gray-200 cursor-pointer"
            @click="$router.push({ path: `/user/${user.id}/posts`, query: { name: user.name } })">
            <!-- Reroute the user based on user id and put the user.name in the query -->

            <td class="px-6 py-4 truncate overflow-hidden text-ellipsis">{{ user.name }}</td>
            <td class="px-6 py-4 truncate overflow-hidden text-ellipsis">{{ user.email }}</td>
            <td class="px-6 py-4 truncate overflow-hidden text-ellipsis">{{ user.address.city }}</td>
            <td class="px-6 py-4 truncate overflow-hidden text-ellipsis">{{ user.company.name }}</td>
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
