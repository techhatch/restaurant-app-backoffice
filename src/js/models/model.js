export class Model {
    keys = [];
    events = [];
    /**
     * Constructor
     * @param {Array<string>} keys Properties
     */
    constructor(...keys) {
        this.keys = keys;
        keys.forEach(k => this[k] = "");
    }

    /**
     * Attach form to listen 
     * @param {HTMLFormElement} form Form to attach with model
     */
    attachForm(form) {

        let inputs = form.querySelectorAll('input');
        let selects = form.querySelectorAll('select');
        let that = this;
        const onChagne = (ev)=>{
            const el = ev.target; 
            that.#setValue(el);
        }
        this.events.push({evName :'change', fn: onChagne});
        inputs.forEach(el => {
            if (el.type !== "button" &&
                el.type !== "submit" &&
                el.type !== "reset") {
                el.addEventListener('change', onChagne);
                this.#getValue(el);
            }
           
        });
        selects.forEach(el => {
            el.addEventListener('change', onChagne);
            this.#getValue(el);
        });
        this._form = form;
    }

    deattachForm() {
        if (!this._form) return;

        let inputs = this._form.querySelectorAll('input');
        let selects = this._form.querySelectorAll('select');
        const ev = this.events.filter(t=> t.evName == 'change')[0];
        const onChagne = ev.fn;

        inputs.forEach(input => {
            if (input.type !== "button" ||
                input.type !== "submit" ||
                input.type !== "reset") {
                input.removeEventListener('change', onChagne);
            }
        });
        selects.forEach(select => {
            select.removeEventListener('change', onChagne);
        });
        this._form = null;
    }
    /**
         * Encrypt private function
         * @param {string} field Field to encrypt
         * @param {string} value Value to encrypt
         */

    #encrypt(field, value) {
        value ||= "";
        const encrypted = CryptoJS.AES.encrypt(value, window.secretKey);
        this[field] = encrypted.toString() ?? value;
    }
    /**
    * decrypt private function
    * @param {string} field Field to encrypt
    * @param {string} value Value to encrypt
    */
    #decrypt(value) {
        const decrypted = CryptoJS.AES.decrypt(value, window.secretKey);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    #setValue(el) {
        if (!el) return
        let value = el.value;
        let key = el.name || el.id;
        if (el.dataset && el.dataset.field ) {
            key = el.dataset.field;
            switch (el.dataset.type) {
                case "securetext":
                    this.#encrypt(key, value);
                    break;
                case "boolean":
                    if(e.type === "checkbox")
                            value = 
                    value == "1" ? "Yes" : "No";
                    this[key] = value;
                    break;
                default:
                    this[key] = value;
                    break;
            }


        } else if (el.name) {
            this[el.name] = value;
        }

    }
    #getValue(el) {
        if (!el) return
        let value = null;
        let key = el.name || el.id;
        if (el.dataset && el.dataset.field && this[el.dataset.field]) {
            key = el.dataset.field;
            switch (el.dataset.type) {
                case "securetext":
                    value = this.#decrypt(this[key]);
                    break;
                case "boolean":
                    value = this[key] == "Yes" || this[key] == "True" ? "1" : "0";
                    break;
                default:
                    value = this[key];
                    break;
            }


        } else if (el.name && this[el.name]) {
            value = this[el.name];
        }
        el.value = value;
    }
    toPlainObject() {
        let plainObject = {};
        this.keys.forEach(key => {
            plainObject[key] = this[key];
        });
        return plainObject;
    }
}