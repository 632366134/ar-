<template>
  <div class="container">
    <PageBG />
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ProjectManage/ProjectList' }"
          >项目管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="picList" ref="picList">
      <div
        class="pubuColumn"
        v-for="(itemList, listIndex) in columnList"
        :key="listIndex"
        :data-index="listIndex"
      >
        <template v-for="(item, index) in itemList">
          <div
            class="picItem addItem"
            v-if="item.isAdd"
            :key="index"
            @click="handleAdd"
          >
            <img src="@assets/images/add.png" alt="" />
            <div>创建新AR单页</div>
          </div>
          <div class="picItem" v-else :key="index">
            <el-dropdown class="dropDown" trigger="click">
              <span class="el-dropdown-link">
                <img src="@assets/images/more.png" alt="" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleDown(item)"
                  >基准图下载</el-dropdown-item
                >
                <el-dropdown-item @click.native="handleDelete(item)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <div class="edit">
              <div class="imgBox" @click="handleToEdit(item, index)">
                <img src="@assets/images/edit.png" alt="" />
              </div>
            </div>
            <img :src="item.baseObsPath" alt="" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { loading, throttle } from '@/utils/decorator'
import { searchAPI } from '@/API'
import PageBG from '@/components/PageBG.vue'
export default {
  name: 'ProjectPic',
  components: {
    PageBG
  },
  watch: {
    column() {
      this.initColumnList()
    }
  },
  data() {
    return {
      num: 0,
      status: '',
      projectCode: '',
      projectName: '',
      list: [],
      column: 0,
      columnList: []
    }
  },
  methods: {
    handleDown() {
      this.$message.warning('暂无该功能')
    },
    handleDelete() {
      this.$message.warning('暂无该功能')
    },
    handleAdd() {
      // this.$confirm('请选择创建类型', '提示', {
      //   confirmButtonText: '小程序版',
      //   cancelButtonText: 'App版',
      //   distinguishCancelAndClose: true
      // })
      //   .then(() => {
      // this.toPage(
      //   `/ProjectManage/CreateInfo/${this.$encode(
      //     this.projectCode
      //   )}/${this.$encode(this.projectName)}`
      // )
      //   })
      //   .catch((e) => {
      //     if (e === 'cancel') {
      this.toPage(
        `/ProjectManage/CreateInfoMini/${this.$encode(
          this.projectCode
        )}/${this.$encode(this.projectName)}`
      )
      // }
      //   })
    },
    handleToEdit(item, index) {
      // this.$message.warning('暂无该功能')
      let list = this.list.slice(0)
      let a = list.splice(index, 1)
      list.unshift(a[0])
      this.$store.commit('SET_LIST2', list)

      this.toPage(
        `/ProjectManage/ProjectPicInfo/${this.$encode(
          this.projectCode
        )}/${this.$encode(item.basePicCode)}/${this.$encode(this.projectName)}`
      )
    },
    @throttle(100)
    handleResize() {
      this.calcColumn()
    },
    initColumnList() {
      let baseItem = { isAdd: true }
      let columnList = new Array(this.column).fill('').map(() => [])
      columnList[0].push(baseItem)
      this.columnList = columnList
      this.start()
    },
    calcColumn(reload) {
      this.num = 0
      let column = Math.floor(this.$refs.picList.clientWidth / (300 + 60))
      if (reload && this.column === column) {
        this.initColumnList()
      }
      this.column = column
    },
    pushList(item) {
      let pubuColumnList = document.querySelectorAll('.pubuColumn')
      let minKey = null,
        minHeight = 0
      pubuColumnList.forEach((item, index) => {
        let offsetHeight = item.offsetHeight
        if (index === 0) {
          minHeight = offsetHeight
          minKey = item.getAttribute('data-index')
        } else {
          if (minHeight > offsetHeight) {
            minHeight = offsetHeight
            minKey = item.getAttribute('data-index')
          }
        }
      })
      if (null !== minKey) {
        this.columnList[minKey].push(item)
      }
    },
    start() {
      return new Promise((resolve, reject) => {
        try {
          let nowItem = this.list[this.num]
          if (!nowItem) {
            resolve()
          }
          let img = new Image()
          img.src = nowItem.baseObsPath
          img.onload = () => {
            this.pushList(nowItem)
            this.num++
            this.$nextTick(() => {
              if (this.num < this.list.length) {
                return this.start()
                  .then(() => {
                    resolve()
                  })
                  .catch(() => {
                    reject()
                  })
              } else {
                resolve()
              }
            })
          }
          img.onerror = () => {
            this.num++
            resolve()
          }
        } catch (error) {
          this.num++
          reject(error)
        }
      })
    },
    @loading()
    fetchList() {
      return searchAPI
        .selBasePicList({
          customerCode: sessionStorage.customerCode,
          projectCode: this.projectCode
        })
        .then((res) => {
          if (res.code === 1000) {
            this.list = res.data
            sessionStorage.setItem('list2', JSON.stringify(this.list.slice(0)))

            console.log(this.list, 'this.listthis.listthis.list')
            this.calcColumn(true)
          }
        })
    }
  },
  created() {
    this.projectCode = this.$decode(this.$route.params.projectCode)
    this.projectName = this.$decode(this.$route.params.projectName)
  },
  mounted() {
    // this.fetchList()
  },
  activated() {
    window.addEventListener('resize', this.handleResize)
    this.fetchList()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  deactivated() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
.picList {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  .pubuColumn {
    display: inline-block;
    margin: 0 30px;
    vertical-align: top;
    .picItem {
      position: relative;
      transition: all 0.1s linear;
      transform: scale(1);
      cursor: pointer;
      width: 300px;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 30px;
      .dropDown {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 10;
      }
      &:hover {
        box-shadow: 0 0 10px rgb(211, 209, 209);
        transform: scale(1.01);
        .edit {
          opacity: 1 !important;
        }
      }
      &.addItem {
        background: #f7f8fa;
        height: 300px;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #829fff;
        img {
          width: 40px;
          height: 40px;
          display: block;
          margin-bottom: 31px;
        }
      }
      .edit {
        transition: all 0.1s linear;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.3) 100%
        );
        .imgBox {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 50%;
        }
        img {
          width: 22px;
          height: 22px;
          display: block;
        }
      }
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }
}
</style>
