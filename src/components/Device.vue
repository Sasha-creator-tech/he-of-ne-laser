<template>
  <div>
    <hr style="width:100%;text-align:left;margin-left:0">
    <div v-if="getPowerState">
      <h2>Відстань дифракційної решітки від екрану: </h2>
      <h2>
        {{ getDiffractionStepValue }} (см)
      </h2>
      <input type="range" v-bind:min="diffractionRange.MIN" v-bind:max="diffractionRange.MAX" step="0.5" v-model="diffractionStepValue">
      <input type="number" v-bind:min="diffractionRange.MIN" v-bind:max="diffractionRange.MAX" step="1" v-model="diffractionStepValue">
    </div>
    <h3 class="power">Живлення</h3>
    <label class="switch">
      <input type="checkbox" v-model="power">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
const deviseOptions = require("../assets/devise_options.json");
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      diffractionRange: deviseOptions.DIFFRACTION_GRATING_RANGE,
      diffractionStepValue: 25,
      power: false
    }
  },
  methods: {
    ...mapMutations(["updateDiffractionStepValue", "updatePower"]),
    ...mapActions(["calculateRedDotsPosition"])
  },
  watch: {
    diffractionStepValue(newVal) {
      this.updateDiffractionStepValue(newVal);
      this.calculateRedDotsPosition(this.diffractionStepValue);
    },
    power(newVal) {
      this.updatePower(newVal);
    }
  },
  computed: mapGetters(["getDiffractionStepValue", "getPowerState"]),
  mounted() {
    this.diffractionStepValue = this.getDiffractionStepValue;
    this.power = this.getPowerState;
  },
  created() {
    this.calculateRedDotsPosition(15.5);
  }
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 1000px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.power {
  margin-left: 1000px;
  position: relative;
}
</style>