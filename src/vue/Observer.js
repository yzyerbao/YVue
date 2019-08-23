import Dep from './Dep';
export class Observer {
    constructor(data){
        this.$data = data;
        this.walk(data);
    }
    walk(data){
        Object.keys(data).forEach((key)=>{
            this.defineReactive(data,key,data[key])
        })
    }
    defineReactive(data,key,val)
    {
        let dep = new Dep();
        let childObj = observe(val);
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:false,
            get() {
                if(Dep.target)
                {
                    Dep.depend();
                }
                return val;
            },
            set(newVal){
              if(newVal !== val)
              {
                  val = newVal;
                  childObj = observe(newVal);
                  dep.notify();
              }
            }
        })
    }
}
export function observe(value, vm) {
    if(value && typeof value === 'object')
    {
        return new Observer(value);
    }
}
