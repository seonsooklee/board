<template>
  <div class="breadcrumb-wrapper">
    <q-breadcrumbs>
      <q-breadcrumbs-el
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.name"
          :label="breadcrumb.name"
          :to="breadcrumb.path"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {onMounted, ref, watch} from "vue";

const breadcrumbs = ref([])
const route = useRoute()

watch(() => route.matched, (newValues) => updateBreadcrumbs(newValues), {deep: false})
const updateBreadcrumbs = (route) => {
  breadcrumbs.value = [...route.map(v => ({path: v.path, name: v.meta.title ?? v.name}))]
}
onMounted(() => {
  updateBreadcrumbs(route.matched)
})

</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  height: 80px;
  font-size: 20px;
  font-weight: 500;
  padding-left: 50px;
  border-bottom: 1px solid lightgray;

  .q-breadcrumbs {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
