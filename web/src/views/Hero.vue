<template>
  <div class="page-hero">
    <div class="topbar bg-dark px-3 py-2 d-flex ai-center">
      <img src="../assets/logo.png" height="35" />
      <div class="px-2 py-1 flex-1">
        <div class="d-flex">
          <div class="text-white">王者荣耀</div>
          <div class="text-white pl-3 fx-sm">攻略战</div>
        </div>
      </div>
      <div class="text-white fs-lg">
        <span class="pr-2">更多英雄</span>
        <strong>&gt;</strong>
      </div>
    </div>
    <div class="top" :style="{'background-image':`url(${heroes.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div>{{heroes.title}}</div>
        <div class="fs-lg">{{heroes.name}}</div>
        <div>{{heroes.categories.map(v=>v.name).join('/')}}</div>
        <div class="d-flex jc-between">
          <div class="scores d-flex ai-center" v-if="heroes.scores">
            难度
            <span class="badge bg-primary">{{heroes.scores.difficult}}</span>
            技能
            <span class="badge bg-info">{{heroes.scores.skills}}</span>
            攻击
            <span class="badge bg-danger">{{heroes.scores.attack}}</span>
            生存
            <span class="badge bg-grey">{{heroes.scores.survive}}</span>
          </div>
          <router-link tag="span" to="/" class="text-grey fs-sm">皮肤：6 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div class="bg-white px-3">
      <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>

    <swiper>
      <swiper-slide>
        <div>
          <div class="px-3 bg-white">
            <!-- start of button -->
            <div class="d-flex pt-2">
              <router-link tag="button" class="btn btn-lg flex-1" to="/">
                <i class="iconfont icon-movie pr-2"></i>英雄介绍视频
              </router-link>
              <router-link tag="button" class="btn btn-lg flex-1 ml-2" to="/">
                <i class="iconfont icon-movie pr-2"></i>英雄介绍视频
              </router-link>
            </div>
            <!-- end of button -->

            <!-- start of skills -->
            <div class="skills pt-4">
              <div class="d-flex jc-around">
                <div v-for="(item,i) in heroes.skills" :key="i">
                  <img
                    :src="item.icon"
                    width="60"
                    height="60"
                    :class="{active:index===i}"
                    @click="index=i"
                    alt
                  />
                </div>
              </div>

              <div class="d-flex ai-center pt-4">
                <h3 class="m-0">{{currentSkill.name}}</h3>
                <span class="text-grey pl-4">(冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})</span>
              </div>
              <div class="pt-1">
                <p>{{currentSkill.description}}</p>
                <p class="text-grey border-top py-3">小提示：{{currentSkill.tips}}</p>
              </div>
            </div>
            <!-- end of skills -->
          </div>

          <m-card plain title="加点建议" icon="book">
            <div class="items d-flex jc-around text-center pb-4">
              <div>
                <div class="fs-xl pb-3">主升</div>
                <img :src="heroes.skills[1].icon" width="70" height="70" alt />
                <div class="pt-1">{{heroes.skills[1].name}}</div>
              </div>
              <div>
                <div class="fs-xl pb-3">副升</div>
                <img :src="heroes.skills[2].icon" width="70" height="70" alt />
                <div class="pt-1">{{heroes.skills[2].name}}</div>
              </div>
              <div>
                <div class="fs-xl pb-3">主升</div>
                <img :src="heroes.callers[0].icon" alt width="70" height="70" />
                <div class="pt-1">{{heroes.callers[0].name}}</div>
              </div>
              <div>
                <div class="fs-xl pb-3">副升</div>
                <img :src="heroes.callers[1].icon" alt width="70" height="70" />
                <div class="pt-1">{{heroes.callers[1].name}}</div>
              </div>
            </div>
            <div class="pb-1">
              <i class="iconfont icon-book"></i>
              <strong class="fs-xl px-2">出装推荐</strong>
            </div>
            <div class="fs-lg pt-2">顺风出装</div>
            <div class="d-flex text-center jc-around mt-2">
              <div class="items" v-for="item in heroes.items1" :key="item._id">
                <img :src="item.icon" width="40" height="40" alt />
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>
            <div class="border-bottom pt-3"></div>
            <div class="fs-lg pt-3">逆风出装</div>
            <div class="d-flex text-center jc-around mt-2">
              <div class="items" v-for="item in heroes.items2" :key="item._id">
                <img :src="item.icon" width="40" height="40" alt />
                <div class="fs-xs">{{item.name}}</div>
              </div>
            </div>
          </m-card>
          <m-card plain title="使用技巧" icon="book">
            <p class="m-0">{{heroes.usageTips}}</p>
          </m-card>
          <m-card plain title="对抗技巧" icon="book">
            <p class="m-0">{{heroes.battleTips}}</p>
          </m-card>
          <m-card plain title="团战思路" icon="book">
            <p class="m-0">{{heroes.teamTips}}</p>
          </m-card>
          <m-card plain title="英雄关系" icon="book">
            <div class="pb-2">最佳搭档</div>
            <div class="d-flex pb-3" v-for="item in heroes.partners" :key="item._id">
              <img :src="item.hero.avator" height="40" alt />
              <p class="m-0 ml-2">{{item.description}}</p>
            </div>
          </m-card>
        </div>
      </swiper-slide>
      <swiper-slide></swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      heroes: null,
      index: 0
    };
  },
  computed: {
    currentSkill() {
      return this.heroes.skills[this.index];
    }
  },
  components: {},
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.heroes = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style style="scss">
.page-hero .top {
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%;
}
.page-hero .top .info {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
.page-hero .top .info .scores .badge {
  margin: 0 0.25rem;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 50%;
  font-size: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.fb {
  font-weight: bold;
}
</style>
