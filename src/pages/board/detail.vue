<template>
  <div v-if="checkWriter" class="flex justify-end">
    <q-btn outline color="primary" label="수정" class="q-mr-sm" @click="edit"/>
    <q-btn outline color="primary" label="삭제" @click="del"/>
  </div>
  <div class="title">{{ item.title }}</div>
  <div class="sub-info-wrapper">
    <div><strong class="q-mr-xs">조회 :</strong> {{ item.viewCount }}</div>
    <div><strong class="q-mr-xs">작성자 :</strong> {{ item.memberEmail }}</div>
    <div><strong class="q-mr-xs">작성일 :</strong> {{ time(item.createDate) }}</div>
    <div><strong class="q-mr-xs">수정일 :</strong> {{ time(item.updateDate) }}</div>
  </div>
  <div class="content">{{ item.content }}</div>
  <div class="flex justify-center q-mb-lg q-mt-lg">
    <q-btn outline color="gray" label="목록보기" @click="back"/>
  </div>
  <div class="flex q-mb-lg">
    <q-input outlined dense v-model="newReply" label="댓글등록" class="q-space q-mr-sm"/>
    <q-btn outline color="gray" label="등록" @click="postReply"/>
  </div>
  <div class="replies-wrapper">
    <template v-for="reply in item.replies" :key="reply.seq">
      <div v-if="!reply.deleted" class="reply-item">
        <div class="reply-content q-mb-sm">
          <template v-if="reply.editMode">
            <div class="flex">
              <q-input v-model="editReply" dense class="q-space q-mr-xs"/>
              <q-btn flat color="gray" label="취소" class="q-mr-xs" @click="reply.editMode = false"/>
              <q-btn flat color="gray" label="완료" @click="updateReply(reply.seq)"/>
            </div>
          </template>
          <template v-else>
            {{ reply.content }}
          </template>
        </div>
        <template v-if="!reply.editMode">
          <div class="reply-writer-info">
            <div class="reply-email">{{ reply.memberEmail }}</div>
            <div v-if="reply.updateDate" class="reply-date">{{ time(reply.updateDate) }} &#183; 수정됨</div>
            <div v-else class="reply-date">{{ time(reply.createDate) }} &#183; 작성됨</div>
          </div>
          <div v-if="checkReplyWriter(reply.memberEmail)" class="reply-button-wrapper">
            <q-btn flat padding="xs" color="primary" size="xs" icon="edit" @click="reply.editMode = true"/>
            <q-btn flat padding="xs" color="primary" size="xs" icon="delete" @click="deleteReply(reply.seq)"/>
          </div>
        </template>
      </div>
    </template>
  </div>
  <q-inner-loading :showing="isLoading">
    <q-spinner-ios
        color="primary"
        size="3em"
    />
  </q-inner-loading>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {time} from '../../modules/monent';
import {userInfo} from "../../store/user.ts";
import board from "../../service/board"

const user = userInfo()
const isReplyWriter = ref(false)
const router = useRouter()
const item = ref({
  seq: '',
  title: '',
  content: '',
  viewCount: '',
  memberEmail: '',
  createDate: '',
  updateDate: '',
  replies: []
})
const newReply = ref()
const editReply = ref()
const isLoading = ref(true)

const fetchDetail = async () => {
  const id = router.currentRoute.value.params.id

  try {
    const response = await board.fetchDetail(id)
    const data = response.data.data
    item.value = {
      seq: data.seq,
      title: data.title,
      content: data.content,
      viewCount: data.viewCount,
      memberEmail: data.memberEmail,
      createDate: data.createDate,
      updateDate: data.createDate,
      replies: []
    };

    data.replies.forEach(v =>
        item.value.replies.push({
          ...v,
          editMode: false,
        })
    )

    isLoading.value = false

  } catch (error) {
    console.log(error)
  }
}

const checkWriter = computed(() => {
  const writer = item.value.memberEmail
  const loginUser = user.getUserInfo.email
  const auth = user.getUserInfo.auth

  if (writer === loginUser) {
    return true
  } else if (auth === 'ROLE_ADMIN') {
    return true
  } else {
    return false
  }
})

const checkReplyWriter = (email) => {
  const loginUser = user.getUserInfo.email
  const auth = user.getUserInfo.auth

  if(email === loginUser) {
    return true
  } else if (auth === 'ROLE_ADMIN') {
    return true
  } else {
    isReplyWriter.value = false
    return false
  }
}


const back = () => {
  router.back()
}

const edit = () => {
  router.push(`/main/edit/${item.value.seq}`)
}

const del = async () => {
  try {
    await board.deleteItem(item.value.seq)
    await router.push('/main/list')
  } catch (error) {
    console.log(error)
  }
}

const postReply = async () => {
  const data = {
    boardSeq: item.value.seq,
    content: newReply.value
  }
  try {
    await board.postReply(data)

    newReply.value = ''
    await fetchDetail()

  } catch (error) {
    console.log(error)
  }

}

const updateReply = async (seq) => {
  const data = {
    content: editReply.value,
    seq: seq
  }

  try {
    await board.updateReply(data)
    await fetchDetail()

  } catch (error) {
    console.log(error)
  }
}

const deleteReply = async (id) => {
  try {
    await board.deleteReply(id)
    await fetchDetail()

  } catch (error) {
    console.log(error)
  }
}

onMounted(() => fetchDetail())
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
}

.sub-info-wrapper {
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;

  > div {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}

.content {
  padding: 20px;
  min-height: 150px;
  font-size: 15px;
}

.replies-wrapper {
  .reply-item {
    padding: 15px 25px;
    background: #eee;
    border-bottom: 1px solid lightgray;
    position: relative;

    .reply-content {
      font-weight: 500;
    }

    .reply-writer-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: gray;

      > div {
        margin-right: 20px;
      }
    }

    .reply-button-wrapper {
      position: absolute;
      top: 15px;
      right: 25px;

      .q-btn + .q-btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
