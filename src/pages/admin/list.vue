<template>
  <div class="admin-list-wrapper">
    <div class="list-container q-mr-lg">
      <q-table
          :rows="userList"
          :columns="columns"
          row-key="name"
          @row-click="onClickRow"
          flat
      />
    </div>
    <div class="detail-container">
      <div class="title">회원 상세정보</div>
      <div v-if="selectUser !== null " class="list-wrapper">
        <div v-if="isLoading" class="loading-wrapper">
          <q-spinner-ios
              color="primary"
              size="2em"
          />
        </div>
        <div v-else>
          <div class="list-item">
            <div class="label">이름</div>
            {{ selectUser.name }}
          </div>
          <div class="list-item">
            <div class="label">이메일</div>
            {{ selectUser.email }}
          </div>
          <div class="list-item">
            <div class="label">권한</div>
            {{ selectUser.authority }}
          </div>
          <div class="list-item">
            <div class="label">주소</div>
            {{ selectUser.address.city }}, {{ selectUser.address.street }}, {{ selectUser.address.zipcode }}
          </div>
        </div>
      </div>
      <div v-else class="empty-description">왼쪽에서 회원을 선택해주세요.</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {instance} from "../../modules/axios";

const headerInstance = instance()
const userList = ref()
const selectUser = ref(null)
const columns = [
  {name: 'email', label: '이메일', align: 'left', field: 'email', sortable: false},
  {name: 'name', label: '이름', align: 'left', field: 'name', sortable: false},
  {name: 'authority', label: '권한', align: 'left', field: 'authority', sortable: false},
]
const isLoading = ref(true)

const fetchUserList = async () => {
  const data = {
    page: 1,
    size: 10
  }
  try {
    const response = await axios.get(`https://jssampletest.herokuapp.com/api/member/all?page=${data.page}&size=${data.size}`, headerInstance)
    userList.value = response.data.data.list
  } catch (error) {
    console.log(error)
  }
}

const onClickRow = async (evt, row, index) => {
  isLoading.value = true
  await fetchUserDetail(row.email)
  isLoading.value = false
}

const fetchUserDetail = async (email) => {
  try {
    const response = await axios.get(`https://jssampletest.herokuapp.com/api/member/?email=${email}`, headerInstance)
    selectUser.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchUserList()
})
</script>

<style lang="scss" scoped>
.admin-list-wrapper {
  display: flex;

  .list-container,
  .detail-container {
    width: 50%;
  }

  .detail-container {
    min-height: 600px;
    border: 1px solid var(--q-primary);
    border-radius: 4px;

    .title {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      height: 60px;
      background: var(--q-primary);
      color: white;
      padding-left: 30px
    }

    .list-wrapper {
      height: calc(100% - 60px);
      .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }

    .list-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      height: 60px;
      padding-left: 30px;

      .label {
        width: 150px;
        font-weight: 700;
      }
    }

    .empty-description {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 60px);
      color: gray;
    }
  }
}
</style>
