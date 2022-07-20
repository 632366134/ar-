<template>
  <div>
    <base-dia
      title="新增项目"
      @close="$emit('close')"
      @confirm="handleConfirm"
      width="800px"
      :closeByModal="false"
      :closeByPress="false"
    >
      <el-form label-width="100px">
        <el-form-item label="项目名称:">
          <el-input v-trim v-model="projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目简介:">
          <el-input v-trim v-model="projectIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="项目封面:">
          <UploadPic
            ref="uploadRef"
            :max="1"
            :uploadInfo="uploadInfo"
            v-model="fileList"
          />
        </el-form-item>
      </el-form>
    </base-dia>
  </div>
</template>

<script>
import baseDia from '@/components/dialogBase.vue'
import UploadPic from '@/components/CustomUpload/uploadPic.vue'
import { loading } from '@/utils/decorator'
import { addAPI, adminPublicApi as piblicApi } from '@/API'
export default {
  name: 'AddCom',
  components: {
    baseDia,
    UploadPic
  },
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      fileList: [],
      projectName: '',
      projectIntroduce: '',
      uploadInfo: {}
    }
  },
  methods: {
    check() {
      if (this.projectName === '') {
        this.$message.warning('请输入项目名称')
        return false
      }
      if (this.fileList.length === 0) {
        this.$message.warning('请选择封面图')
        return false
      }
      return true
    },
    handleConfirm() {
      if (this.check()) {
        this.submitAction()
      }
    },
    @loading()
    submitAction() {
      return piblicApi.getSnowList({ num: 1 }).then((res) => {
        if (res.code === 1000) {
          this.fileList[0].code = res.data[0]
          return new Promise((resolve) => {
            this.$nextTick(() => {
              resolve()
            })
          }).then(() => {
            return this.$refs.uploadRef.uploadFileAll().then((res) => {
              if (res.code === 1000 && res.errorList.length === 0) {
                return addAPI
                  .TableAdd({
                    projectName: this.projectName,
                    projectIntroduce: this.projectIntroduce,
                    bookCoverName: this.fileList[0].raw.name,
                    bookCoverObsName: this.fileList[0].fileOssName,
                    bookCoverObsPath: this.uploadInfo.folder
                  })
                  .then((res) => {
                    if (res.code === 1000) {
                      this.$message.success('操作成功')
                      this.$emit('confirm')
                    }
                  })
              } else {
                this.$message.error('文件上传失败')
              }
            })
          })
        } else {
          this.$message.error('获取编号失败，请重试。')
        }
      })
    }
  },
  created() {
    console.log(this.value)
    this.projectName = this.value.projectName
    this.projectIntroduce = this.value.projectIntroduce
    if (Object.keys(this.value).length > 0) {
      this.fileList = [
        { name: this.value.bookCoverName, url: this.value.bookerCover }
      ]
    }
    this.uploadInfo = {
      folder: sessionStorage.customerCode + '/',
      fileNum: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
