<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h3 class="title">Settings</h3>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-100">
                <switch-button
                  v-model="isDevMode"
                  v-on:toggle="setDevMod"
                  color="#43a047"
                >Enable Developer Mode</switch-button>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import switchButton from "../components/Misc/SwitchButton";
import { idbMixin } from "../components/IndexDB/IndexDBmixin";
export default {
  components: { switchButton },
  mixins: [idbMixin],
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      isDevMode: false
    };
  },
  created(){
    console.log("hello settings");
    
    this.db().getSettings ().then(x =>{console.log(x)});
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      var color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message:
          "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
        icon: "add_alert",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    },
    setDevMod(b) {
      console.log(b);
    }
  }
};
</script>
