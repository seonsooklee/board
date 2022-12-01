<template>
  <div class="toolbar-wrapper">
    <q-space/>
    <q-input v-model="search" clearable outlined dense type="search" class="q-mr-md" label="게시글 아이디">
      <template v-slot:append>
        <q-icon name="search" @click="onClickSearch"/>
      </template>
    </q-input>
    <q-btn color="primary" label="게시글 등록" icon="add" unelevated @click="add"/>
  </div>
  <q-table
      v-model:pagination="pagination"
      :columns="columns"
      :rows="list"
      row-key="name"
      @row-click="onClickRow"
      @request="onRequest"
      flat
      :loading="isLoading"
      hide-no-data
  />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import board from "../../service/board"

const list = ref([])
const search = ref(null)
const router = useRouter()
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 10,
  rowsNumber: 10
})

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
const isLoading = ref(true)

const fetchList = async (page, size) => {
  try {
    const response = await board.fetchList(page, size)
    const data = response.data.data.list
    pagination.value.rowsNumber = (response.data.data.totalSize - 1) * size
    list.value = data
    isLoading.value = false
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

const onClickSearch = async () => {
  if (search.value) {
    try {
      const response = await board.search(search.value)
      const data = response.data.data
      search.value = null
      if (data) {
        list.value = []
        list.value.push(data)
      } else {
        list.value = []
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const onRequest = (props) => {
  isLoading.value = true
  const { page, rowsPerPage } = props.pagination
  fetchList(page - 1, rowsPerPage)
  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
}

onMounted(() => {
  fetchList(0,  10)
})

</script>

<style lang="scss" scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
