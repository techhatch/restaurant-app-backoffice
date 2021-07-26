
class _MemCache {
    constructor() {
        this.#init();
    }
    #init() {
        if (typeof (this.memory) == 'undefined')
            this.memory = {};
    }
    get(key) {
        if (console) {
            console.log("memory: ");
            console.log(this.memory);

            console.log("key: " + key);
            console.log(this.memory[key]);
        }
        
        if (typeof (this.memory[key]) != 'undefined')
            return this.memory[key];

        return false;
    }
    set(key, value) {
         
        this.memory[key] = value;
    }
}
export const MemCache = new _MemCache();