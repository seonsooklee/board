<template>
<div class="admin-list-wrapper">
  <div class="list-container">
    <q-table
        :rows="userList"
        :columns="columns"
        row-key="name"
    />
  </div>
  <div class="detail-container"></div>
</div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {instance} from "../../modules/axios";

const headerInstance = instance()
const userList = ref([])
const columns = [
  { name: 'email', label: '이메일', align: 'left', field: 'email', sortable: false },
  { name: 'auth', label: '권한', align: 'left', field: 'auth', sortable: false },
]

const fetchUserList = async () => {
  const data = {
    page: 1,
    size: 10
  }
  try {
    await axios.get('https://jssampletest.herokuapp.com/api/member/all', data, headerInstance)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.admin-list-wrapper {
  display: flex;

  .list-container,
  .detail-container {
    width: 50%;
  }
}
</style>
