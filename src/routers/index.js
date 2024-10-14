import { createWebHistory, createRouter } from "vue-router";
import OtpPage from '@/pages/OtpPage.vue';
import WheelPage from '@/pages/WheelPage.vue';
import MayTinh from '@/pages/MayTinh.vue';



const routes = [
    {
        path: "/wheel",
        name: "WheelPage",
        component: WheelPage,
    },
    {
        path: "/test",
        name: "MayTinh",
        component: MayTinh,
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