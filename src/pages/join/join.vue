<template>
  <div class="login-page-wrapper">
    <q-form
        @submit="join"
        @reset="back"
    >
      <div class="input-wrapper q-mb-lg">
        <div class="flex items-center no-wrap q-mb-md">
          <q-input
              v-model="id"
              label="아이디"
              :rules="[val => isRequired(val)]"
              class="q-space"
              outlined/>
          <div class="q-ml-xs q-mr-xs">@</div>
          <q-input
              v-if="mail === '직접 입력'"
              v-model="customMail"
              label="메일 입력"
              class="q-mr-sm"
              style="width: 130px"
              :rules="[val => isRequired(val)]"
              outlined/>
          <q-select
              v-model="mail"
              :options="mailOptions"
              label="메일 선택"
              style="width: 130px"
              @update:model-value="reset"
              :rules="[val => isRequired(val)]"
              outlined/>
        </div>
        <q-input
            v-model="name"
            class="q-mb-md"
            label="이름"
            :rules="[val => isRequired(val)]"
            outlined/>
        <q-input
            v-model="pw"
            class="q-mb-md"
            label="비밀번호"
            maxlength="10"
            :type="isPwd ? 'password' : 'text'"
            hint="비밀번호는 8~10글자 이하로 설정해주세요."
            :rules="[
                val => isRequired(val),
                val => (8 <= val.length || val.length >= 10) || '비밀번호는 8~10글자 이하로 설정해주세요.'
                ]"
            outlined>
          <template v-slot:append>
            <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
            v-model="pwCheck"
            class="q-mb-md"
            label="비밀번호 확인"
            :type="isPwdCheck ? 'password' : 'text'"
            :rules="[
                val => isRequired(val),
                val => isPwCheck(val)
                ]"
            outlined>
          <template v-slot:append>
            <q-icon
                :name="isPwdCheck ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdCheck = !isPwdCheck"
            />
          </template>
        </q-input>
        <q-input
            v-model="zipcode"
            class="q-mb-md"
            label="우편번호"
            :rules="[val => isRequired(val)]"
            outlined/>
        <q-input
            v-model="city"
            class="q-mb-md"
            label="지역"
            :rules="[val => isRequired(val)]"
            outlined/>
        <q-input
            v-model="street"
            class="q-mb-md"
            label="상세주소"
            :rules="[val => isRequired(val)]"
            outlined/>
      </div>
      <div class="button-wrapper">
        <q-space/>
        <q-btn color="primary" label="회원가입" size="lg" unelevated type="submit"/>
        <q-btn color="primary" label="취소" size="lg" unelevated type="reset"/>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const id = ref(null)
const mail = ref(null)
const customMail = ref(null)
const name = ref(null)
const pw = ref(null)
const pwCheck = ref(null)
const street = ref(null)
const zipcode = ref(null)
const city = ref(null)
const mailOptions = [
  'gmail.com',
  'naver.com',
  '직접 입력'
]
const isPwd = ref(true)
const isPwdCheck = ref(true)
const router = useRouter()

const join = async () => {
  try {
    const response = await axios.post('https://jssampletest.herokuapp.com/api/auth/signup', {
      email: joinEmail(),
      name: name.value,
      password: pw.value,
      city: city.value,
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

const joinEmail = () => {
  return mail.value === '직접 입력' ? `${id.value}@${customMail.value}` : `${id.value}@${mail.value}`
}

const isRequired = (val) => {
  return  !!val || '필수 입력값입니다.'
}

const isPwCheck = (val) => { return val === pw.value || '비밀번호가 일치하지 않습니다.' }

const reset = () => {
  if (mail.value === '직접 입력') {
    customMail.value = null
  }
}

</script>