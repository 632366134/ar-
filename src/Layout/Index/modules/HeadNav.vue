<template>
  <header class="head-nav clearfix">
    <h1 class="logo">
      <div class="logoMain">
        <img src="@assets/images/ARlogo-16.png" alt="" />
        AR宣传册
      </div>
    </h1>
    <div class="prev" v-show="canBack" @click="goBack">
      <a href="javascript:;"><i class="el-icon-arrow-left"></i></a>
    </div>
    <div class="head-menu">
      <TopMenu />
    </div>
    <!-- <div class="emailBox" v-if="nowPer === '1'">
      <div class="mbox">
        <div class="budget">{{emailNum}}</div>
        <el-button type="text" class="primary" icon="el-icon-message"></el-button>
      </div>
    </div> -->
    <el-dropdown class="drop-down" trigger="click">
      <span class="el-dropdown-link">
        <img class="head" src="@assets/images/touxiang.png" alt="" />
        {{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="options">
        <el-dropdown-item @click.native.stop="personalInformation">
          <template>
            <el-button type="text">登录记录</el-button>
          </template>
        </el-dropdown-item>
        <!-- <el-dropdown-item
          @click.native.stop="modifyCipherFunction"
        >
          <template>
            <el-button type="text">修改密码</el-button>
          </template>
        </el-dropdown-item>
        <el-dropdown-item
          @click.native.stop="toMyPremission"
        >
          <template>
            <el-button type="text">我的权限</el-button>
          </template>
        </el-dropdown-item> -->
        <el-dropdown-item @click.native.stop="open">
          <template>
            <el-button type="text">退出登录</el-button>
          </template>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <changePassword ref="changePassword"></changePassword> -->
  </header>
</template>
<script>
// import changePassword from "@/components/UserInfo/changePassword";
import { TopMenu } from "../components";
import { pLoginApi, loginAPI } from "../../../API";
export default {
  name: "HeadNav",
  computed: {
    emailNum() {
      return 0;
      return 200 > 99 ? "99+" : 200;
    },
  },
  components: {
    // changePassword,
    TopMenu,
  },
  data() {
    return {
      userName: "",
      form: {
        passWord: "",
        newPassWord: "",
        managerCode: "",
      },
      nowPer: "",
      canBack: false,
    };
  },
  methods: {
    toMyPremission() {
      this.toPage("/MyPermission");
    },
    open() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (sessionStorage.permission === "1") {
            this.$store.commit("permission/Reset_CACHLIST");
            this.$store.commit("bar/Reset_BarList");
            this.$router.replace("/Login");
          } else {
            // pLoginApi.loginOut();
            this.$store.commit("permission/Reset_CACHLIST");
            this.$store.commit("bar/Reset_BarList");
            this.$router.replace("/Login");
          }
          sessionStorage.clear();
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          // loginAPI.loginOut().then(() => {
          //   if (sessionStorage.permission === "1") {
          //     this.$store.commit("permission/Reset_CACHLIST");
          //     this.$store.commit("bar/Reset_BarList");
          //     this.$router.replace("/Login");
          //   } else {
          //     // pLoginApi.loginOut();
          //     this.$store.commit("permission/Reset_CACHLIST");
          //     this.$store.commit("bar/Reset_BarList");
          //     this.$router.replace("/Login");
          //   }
          //   sessionStorage.clear();
          //   this.$message({
          //     type: "success",
          //     message: "退出成功!",
          //   });
          // });
        })
        .catch(() => {});
    },
    modifyCipherFunction() {
      let dataPassedToChildren = {
        dialogBoxTitle: "修改密码",
      };
      this.$refs.changePassword.renderData(dataPassedToChildren);
    },
    personalInformation() {
      this.toPage("/LoginList");
    },
    goBack() {
      window.history.back();
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        setTimeout(() => {
          var cur = window.location.href;
          var s = document.querySelectorAll(".logo")[0].style.padding;
          if (cur.indexOf("Home") == -1) {
            this.canBack = true;
            s = "0 0 0 50px";
          } else {
            this.canBack = false;
            s = "0 0 0 40px";
          }
        }, 1);
      },
    },
  },
  mounted() {
    this.nowPer = sessionStorage.permission;
    this.userName = sessionStorage.getItem("name");
  },
};
</script>
<style scoped lang="scss">
$logoWidth: 420px;
$barHeight: 65px;
.el-dropdown-link {
  color: #020202;
  cursor: pointer;
}
.head-nav {
  box-sizing: border-box;
  height: $barHeight;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  color: #829fff;
  position: relative;
}

.head-nav .logo {
  float: left;
  box-sizing: border-box;
  padding: 0 0 0 40px;
  width: $logoWidth;
  // font-size: 18px;
  font-size: var(--bigTitleSize);

  height: $barHeight;
  .logoMain {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    letter-spacing: 2px;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
}

.head-nav .drop-down {
  float: right;
  margin-right: 30px;
  line-height: $barHeight;
  .head {
    width: 38px;
    height: 38px;
    vertical-align: middle;
    margin-right: 9px;
  }
}

.options li {
  padding: 0;
  line-height: 34px;
  .el-button--text {
    padding: 0 20px;
  }

  .el-button--text {
    color: #606266;
  }

  .el-button--text:hover {
    color: #00baff;
  }
}

.head-nav {
  min-width: 560px;
}

.head-menu {
  float: left;
  height: 100%;
  width: calc(100% - #{$logoWidth} - 200px);
}
.emailBox {
  position: relative;
  float: left;
  width: 50px;
  height: 50px;
  .mbox {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button--small {
      font-size: 24px;
    }
    .budget {
      position: absolute;
      top: 0;
      right: 10px;
      transform: translateY(20%) translateX(100%);
      background-color: #f56c6c;
      border-radius: 10px;
      color: #fff;
      display: inline-block;
      // font-size: 12px;
      font-size: var(--fuzhuSize);

      height: 15px;
      line-height: 15px;
      padding: 0 3px;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #fff;
    }
  }
}
.prev {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 100%;
  a {
    font-size: 26px;
    color: #020202;
  }
}
</style>
