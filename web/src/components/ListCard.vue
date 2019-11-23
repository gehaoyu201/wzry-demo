<template>
  <m-card :title="title" :icon="icon" :categories="categories">
    <slot name="img"></slot>
    <div class="nav jc-between px-1">
      <div
        class="nav-item"
        :class="{active:active===i}"
        v-for="(category,i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>

    <div class="px-1">
      <swiper
        ref="list"
        @slide-change="()=>active=$refs.list.swiper.realIndex"
        :options="{autoHeight:true}"
      >
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  },
  components: {},
  methods: {}
};
</script>

<style>
</style>
