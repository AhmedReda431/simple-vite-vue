<template>
  <div>
    <v-app-bar
      app
      :color="theme?.global?.current?.value?.dark ? 'grey-darken-4' : 'primary'"
      elevation="2"
    >
      <v-container class="d-flex align-center">
        <!-- Logo -->
        <v-toolbar-title class="font-weight-bold">
          <router-link
            to="/"
            class="text-decoration-none"
            :class="
              theme?.global?.current?.value?.dark
                ? 'grey-lighten-2--text'
                : 'white--text'
            "
          >
            A-R
          </router-link>
        </v-toolbar-title>

        <!-- Spacer -->
        <v-spacer></v-spacer>

        <!-- Desktop Menu -->
        <v-toolbar-items class="d-none d-md-flex">
          <v-btn text to="/home" class="mx-2">{{ $t("nav.home") }}</v-btn>
          <v-btn text to="/about" class="mx-2">{{ $t("nav.about") }}</v-btn>
          <v-btn text to="/services" class="mx-2">{{
            $t("nav.services")
          }}</v-btn>
          <v-btn text to="/contact" class="mx-2">{{ $t("nav.contact") }}</v-btn>
        </v-toolbar-items>
        <!-- Language Toggle Button -->
        <v-btn icon @click="toggleLang" class="mx-2">
          <v-icon>mdi-web</v-icon>
        </v-btn>
        <!-- Theme Toggle Button -->
        <v-btn icon @click="toggleTheme" class="mx-2">
          <v-icon>
            {{
              theme?.global?.current?.value?.dark
                ? "mdi-white-balance-sunny"
                : "mdi-moon-waning-crescent"
            }}
          </v-icon>
        </v-btn>

        <!-- Mobile Menu Button -->
        <v-app-bar-nav-icon
          class="d-md-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      :location="drawerLocation"
      :color="theme.global.current.value.dark ? 'grey-darken-3' : 'white'"
      width="250"
      class="mobile-drawer"
    >
      <v-list density="compact" nav>
        <v-list-item to="/home" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-home</v-icon>
          </template>
          <v-list-item-title>{{ $t("nav.home") }}</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          <v-list-item-title>{{ $t("nav.about") }}</v-list-item-title>
        </v-list-item>
        <v-list-item to="/services" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-briefcase</v-icon>
          </template>
          <v-list-item-title>{{ $t("nav.services") }}</v-list-item-title>
        </v-list-item>
        <v-list-item to="/contact" @click="drawer = false">
          <template v-slot:prepend>
            <v-icon>mdi-email</v-icon>
          </template>
          <v-list-item-title>{{ $t("nav.contact") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { useTheme } from "vuetify";
import { useThemeToggle } from "@/composables/useThemeToggle";
import { useLocale, useRtl } from "vuetify";
import i18n from "@/plugins/i18n";
import { useRouter } from "vue-router";
const router = useRouter();
const drawer = ref(false);
const theme = useTheme();
const { toggleTheme } = useThemeToggle();
import { computed } from "vue";
// Vuetify hooks
const { current } = useLocale();
const { isRtl } = useRtl();

const toggleLang = () => {
  const newLang = i18n.global.locale.value === "en" ? "ar" : "en";
  i18n.global.locale.value = newLang;
  localStorage.setItem("lang", newLang);

  // Update HTML tag
  document.documentElement.setAttribute("lang", newLang);
  document.documentElement.setAttribute(
    "dir",
    newLang === "ar" ? "rtl" : "ltr"
  );

  // Optional: also update Vuetify's locale
  current.value = newLang;
  nextTick(() => {
    router.go(0);
  });
};
const drawerLocation = computed(() =>
  i18n.global.locale.value === "ar" ? "left" : "right"
);
</script>

<style scoped>
/* Smooth transitions for navigation drawer */
.v-navigation-drawer {
  transition: transform 0.3s ease-in-out;
  z-index: 1000; /* Ensure drawer is above other content */
}

/* Ensure text color adapts to theme */
.v-btn,
.v-toolbar-title a {
  transition: color 0.3s ease;
}

/* Fix drawer overflow on mobile */
@media (max-width: 600px) {
  .mobile-drawer {
    max-height: 100vh;
    overflow-y: auto;
  }
}
</style>
