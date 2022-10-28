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
    <q-btn outline color="primary" unelevated label="취소" class="q-mr-sm" @click="cancel" />
    <q-btn color="primary" label="수정완료" unelevated @click="edit"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {instance} from "../../modules/axios";

const title = ref('')
const content = ref('')
const seq = ref()
const router = useRouter()

const headerInstance = instance()

const fetchItem = async () => {
  const id = router.currentRoute.value.params.id
  seq.value = id

  try {
    const response = await axios.get(`https://jssampletest.herokuapp.com/api/board/${id}`)
    const result = response.data.data
    title.value = result.title
    content.value = result.content
  } catch (error) {
    console.log(error)
  }
}

const cancel = () => {
  router.back()
}

const edit = async () => {
  const data = {
    seq: seq.value,
    title: title.value,
    content: content.value
  }

  try {
    await axios.put('https://jssampletest.herokuapp.com/api/board/', data, headerInstance)
    await router.back()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchItem()

})

</script>

<style scoped>

</style>
