import { createWebHistory, createRouter } from "vue-router";
import OtpPage from '@/pages/OtpPage.vue';
import WheelPage from '@/pages/WheelPage.vue';
import TreePage from '@/pages/TreePage.vue';
import CrudPage from "../pages/CrudPage.vue";



const routes = [
    {
        path: "/wheel",
        name: "WheelPage",
        component: WheelPage,
    },
    {
        path: "/crud",
        name: "CrudPage",
        component: CrudPage,
    },
 
    {
        path: "/otp",
        name: "OtpPage",
        component: OtpPage,
    },
    {
        path: "/",
        name: "TreePage",
        component: TreePage,
    },
    
  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;