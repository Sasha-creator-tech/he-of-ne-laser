<template>
  <div class="screen">
    <div>
      <button class="button button1" v-bind:class="{ 'active': selectedLang }" v-on:click="changeLang(true)">Українська</button><br>
      <button class="button button1" v-bind:class="{ 'active': !selectedLang }" v-on:click="changeLang(false)">English</button>
      <h1 v-if="langGetter">Екран</h1>
      <h1 v-else>Screen</h1>
      <div style="transform: translateY(130px)">
        <p v-if="langGetter">Для отримання відстані від центрального мінімума потрібно натиснути на нього починаючи з правої сторони відносно 0.</p>
        <p v-else>To get the distance from the center minimum you need to tap on it starting from the right side towards 0.</p>
        <p v-if="langGetter">Мінімуми зліва - дзеркально симетричні правим та мають таку ж відстань</p>
        <p v-else>The minima on the left are mirror-symmetric rules with the same distance</p>
      </div>
      <p v-if="langGetter" v-bind:class="{ 'off-state': !(dotPosition && getPowerState) }">Відстань вибраного мінімума: {{ Number(dotPosition.toFixed(2)) }} (см)| Номер мінімума: {{ selectedMin }}</p>
      <p v-else v-bind:class="{ 'off-state': !(dotPosition && getPowerState) }">Distance of the chosen minimum: {{ Number(dotPosition.toFixed(2)) }} (cm)| Number of the minimum: {{ selectedMin }}</p>
      <div class="ruler">
        <a v-for="space in rulerSpacing" v-bind:key="space">{{ space }}</a>
        <ul class="laser" v-if="getPowerState">
          <li class="red-dot" v-for="left in minimumsPosLeft" v-bind:key="left" v-bind:style="{ transform: left.pos, opacity: left.opacity }"></li>
          <li class="red-dot" v-bind:style="{ transform: minZeroPos }" v-on:click="dotPosition = 0.0000000001, selectedMin = 0"></li>
          <li class="red-dot" v-for="(right, i) in minimumsPosRight" v-bind:key="right" v-bind:style="{ transform: right.pos, opacity: right.opacity }" v-on:click="getDotPosition({dot: right, index: i})"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      rulerSpacing: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      minZeroPosVal: 589,
      oneCmStep: 38,
      amountOfMinimums: 10,
      dotsOpacity: 0.6,
      minZeroPos: `translate3d(589px, -220px, 0px)`,
      minimumsPosRight: [],
      minimumsPosLeft: [],
      dotPosition: 0,
      selectedMin: 0,
      selectedLang: true
    }
  },
  computed: mapGetters(["getPowerState", "getDistanceBetweenDots", "langGetter"]),
  methods: {
    ...mapMutations(["updateLang"]),
    changeLang(lang) {
      this.selectedLang = lang;
      this.updateLang(lang);
    },
    getDotPosition(dot) {
      let finalDotPosition = dot.dot.distance;
      this.selectedMin = dot.index + 1;
      for (let i = 0; i < dot.index; i++) {
        finalDotPosition += dot.dot.distance;
      }
      this.dotPosition = finalDotPosition;
    },
    calculateDistance(distanceCm) {
      let yPos = 30;
      let opacityRight = this.dotsOpacity;
      let distanceBetweenDots = this.getDistanceBetweenDots * this.oneCmStep;
      for (let i = 0; i < this.amountOfMinimums; i++) {
        const distance = this.minZeroPosVal + distanceBetweenDots * (i + 1);
        if (distanceCm) {
          opacityRight -= distanceCm/25;
        }
        this.minimumsPosRight.push({pos: `translate3d(${distance}px, -${210 + (yPos)}px, 0px)`, opacity: opacityRight, distance: distanceCm});
        yPos += 20;
      }
      let yPosLeft = 10;
      let opacityLeft = this.dotsOpacity;
      for (let i = 0; i < this.amountOfMinimums; i++) {
        const distance = this.minZeroPosVal - distanceBetweenDots * (i + 1);
        if (distanceCm) {
          opacityLeft -= distanceCm/25;
        }
        this.minimumsPosLeft.push({pos: `translate3d(${distance}px, ${(yPosLeft) - 30}px, 0px)`, opacity: opacityLeft, distance: distanceCm});
        yPosLeft -= 20;
      }
    }
  },
  watch: {
    getDistanceBetweenDots(newVal) {
      this.minimumsPosRight = [];
      this.minimumsPosLeft = [];
      this.calculateDistance(newVal);
    }
  },
  mounted() {
    this.calculateDistance();
  }
}
</script>

<style scoped>
.ruler, .ruler a {
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
}
/* IE6-7 Fix */
.ruler, .ruler a {
  *display: inline;
}
.ruler {
  transform: translateY(-100px);
  background: lightYellow;
  box-shadow: 0 -1px 1em hsl(60, 60%, 84%) inset;
  border-radius: 2px;
  border: 1px solid #ccc;
  color: #ccc;
  margin: 0;
  height: 3em;
  padding-right: 1cm;
  white-space: nowrap;
}
.ruler a {
  padding-left: 1cm;
  width: 2em;
  margin: .64em -1em -.64em;
  text-align: center;
  position: relative;
  text-shadow: 1px 1px hsl(60, 60%, 84%);
}
.ruler a:before {
  content: '';
  position: absolute;
  border-left: 1px solid #ccc;
  height: .64em;
  top: -.64em;
  right: 1em;
}

/* Make me pretty! */
body {
  font: 12px Ubuntu, Arial, sans-serif;
  margin: 20px;
}

div {
  margin-top: 2em;
}

.red-dot{
  color: red;
  font-size:40px;
  line-height:20px;
  z-index: 10;
  opacity: 0.7;
}
.values{
  display: inline;
  margin-right: 5px;
}
.values-block{
  transform: translate3d(600px, 0px, 0px);
}
.laser{
  position: relative;
}

.off-state {
  visibility: hidden;
}

.screen {
  transform: translateY(-220px);
}

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  transform: translateY(-220px) translateX(-500px);
  position: relative;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}

.button1:hover {
  background-color: #4CAF50;
  color: white;
}
.active {
  background-color: #4CAF50;
  color: white;
}
</style>