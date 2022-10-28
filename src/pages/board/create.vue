<template>
  <q-input
      v-model="title"
      class="q-mb-lg"
      label="제목"/>
  <q-input
      v-model="content"
      label="내용"
      class="q-mb-lg"
      outlined
      type="textarea"
  />
  <div class="flex">
    <q-space />
    <q-btn outline color="primary" unelevated label="취소" class="q-mr-sm" @click="cancel"/>
    <q-btn color="primary" label="등록" unelevated @click="add" />
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {instance} from "../../modules/axios";

const router = useRouter()
const title = ref('')
const content = ref('')
const headerInstance = instance()

const add = async () => {
  const item = {
    title: title.value,
    content: content.value
  }
  try {
    await axios.post('https://jssampletest.herokuapp.com/api/board/', item,headerInstance)

    await router.push('list')

  } catch (error) {
    console.log(error)
  }
}

const cancel = () => {
  router.push('list')
}

</script>

<style scoped>

</style>
