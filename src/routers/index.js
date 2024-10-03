import { createWebHistory, createRouter } from "vue-router";
import OtpPage from '@/pages/OtpPage.vue';
import WheelPage from '@/pages/WheelPage.vue';


const routes = [
    {
        path: "/wheel",
        name: "WheelPage",
        component: WheelPage,
    },
    {
        path: "/",
        name: "OtpPage",
        component: OtpPage,
    },
    
  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;