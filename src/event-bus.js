import Vue from "vue";
/**Knowledge Notes:
  Every instant of vue share the same data object. If the data object is mutated, every instant of vue will refresh it view.
  We take advange of it to create flow like event broadcast system  

**/
export const EventBus = new Vue();
