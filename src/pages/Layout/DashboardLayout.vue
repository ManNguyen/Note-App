<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/home">
        <md-icon style="margin-left:0;">home</md-icon>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <md-icon style="margin-left:0;">dashboard</md-icon>
        <!-- <p>Dashboard</p> -->
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon style="margin-left:0;">person</md-icon>
        <!-- <p>User Profile</p> -->
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon style="margin-left:0;">content_paste</md-icon>
        <!-- <p>Table list</p> -->
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon style="margin-left:0;">library_books</md-icon>
        <!-- <p>Typography</p> -->
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon style="margin-left:0;">bubble_chart</md-icon>
        <!-- <p>Icons</p> -->
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon style="margin-left:0;">location_on</md-icon>
        <!-- <p>Maps</p> -->
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon style="margin-left:0;">notifications</md-icon>
        <!-- <p>Notifications</p> -->
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
