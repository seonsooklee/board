<template>
  <div class="login-page-wrapper">
    <div class="input-wrapper q-mb-lg">
      <q-input
          v-model="email"
          class="q-mb-md"
          label="이메일"/>
      <q-input
          v-model="name"
          class="q-mb-md"
          label="이름"/>
      <q-input
          v-model="pw"
          class="q-mb-md"
          label="비밀번호"/>
      <q-input
          v-model="zipcode"
          class="q-mb-md"
          label="우편번호"/>
      <q-input
          v-model="city"
          class="q-mb-md"
          label="지역"/>
      <q-input
          v-model="street"
          class="q-mb-md"
          label="상세주소"/>
    </div>
    <div class="button-wrapper">
      <q-space />
      <q-btn color="primary" label="회원가입" size="lg" @click="join"/>
      <q-btn color="primary" label="취소" size="lg" @click="back"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const city = ref('')
const email = ref('')
const name = ref('')
const pw = ref('')
const street = ref('')
const zipcode = ref('')
const router = useRouter()

const join = async () => {
  try {
    const response = await axios.post('https://jssampletest.herokuapp.com/api/auth/signup', {
      city: city.value,
      email: email.value,
      name: name.value,
      password: pw.value,
      street: street.value,
      zipcode: zipcode.value
    })

    console.log(response)
    //회원가입 후 response가 없음???

  } catch (error) {
    console.log(error)
  }
}

const back = () => {
  router.push('/login')
}

</script>

<style scoped>

</style>
