export default {
    state: {
        diffractionStepValue: 17,
        power: false,
        diffractionLineSpacingByMM: 100,
        injection: 3.7,
        distanceBetweenDots: null,
        lang: true
    },
    mutations: {
        updateDiffractionStepValue(state, data) {
            state.diffractionStepValue = data;
        },
        updatePower(state, data) {
            state.power = data;
        },
        updateDiffractionLineSpacing(state, data) {
            state.diffractionLineSpacingByMM = data;
        },
        updateDistanceBetweenDots(state, data) {
            state.distanceBetweenDots = data;
        },
        updateLang(state, data) {
            state.lang = data;
        }
    },
    actions: {
        calculateRedDotsPosition(ctx, data) {
            const distance = data * Math.sin(ctx.state.injection * Math.PI / 180);
            ctx.commit("updateDistanceBetweenDots", distance);
        }
    },
    getters: {
        getDiffractionStepValue(state) {
            return state.diffractionStepValue;
        },
        getPowerState(state) {
            return state.power;
        },
        getDiffractionLineSpacing(state) {
            return state.diffractionLineSpacingByMM;
        },
        getInjection(state) {
            return state.injection;
        },
        getDistanceBetweenDots(state) {
            return state.distanceBetweenDots;
        },
        langGetter(state) {
            return state.lang;
        }
    }
}