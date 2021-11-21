import { createStore } from 'vuex'
import calculateValue from "@/store/modules/calculateValue";

const store = createStore({
    modules: {
        calculateValue
    }
})

export default store;