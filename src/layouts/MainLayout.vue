<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="header-wrapper bg-primary text-white">
      <q-toolbar class="toolbar-wrapper glossy">
        <q-toolbar-title class="title" @click="home">
          Board
        </q-toolbar-title>
        <div class="q-space" />
        <q-btn-dropdown outline color="white" :label="userEmail">
          <q-list>
            <q-item v-if="showAdminMenu" clickable v-close-popup @click="admin">
              <q-item-section>
                <q-item-label>정보수정</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>로그아웃</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <BaseBreadCrumbs />
      <div class="content-wrapper">
        <div class="content">
          <router-view />
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import BaseBreadCrumbs from '../components/BaseBreadCrumbs.vue'
import {useRouter} from "vue-router";
import { userInfo } from '../store/user'
import {computed, onMounted, ref} from "vue";

const router = useRouter()
const user = userInfo()
const userEmail = ref()

const home = () => {
  router.push('/main/list')
}

const fetchEmail = () => {
  userEmail.value = user.getUserInfo.email
}

const logout = () => {
  user.addUserInfo(null)
  localStorage.removeItem('originalToken')
  localStorage.removeItem('decodeToken')
  router.push('/login')
}

const showAdminMenu = computed(() => {
  if (user.getUserInfo?.auth === 'ROLE_ADMIN') {
    return true
  }
})

const admin = () => {
  router.push('admin')
}

onMounted(() => (
  fetchEmail()
))
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 100px;
  .toolbar-wrapper {
    height: 100%;
    padding: 0 50px;
    .title {
      font-size: 30px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}

.content-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px;
  .content {
    width: 1440px;
  }
}
</style>
