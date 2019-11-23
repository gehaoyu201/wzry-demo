<template>
  <div>
    <h1>{{id?"编辑":"新建"}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <!--默认选中skills栏，为了开发方便-->
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avator-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model,'icon',res.url)"
            >
              <img v-if="model.avator" :src="model.avator" class="avator" />
              <i v-else class="el-icon-plus avator-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="banner">
            <el-upload
              class="avator-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="banner" />
              <i v-else class="el-icon-plus avator-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="9"
              show-score
              v-model="model.scores.difficult"
              style="margin-top:0.6rem;"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score v-model="model.scores.skills" style="margin-top:0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score v-model="model.scores.attack" style="margin-top:0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score v-model="model.scores.survive" style="margin-top:0.6rem;"></el-rate>
          </el-form-item>
          <el-form-item label="加点建议">
            <el-select v-model="model.callers" multiple>
              <el-option
                v-for="item of callers"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <!--flex设置换行，默认不换行-->
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avator-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avator" />
                  <i v-else class="el-icon-plus avator-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳拍档" name="partners">
          <el-button size="small" @click="model.partners.push({})">
            <i class="el-icon-plus">添加最佳拍档</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-form-item style="margin-top:1rem;">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        skills: [],
        partners: [],
        name: "",
        avator: "",
        scores: {
          difficult: 0
        }
      },
      categories: [],
      items: [],
      callers: [],
      heroes: []
    };
  },
  methods: {
    // afterUpload(res) {
    //   // this.$set(this.model,"avator",res.url)
    //   this.model.avator = res.url;
    // },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      window.console.log(res);
      // this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);

      this.model = Object.assign({}, this.model, res.data);
      //res.data追加到this.model里面
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    async fetchCallers() {
      const res = await this.$http.get("rest/callers");
      this.callers = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.fetchCallers();
    this.fetchHeroes();
    this.id && this.fetch();
  }
};
</script>
