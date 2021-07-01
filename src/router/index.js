import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () => import("../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        // 异步加载组件
        component: () => import("../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import("../views/User/Register.vue")
      }
    ]
  },
  {
    path: '/',
    component: () => import("../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/dashboard",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view")},
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () => import("../views/Dashboard/Analysis.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/form",
    name: "form",
    // component: { render: h => h("router-view")},
    component: () => import("../layouts/BasicLayout.vue"),
    children: [
      {
        path: "/form/basic-form",
        name: "basicform",
        component: () => import("../views/Forms/BasicForm.vue")
      },
      {
        path: "/form/step-form",
        name: "stepform",
        component: () => import("../views/Forms/StepForm"),
        children: [
          {
            path: "/form/step-form",
            redirect: "/form/step-form/info"
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () => import("../views/Forms/StepForm/Step1.vue")
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () => import("../views/Forms/StepForm/Step2.vue")
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () => import("../views/Forms/StepForm/Step3.vue")
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫钩子
router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    // 开始进度条
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})

export default router;
