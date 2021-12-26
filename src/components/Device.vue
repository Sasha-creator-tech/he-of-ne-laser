<template>
  <div>
<!--    <hr style="width:100%;text-align:left;margin-left:0">-->
    <div>
      <div style="transform: translateY(-150px)">
        <img class="ray" v-bind:class="{ 'ray-mock': !getPowerState }" src="https://cloud-ex42.usaupload.com/cache/plugins/filepreviewer/325472/8218df8fc5f4ef15b88a17aceb618b4143267f31bba107d29a8db6f53d1b318d/1100x800_cropped.jpg">
        <input type="range" class="range" v-bind:min="diffractionRange.MIN" v-bind:max="diffractionRange.MAX" step="0.5" v-model="diffractionStepValue">
        <input type="number" class="input-range" v-bind:min="diffractionRange.MIN" v-bind:max="diffractionRange.MAX" step="1" v-model="diffractionStepValue">
        <div style="transform: translateY(200px) translateX(-1000px)" type="checkbox">
          <h3 class="power" v-if="langGetter">Живлення</h3>
          <h3 class="power" v-else>Power</h3>
          <label class="switch">
            <input type="checkbox" v-model="power">
            <span class="slider round"></span>
          </label>
        </div>
        <img src="https://cloud-ex42.usaupload.com/cache/plugins/filepreviewer/327040/3a878d5c784eef5a8aea6dc8f25643c0780b317c4cc75841b68b6ee47adbadf5/1100x800_cropped.jpg">
        <div>
          <h2 v-if="langGetter">Відстань дифракційної решітки від екрану: </h2>
          <h2 v-else>Distance of the diffraction grating from the screen: </h2>
          <h2 v-if="langGetter">
            {{ getDiffractionStepValue }} (см)
          </h2>
          <h2 v-else>
            {{ getDiffractionStepValue }} (cm)
          </h2>
        </div>
      </div>
<!--      <img class="screen-movement" v-bind:style="{ 'transform': calculateGatePos(diffractionStepValue) }" src="https://cloud-ex42.usaupload.com/cache/plugins/filepreviewer/322152/77c3b6f682d35550e86820d8ee601ceb225683dba4311ce4fa3cc081b1e24a49/1100x800_cropped.jpg" alt="">-->
    </div>
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
      power: false,
      gatePositionPx: -600,
      gatePosition: "translate(-200px, -208px)"
    }
  },
  methods: {
    ...mapMutations(["updateDiffractionStepValue", "updatePower"]),
    ...mapActions(["calculateRedDotsPosition"]),
    calculateGatePos(position) {
      const calculatePosition = 6 * -Math.abs(position) - 200;
      return `translate(-${Math.abs(calculatePosition)}px, -208px)`;
    }
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
  computed: mapGetters(["getDiffractionStepValue", "getPowerState", "langGetter"]),
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
.screen-movement {
  position: relative;
}
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
input[type=range] {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb
{
  -webkit-appearance: none;
  background-image: url('https://cloud-ex42.usaupload.com/cache/plugins/filepreviewer/322152/77c3b6f682d35550e86820d8ee601ceb225683dba4311ce4fa3cc081b1e24a49/1100x800_cropped.jpg');
  opacity: 1;
  width: 70px;
  height: 69px;
  position: relative;
  top: 0px;
  z-index: 99;
  transform: translateY(218px) scaleX(-1);

}

.range {
  width: 480px;
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg) translateX(-60px);
}

.input-range {
  font-size: 20px;
  width: 100px;
  height: 50px;
  transform: translateY(305px) translateX(100px);
}

.ray {
  transform: translateX(10px) translateY(210px);
  width: 635px;
  height: 5px;
  position: absolute;
}
.ray-mock {
  visibility: hidden;
}

/*.device {*/
/*  transform: translateY(-228px);*/
/*  width: 1300px;*/
/*}*/

.device-header {
  transform: translateY(200px);
  z-index: 100;
}
</style>