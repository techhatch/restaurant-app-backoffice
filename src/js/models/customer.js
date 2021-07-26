/**
 * Customer Model
 */
class Customer {


    /**
     * 
     * @param {HTMLFormElement} form Form Element
     * @param {object} restParameters field values
     */
    constructor(form, obj) {
        if(form && !obj)
        {
            const elems = form.elements;
            this.firstName = elems['firstName'].value;
            this.lastName = elems['lastName'].value;
            this.userName = elems['userName'].value;
            const status = elems['status'].checked;
            this.status  = status ? "1" :"0"; 
            this.documentId = elems['modelId'].value;
            const _pass = elems['password'].value;
            this.setPassword(_pass);
        }
        if (obj) {
            this.firstName = obj['firstName'];
            this.lastName = obj['lastName'];
            this.userName = obj['userName'];
            this.status = obj['status'];
            this.documentId = obj['id'];
            const _pass = obj['password'];
            this.setPassword(_pass);
            if (form) {
                this.form = form;
                Object.keys(this).forEach(key => {
                    const elem = form.elements[key];
                    if (elem) {
                        if (elem.dataset.type === 'securetext') {
                            elem.value = this.#decrypt(this[key]);
                        }
                        else {
                            elem.value = this[key];
                        }
                    }
                });
            }
        }

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
    /**
     * Set plain text to encrypt and assign to password field
     * @param {string} value Plain password 
     */
    setPassword(value) {
        this.#encrypt('password', value);
    }

    /**
     * Palin password text
     * @returns {string} plain text of password field
     */
    getPlainPassword() {
        return this.#decrypt(this.password);
    }

    /**
     * Plain object value
     * @returns {Object}
     */
    toObject() {
        let obj = {};
        obj['firstName'] = this.firstName;
        obj['lastName'] = this.lastName;
        obj['userName'] = this.userName;
        obj['status'] = this.status;
        obj['password'] = this.password; //this.#decrypt(this.password);
        return obj;
    }
    update() {
        if (!this.form) return;
        const obj = this.form.elements;
        this.firstName = obj['firstName'].value;
        this.lastName = obj['lastName'].value;
        this.userName = obj['userName'].value;
        this.status = obj['status'].value;
        const _pass = obj['password'].value;
        this.setPassword(_pass);
    }
}

export default Customer;