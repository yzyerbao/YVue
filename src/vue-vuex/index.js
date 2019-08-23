let Vue;
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}
class Store {
    constructor(options = {})
    {
        this.state = new Vue({
            data: options.state
        })
        this.mutations = options.mutations || {};
        this.actions = options.actions || {};
        options.getters&&this.handleGetters(options.getters);
    }
    commit (type , args) {
        const fn = this.mutations[type];
        fn&&fn(this.state,args);
    }
    dispatch = (type, args) =>{
        const fn = this.actions[type];
        return fn({commit:this.commit,state:this.state},args);
    }
    handleGetters(getters) {
        this.getters = {};
        Object.keys(getters).forEach(key =>{
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state);
                }
            })
        })
    }
}
export default {
    install,
    Store
}