import Index from "@/Layout/Index"
export default [
    {
        path: "/ProjectMenu",
        name: "ProjectMenu",
        redirect: "/ProjectManage/ProjectList",
        component: Index,
        meta: {
            title: "项目管理",
            icon: "el-icon-user",
            isOne: true
        },
        children: [
            {
                path: "/ProjectManage/ProjectList",
                name: "ProjectList",
                component: () => import("@/pages/Admin/ProjectManage/ProjectList/index.vue"),
                meta: {
                    icon: "el-icon-user",
                    title: "项目管理",
                    showRouter: "/ProjectManage/ProjectList", // 左侧选中的菜单
                    keepAlive: true,// 是否需要缓存
                    showInBar: true, // 是否在上面菜单显示
                },
            },
            {
                path: "/ProjectManage/ProjectPic/:projectCode/:projectName",
                name: "ProjectPic",
                component: () => import("@/pages/Admin/ProjectManage/ProjectPic/index.vue"),
                hidden: true,
                meta: {
                    icon: "el-icon-user",
                    title: "项目",
                    showRouter: "/ProjectManage/ProjectPic", // 左侧选中的菜单
                    keepAlive: true,// 是否需要缓存
                    showInBar: true, // 是否在上面菜单显示
                }
            },
            {
              path: "/ProjectManage/ProjectPicApp/:projectCode/:projectName",
              name: "ProjectPicApp",
              component: () => import("@/pages/Admin/ProjectManage/ProjectPicApp/index.vue"),
              hidden: true,
              meta: {
                  icon: "el-icon-user",
                  title: "项目",
                  showRouter: "/ProjectManage/ProjectPicApp", // 左侧选中的菜单
                  keepAlive: true,// 是否需要缓存
                  showInBar: true, // 是否在上面菜单显示
              }
          },
            {
                path: "/ProjectManage/ProjectPicInfo/:projectCode/:basePicCode/:projectName",
                name: "ProjectPicInfo",
                component: () => import("@/pages/Admin/ProjectManage/ProjectPicInfo/index.vue"),
                hidden: true,
                meta: {
                    icon: "el-icon-user",
                    title: "项目详情",
                    showRouter: "/ProjectManage/ProjectPicInfo", // 左侧选中的菜单
                    keepAlive: true,// 是否需要缓存
                    showInBar: true, // 是否在上面菜单显示
                }
            },
            {
              path: "/ProjectManage/ProjectPicInfoApp/:projectCode/:projectName/:mediaData",
              name: "ProjectPicInfoApp",
              component: () => import("@/pages/Admin/ProjectManage/ProjectPicInfoApp/index.vue"),
              hidden: true,
              meta: {
                  icon: "el-icon-user",
                  title: "项目详情",
                  showRouter: "/ProjectManage/ProjectPicInfoApp", // 左侧选中的菜单
                  keepAlive: true,// 是否需要缓存
                  showInBar: true, // 是否在上面菜单显示
              }
          },
            {
                path: "/ProjectManage/CreateInfoApp/:projectCode/:projectName/:mediaData?",
                name: "CreateInfoApp",
                component: () => import("@/pages/Admin/ProjectManage/CreateInfoApp/index.vue"),
                hidden: true,
                meta: {
                    icon: "el-icon-user",
                    title: "创建",
                    showRouter: "/ProjectManage/CreateInfoApp", // 左侧选中的菜单
                    keepAlive: true,// 是否需要缓存
                    showInBar: true, // 是否在上面菜单显示
                    hiddenLeftBar: true, // 隐藏左侧菜单栏
                }
            },
            {
              path: "/ProjectManage/CreateInfoMini/:projectCode/:projectName/:mediaData?",
              name: "CreateInfoMini",
              component: () => import("@/pages/Admin/ProjectManage/CreateInfoMini/index.vue"),
              hidden: true,
              meta: {
                  icon: "el-icon-user",
                  title: "创建",
                  showRouter: "/ProjectManage/CreateInfoMini", // 左侧选中的菜单
                  keepAlive: true,// 是否需要缓存
                  showInBar: true, // 是否在上面菜单显示
                  hiddenLeftBar: true, // 隐藏左侧菜单栏
              }
          },
            {
              path: "/ProjectManage/EditProjectInfoApp/:projectCode/:projectName/:mediaData?/:appType?",
              name: "EditProjectInfoApp",
              component: () => import("@/pages/Admin/ProjectManage/EditProjectInfoApp/index.vue"),
              hidden: true,
              meta: {
                  icon: "el-icon-user",
                  title: "创建",
                  showRouter: "/ProjectManage/EditProjectInfoApp", // 左侧选中的菜单
                  keepAlive: true,// 是否需要缓存
                  showInBar: true, // 是否在上面菜单显示
                  hiddenLeftBar: true, // 隐藏左侧菜单栏
              }
          },
        ]
    },
]