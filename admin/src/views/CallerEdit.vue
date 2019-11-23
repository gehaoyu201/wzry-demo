<template>
  <div>
    <h1>{{id?"编辑":"新建"}}召唤师技能</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avator-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avator" />
          <i v-else class="el-icon-plus avator-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      model: {}
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
      // this.model.icon = res.url
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/callers/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/callers", this.model);
      }
      window.console.log(res);
      this.$router.push("/callers/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/callers/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
