<template>
  <div class="card bg-white p-3 mt-3">
    <div
      class="card-header d-flex ai-center"
      :class="{'no-border':plain,'pb-3':!plain,'pb-0':plain}"
    >
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2" :class="{'fb':plain}">{{title}}</div>
      <i v-show="!plain" class="iconfont icon-ellipsis"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean }
  },
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss">
@import "../assets/scss/variable";
.card {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
    &.no-border {
      border-bottom: none;
    }
  }
}
</style>
