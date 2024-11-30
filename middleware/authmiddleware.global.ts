import type { RouteLocationNormalized } from "vue-router";

const publicRoutes = ['login','register']

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const sessionCookie = useCookie('session').value;
    const path = String(to.name);

    if(path === 'index' && !sessionCookie){
        return navigateTo('/login');
    }

    if(publicRoutes.includes(path) && sessionCookie){
        return navigateTo('/');
    }
})