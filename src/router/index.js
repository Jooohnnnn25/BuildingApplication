/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/index.vue"), // Or any other component for the root
    },
    {
      path: "/page",
      name: "page",
      component: () => import("@/pages/page.vue"),
    },
    {
      path: "/UnifiedAppliationForm",
      name: "UnifiedAppliationForm",
      component: () => import("@/pages/UnifiedAppliationForm.vue"),
    },

    {
      path: "/UploadDocuments",
      name: "UploadDocuments",
      component: () => import("@/pages/UploadDocuments.vue"),
    },

    {
      path: "/DocumentForms",
      name: "DocumentForms",
      component: () => import("@/pages/DocumentForms.vue"),
    },
    // ADD MORE IN HERE USING THE {  Path: ‘/’},






    // DOCUMENT FORMS IN HERE BELOW

     // DOCUMENT FORMS IN HERE BELOW

    {
      path: "/electrical",
      name: "electrical",
      component: () => import("@/document/electrical.vue"),
    },

    {
      path: "/sanitary",
      name: "sanitary",
      component: () => import("@/document/sanitary.vue"),
    },

    {
      path: "/architectural",
      name: "architectural",
      component: () => import("@/document/architectural.vue"),
    },

    {
      path: "/structural",
      name: "structural",
      component: () => import("@/document/structural.vue"),
    },

    {
      path: "/mechanical",
      name: "mechanical",
      component: () => import("@/document/mechanical.vue"),
    },

    {
      path: "/electronics",
      name: "electronics",
      component: () => import("@/document/electronics.vue"),
    },



  ],
});

export default router;
