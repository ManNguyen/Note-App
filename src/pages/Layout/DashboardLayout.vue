<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/home">
        <md-icon style="margin-left:0;">edit</md-icon>
      </sidebar-link> -->
      <sidebar-link to="/folder">
        <md-icon style="margin-left:0;">dashboard</md-icon>
      </sidebar-link>

      <li class="md-list-item">
        <a class="md-list-item-router md-list-item-container md-button-clean" v-on:click="addPage()">
          <div class="md-list-item-content md-ripple">
            <slot>
              <md-icon style="margin-left:0;">note_add</md-icon>
            </slot>
          </div>
        </a>
      </li>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

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
import { idbMixin } from "../../components/IndexDB/IndexDBmixin";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  mixins: [idbMixin],
  created() {
    // this.db().deleteDataBase();
  },
  methods: {
    addPage() {
      this.db()
        .new()
        .then(postID => {
          this.$router.push("/note/" + postID);
        });
      // this.db().selectAll();

      // this.db().getNote(1);
    }
  }
};
</script>
