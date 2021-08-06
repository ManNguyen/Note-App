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
                  >Enable Developer Mode</switch-button
                >
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
import Constants from "../constants";
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
  created() {
    this.db()
      .getSetting(Constants.SETTINGS.DEVMODE)
      .then(s => {
        this.isDevMode = s.setting;
      });
  },
  methods: {
    setDevMod(isDevMode) {
      this.db()
        .updateSetting({
          name: Constants.SETTINGS.DEVMODE,
          setting: isDevMode
        })
        .then(() => {
          var color = Math.floor(Math.random() * 4 + 1);
          this.$notify({
            message: isDevMode
              ? "<b>Developer Mode enabled.</b> "
              : "<b>Developer Mode disabled.</b> ",
            icon: "add_alert",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: this.type[color]
          });
        });
    }
  }
};
</script>
