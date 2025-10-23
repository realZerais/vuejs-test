<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const userPosts = ref([]);
const loading = ref(true);

// Get the route object
const route = useRoute();

const userName = ref(route.query.name)

const fetchUserPosts = async (id) => {

  loading.value = true;
  const APIURL = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

  try {
    const response = await fetch(APIURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    userPosts.value = data;
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchUserPosts(route.params.id)) // Pass the id through route params

</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4 w-full ">
    <h1 class="text-2xl uppercase font-semibold">{{ userName }}'s Posts</h1>

    <p v-if="loading">Fetching Posts...</p>

    <div v-if="!loading" v-for="post in userPosts" :key="post.id"
      class="flex flex-col justify-start min-h-[50vh] w-3/4 border rounded-lg bg-gray-100 text-gray-70">
      <div class="flex flex-col justify-start gap-5 p-4">

        <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>

  </div>
</template>
