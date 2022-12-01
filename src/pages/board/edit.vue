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
  <q-inner-loading :showing="isLoading">
    <q-spinner-ios
        color="primary"
        size="3em"
    />
  </q-inner-loading>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import board from "../../service/board"

const title = ref('')
const content = ref('')
const seq = ref()
const router = useRouter()
const isLoading = ref(true)

const fetchItem = async () => {
  const id = router.currentRoute.value.params.id
  seq.value = id

  try {
    const response = await board.fetchDetail(id)
    const result = response.data.data
    title.value = result.title
    content.value = result.content
    isLoading.value = false
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
    await board.editItem(data)
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
