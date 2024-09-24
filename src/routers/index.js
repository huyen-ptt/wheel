import { createWebHistory, createRouter } from "vue-router";
import OtpPage from '@/pages/OtpPage.vue';
import WheelPage from '@/pages/WheelPage.vue';

const routes = [
    {
        path: "/otp",
        name: "OtpPage",
        component: OtpPage,
    },
    {
        path: "/",
        name: "WheelPage",
        component: WheelPage,
    },
  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;