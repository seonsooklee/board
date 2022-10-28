<template>
  <div class="login-page-wrapper">
    <div class="input-wrapper q-mb-lg">
      <q-input
          v-model="email"
          class="q-mb-md"
          label="이메일"/>
      <q-input
          v-model="pw"
          label="비밀번호"/>
    </div>
    {{ message }}
    <div class="button-wrapper">
      <q-space/>
      <q-btn color="primary" label="로그인" size="lg" @click="login"/>
      <q-btn color="primary" label="회원가입" size="lg" @click="join"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {userInfo} from '../../store/user'
import jwt_decode from "jwt-decode";

const email = ref('admin@email.com')
const pw = ref('12345678')
const message = ref(null)
const router = useRouter()
const user = userInfo()

const login = async () => {
  try {
    const response = await axios.post('https://jssampletest.herokuapp.com/api/auth/login', {
      email: email.value,
      password: pw.value
    })

    const result = response.data

    if (result.status === 200) {
      const accessToken = result.data.accessToken
      saveToken(accessToken)
      const token = toJsonToken('decodeToken')
      user.addUserInfo({
        email: token.sub,
        auth: token.auth,
        isLogin: true
      })
      await router.push('/main')
    } else {
      //에러 메세지 처리
    }

  } catch (error) {
    console.log(error);
  }
}

const saveToken = (accessToken) => {
  const decodeToken = jwt_decode(accessToken)
  localStorage.setItem('decodeToken',
      JSON.stringify(decodeToken)
  )
  localStorage.setItem('originalToken',
      JSON.stringify(accessToken)
  )
}

const toJsonToken = (id) => {
  const token = localStorage.getItem(id)
  return JSON.parse(token)
}

const join = () => {
  router.push('/join')
}

</script>

<style lang="scss" scoped>
</style>
