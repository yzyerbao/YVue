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
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:false,
            get() {
                return val;
            },
            set(newVal){
              if(newVal !== val)
              {
                  val = newVal;
              }
            }
        })
    }

}
export function observe(value) {
    if(!value && typeof value !== 'object')
    {
        return;
    }
    return new Observer(value);
}
