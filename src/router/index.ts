import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/Home.vue";
import Coin from "../views/Coin.vue";
import Detail from "../views/Detail.vue";
import CoinDetail from "../views/CoinDetail.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/coin',
        name: 'Coin',
        component: Coin
    }, {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
    }, {
        path: '/coin/detail/:id',
        name: 'CoinDetail',
        component: CoinDetail
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router