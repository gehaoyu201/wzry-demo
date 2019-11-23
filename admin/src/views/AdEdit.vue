<template>
  <div>
    <h1>{{id?"编辑":"新建"}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button
        size="small"
        @click="model.items.push({})"
        style="margin-left:5rem;margin-bottom:1rem;"
      >
        <i class="el-icon-plus">添加技能</i>
      </el-button>
      <el-row type="flex" style="flex-wrap:wrap">
        <!--flex设置换行，默认不换行-->
        <el-col :md="24" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="跳转链接(URL)">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avator-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :show-file-list="false"
              :on-success="res => $set(item,'image',res.url)"
            >
              <img v-if="item.image" :src="item.image" class="avator" />
              <i v-else class="el-icon-plus avator-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
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
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      window.console.log(res);
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
