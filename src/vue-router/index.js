let Vue;
class VueRouter {
    constructor(options) {
        this.$options = options;
        this.routeMap = {};
        this.app = new Vue({
            data: {
                current: '/'
            }
        });
    }
    init() {
        this.bindEvents();
        this.createRouteMap(this.$options);
        this.initComponent();
    }
    bindEvents(){
        window.addEventListener("hashchange", this.onHashChange.bind(this));
        window.addEventListener("load", this.onHashChange.bind(this));
    }
    onHashChange() {
        this.app.current = window.location.hash.split(1)||'/';
    }
    createRouteMap(options) {
        options.routes.forEach(item =>{
            this.routeMap[this.path] = item;
        })
    }
    initComponent() {
        Vue.component('router-link', {
            props:{
                to:String
            },
            render(h){
                return h('a',{attrs:{href:'#'+this.to}},this.$slots.default);
            }
        })
        Vue.component('router-view', {
            render:(h)=>{
                const Comp = this.routeMap[this.app.current].component;
                return h(Comp);
            }
        })
    }

}
VueRouter.install = function (_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init();
            }
        }
    })
}