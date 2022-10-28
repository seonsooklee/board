<template>
  <div class="toolbar-wrapper">
    <q-space />
    <q-input v-model="search" outlined dense type="search" class="q-mr-md">
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
    <q-btn color="primary" label="게시글 등록" icon="add" unelevated @click="add"/>
  </div>
  <q-table
      :columns="columns"
      :rows="list"
      row-key="name"
      @row-click="onClickRow"
      flat
  />
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const size = ref(10)
const page = ref(0)
const list = ref([])
const search = ref(null)
const router = useRouter()

const columns = [
  {
    name: 'title',
    label: '제목',
    align: 'left',
    field: 'title',
    sortable: false
  },
  {
    name: 'viewCount',
    label: '조회',
    align: 'left',
    field: 'viewCount',
    sortable: false
  },
]

const fetchList = async () => {
  try {
    const response = await axios.get(`https://jssampletest.herokuapp.com/api/board/all?page=${page.value}&size=${size.value}`)
    const data = response.data.data.list
    data.map(item => list.value.push(item))
  } catch (error) {
    console.log(error)
  }
}

const onClickRow = (evt, row, index) => {
  router.push(`detail/${row.seq}`)
}

const add = () => {
  router.push('create')
}


onMounted(() => {
  fetchList()
})

</script>

<style lang="scss" scoped>
.toolbar-wrapper {
  display: flex;
  margin-bottom: 20px;
}
</style>
