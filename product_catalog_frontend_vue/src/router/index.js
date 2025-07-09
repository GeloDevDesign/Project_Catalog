import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/assets/views/HomePage.vue";
import LoginView from "@/assets/views/Auth/LoginView.vue";
import RegisterView from "@/assets/views/Auth/RegisterView.vue";
import AddProduct from "@/assets/views/AddProduct.vue";
import EditProductPage from "@/assets/views/EditProductPage.vue";
import { useAuthStore } from "@/stores/auth.js";
import ErrorPage from "@/assets/views/ErrorPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { auth: true },
    },
    {
      path: "/add-product",
      name: "add-product",
      component: AddProduct,
      meta: { auth: true },
    },
    {
      path: "/product/:id",
      name: "product",
      component: EditProductPage,
      meta: { auth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { guest: true },
    },
    {
      path: "/error",
      name: "error",
      component: ErrorPage,
      props: (route) => ({ 
        errorStatus: Number(route.query.status) || 404,
        errorMessage: route.query.message 
      })
    },
    {
      path: "/:pathMatch(.*)*", 
      name: "not-found",
      component: ErrorPage,
      props: { errorStatus: 404 }
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
});



export default router;