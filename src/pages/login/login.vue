<template>
  <div class="login-page-wrapper">
    <form
        @submit.prevent="login"
        @reset="join">
      <div class="input-wrapper q-mb-lg">
        <q-input
            v-model="email"
            class="q-mb-md"
            label="이메일"
            :rules="[val => isRequired(val)]"
            outlined/>
        <q-input
            v-model="pw"
            label="비밀번호"
            :rules="[val => isRequired(val)]"
            :type="isPwd ? 'password' : 'text'"
            outlined>
          <template v-slot:append>
            <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div
            v-if="errorMessage"
            class="error-message">
          '이메일 또는 비밀번호가 일치하지 않습니다.'
        </div>
      </div>
      <div class="button-wrapper">
        <q-space/>
        <q-btn color="primary" label="로그인" size="lg" unelevated type="submit"/>
        <q-btn color="primary" label="회원가입" size="lg" unelevated type="reset"/>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {userInfo} from '../../store/user'
import jwt_decode from "jwt-decode";

const email = ref(null)
const pw = ref(null)
const router = useRouter()
const user = userInfo()
const isPwd = ref(true)
const errorMessage = ref(false)

const isRequired = (val) => {
  return  !!val || '필수 입력값입니다.'
}

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
    }

  } catch (error) {
    console.log('error');
    errorMessage.value = true
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
.error-message {
  font-size: 12px;
  color: #c10015;
  padding: 8px 12px 0;
}
</style>
