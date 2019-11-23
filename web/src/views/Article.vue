<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-book pr-2" onclick="history.back()"></i>
      <strong class="flex-1 text-ellipsis text-info">{{model.title}}</strong>
      <span class="pl-2 text-grey fs-xxs">{{model.createdAt | date}}</span>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="p-3 border-top">
      <div class="pb-2">
        <span class="fs-lg pr-2">&lt;</span>
        <span class="fs-lg text-info">相关资讯</span>
      </div>
      <router-link
        tag="div"
        :to="{path:`/articles/${item._id}`}"
        v-for="item in model.related"
        :key="item._id"
        class="d-flex p-2"
      >
        <span class="text-ellipsis">{{item.title}}</span>
        <span>{{item.createdAt | date}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    }
  },
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: {}
    };
  },
  components: {},
  watch: {
    // 简写：id: "fetch"
    id() {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>