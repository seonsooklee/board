<template>
  <div class="admin-list-wrapper">
    <div class="list-container q-mr-lg">
      <div class="toolbar-wrapper">
        <q-space/>
        <q-input v-model="search" outlined dense type="search" class="q-mr-md" label="이메일 검색">
          <template v-slot:append>
            <q-icon name="search" @click="onClickSearch"/>
          </template>
        </q-input>
      </div>
      <q-table
          :rows="userList"
          :columns="columns"
          row-key="name"
          @row-click="onClickRow"
          flat
      />
    </div>
    <div class="detail-container">
      <div class="header-wrapper">
        <div class="title">회원 상세정보</div>
        <q-space/>
        <template v-if="!isLoading">
          <q-btn flat padding="xs" color="white" size="xs" icon="edit" class="q-mr-xs" @click="onClickEditMode"/>
          <q-btn flat padding="xs" color="white" size="xs" icon="delete" @click="deleteUser" />
        </template>
      </div>
      <div v-if="selectUser !== null" class="list-wrapper">
        <div v-if="isLoading" class="loading-wrapper">
          <q-spinner-ios
              color="primary"
              size="2em"
          />
        </div>
        <div v-else class="list-container">
          <div class="list-item">
            <div class="label">이름</div>
            <q-input v-if="isEditMode" v-model="name" class="q-space" />
            <div v-else>{{ selectUser.name }}</div>
          </div>
          <div class="list-item">
            <div class="label">이메일</div>
            <div>{{ selectUser.email }}</div>
          </div>
          <div class="list-item">
            <div class="label">권한</div>
            <q-select v-if="isEditMode" v-model="auth" :options="authOptions" class="q-space" />
            <div v-else>{{ selectUser.authority }}</div>
          </div>
          <div class="list-item">
            <div class="label">주소</div>
            {{ selectUser.address?.city }}, {{ selectUser.address?.street }}, {{ selectUser.address?.zipcode }}
          </div>
          <q-space />
          <div class="button-wrapper">
            <q-btn outline color="primary" unelevated label="취소" class="q-mr-sm" @click="editModeCancel"/>
            <q-btn color="primary" label="수정완료" unelevated @click="onClickEdit" />
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

const search = ref()
const headerInstance = instance()
const userList = ref()
const selectUser = ref(null)
const columns = [
  {name: 'email', label: '이메일', align: 'left', field: 'email', sortable: false},
  {name: 'name', label: '이름', align: 'left', field: 'name', sortable: false},
  {name: 'authority', label: '권한', align: 'left', field: 'authority', sortable: false},
]
const isLoading = ref(true)
const name = ref()
const auth = ref()
const authOptions = ['ROLE_ADMIN', 'ROLE_USER']
const isEditMode = ref(false)

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

const onClickSearch = async () => {
  try {
    const response = await axios.get(`https://jssampletest.herokuapp.com/api/member/?email=${search.value}`, headerInstance)
    const data = response.data.data
    if (data) {
      search.value = ''
      userList.value = [data]
    } else {
      search.value = ''
      userList.value = []
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async () => {
  const email = selectUser.value?.email
  await axios.delete(`https://jssampletest.herokuapp.com/api/member/${email}`, headerInstance)
  await fetchUserList()
}

const onClickEditMode = () => {
  isEditMode.value = true
  name.value = selectUser.value?.name
  // email.value = selectUser.value?.email
  auth.value = selectUser.value?.authority
}

const editModeCancel = () => {
  isEditMode.value = false
}

const editUser = async () => {
  const data = {
    name: name.value,
    email: selectUser.value?.email
  }

  try {
    const response = await axios.put('https://jssampletest.herokuapp.com/api/member/', data, headerInstance)
    return response.status
  } catch (error) {
    console.log(error)
  }
}

const editAuth = async () => {
  const data = {
    authority: auth.value,
    email: selectUser.value?.email
  }

  try {
    await axios.put('https://jssampletest.herokuapp.com/api/member/auth', data, headerInstance)
  } catch (error) {
    console.log(error)
  }
}

const onClickEdit = async () => {
  await editUser()
  await editAuth()
  await fetchUserList()
  selectUser.value = null
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
    min-height: 500px;
    border: 1px solid var(--q-primary);
    border-radius: 4px;

    .header-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      background: var(--q-primary);
      padding: 0 20px;

      .title {
        font-size: 20px;
        font-weight: 700;
        color: white;
      }

    }

    .list-wrapper {
      height: calc(100% - 60px);

      .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .list-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 20px;
      }
    }

    .list-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      height: 60px;

      .label {
        width: 150px;
        font-weight: 700;
      }
    }

    .button-wrapper {
      display: flex;
      justify-content: flex-end;
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
