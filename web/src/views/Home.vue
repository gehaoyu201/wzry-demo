<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="../assets/images/0f99064e9436b8dda2b16abc622069b1.jpeg" class="w-100" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/f13a6e714cb18a06eff33863c5d30076.jpeg" class="w-100" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/a45e9cb00e9e73fe4cf09c4d2fa2cd18.jpeg" alt class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in count" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span @click="count==4?count=10:count=4">收起</span>
      </div>
    </div>
    <!-- end of nav -->

    <m-list-card title="新闻资讯" icon="Menu" :categories="categories">
      <template #items="{category}">
        <router-link
          tag="div"
          class="pt-3 fs-lg d-flex"
          v-for="(item,i) in category.newsList"
          :to="{path:`/articles/${item._id}`}"
          :key="i"
        >
          <span class="text-grey">[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 dark-1 text-ellipsis">{{item.title}}</span>
          <span>{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" icon="hero" :categories="heroesList">
      <template slot="img">
        <img
          src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20190924/20381481560634.jpg"
          style="max-width:100%;height:auto;"
          class="px-3 pb-3"
          alt
        />
      </template>
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link
            tag="div"
            :to="`heroes/${item._id}`"
            style="width:20%;"
            class="p-2 text-center"
            v-for="(item,i) in category.heroesList"
            :key="i"
          >
            <img :src="item.avator" alt class="w-100" />
            <div>{{item.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <m-card title="精彩视频" icon="movie"></m-card>
    <m-card title="图文攻略" icon="book"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      count: 10,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      categories: [],
      heroesList: []
    };
  },
  components: {},

  methods: {
    async fetchCategories() {
      const res = await this.$http.get("news/list");
      this.categories = res.data;
    },
    async fetchHeroesList() {
      const res = await this.$http.get("heroes/list");
      this.heroesList = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchHeroesList();
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variable";
@import "../assets/iconfont/iconfont.css";
.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: "white");
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>