<template>
  <div class="index">
    <HeadNav></HeadNav>
    <keepAlive>
      <LeftMenu v-if="!hiddenLeftBar"></LeftMenu>
    </keepAlive>
    <div class="main-content-area">
      <!-- <navigation-scroll /> -->
      <!-- <breadcrumb /> -->
      <!-- <div style="height:20px;"></div> -->
      <div id="mainSection" class="clearfix">
        <transition name="breadcrumb" mode="out-in">
          <keep-alive :include="cachList" :max="10">
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from './modules/HeadNav'
import LeftMenu from './modules/LeftMenu'
import breadcrumb from './modules/Breadcrumb'
import navigationScroll from './modules/NavigationScroll'
import { mapState } from 'vuex'
export default {
  name: 'Index',
  components: {
    HeadNav,
    LeftMenu,
    breadcrumb,
    navigationScroll
  },
  watch: {
    cachList(newVal) {
      sessionStorage.cachList = JSON.stringify(newVal.split(','))
    }
  },
  computed: {
    ...mapState({
      cachList: (state) => state.permission.cachList.join(',')
    }),
    hiddenLeftBar() {
      return this.$route.meta.hiddenLeftBar
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
.index {
  height: 100%;
  background-color: rgb(245, 245, 245);
}

.index .main-content-area {
  overflow: auto;
  height: calc(100% - 65px);
}
#mainSection {
  /* padding: 0 20px 20px 20px; */
  position: relative;
  height: calc(100% - 50px);
  overflow: auto;
  box-sizing: border-box;
  min-width: 1280px;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
}
</style>
