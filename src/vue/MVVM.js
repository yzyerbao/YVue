import {observe} from "./Observer";
import {Compile} from "./Compile";

export default class MVVM {
    constructor(options) {
        this.$data = options.data;
        Object.keys(this.$data).forEach((key) => {
            this._proxyData(key);
        });
        observe(this.$data);
        this.$options = options;
        this.$compile = new Compile(options.el, this);
    }

    _proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
            },
        });
    }
}