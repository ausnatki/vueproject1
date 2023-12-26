<template>
  <div>
    <!-- 这里的aciton写接口路径 -->
    <el-upload
      class="upload-demo"
      drag
      action="/api/Tool/imgupload"
      :on-success="imgSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = []
    },
    handlePreview(file) {
      console.log(file)
    },
    imgSuccess(response) {
      // console.log(response)
      // console.log(response.data.imageUrl)
      if (response.data && response.data.imageUrl) {
        const Img = response.data.url
        // console.log(Img)
        // this.fileList = [{ name: response.data.url, url: response.data.imageUrl }]
        // 将图像URL传递给父组件
        this.$emit('input', Img)
      }
    }
  }
}
</script>
