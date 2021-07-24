class FrontendDOMHelper {
    /**
     * Constructor
     * @param {HTMLElement} root Root App element
     */
    constructor(selector) {
        this.selector = selector || "#container";
        this.rootElement = document.querySelector(selector);
    }


    /**
     * Create Html Element and attach to root or owner
     * @param {string|ENode} node string or Element node
     * @param {HTMLElement} owner owner Element
     * @returns Element
     */
    createElement(node, owner) {
        let el;
        if (typeof node === string) {
            el = document.createTextNode(node);
        }
        else {
            el = Object.assign(document.createElement(node.tagName), node.Props);
        }
        owner = owner || this.rootElement;
        if (node.children) {
            node.children.forEach((child) => {
                el.appendChild(createElement(child));
            });
        }
        owner.appendChild(el);
        return el;
    }

    /**
     * Create Table row
     * @param {HTMLTableSectionElement} tbody Table body element
     * @param {HTMLTemplateElement} template Row template
     * @param {ModelRow} row RowItem
     */
    createRow(tbody, template, row) {
        if (!tbody) {
            console.debug("Unable to load tbody");
            return;
        }
        const data = row.data;
        const propertyNames = Object.keys(row.data);
        let td = [];
        let clone = null;
        let tr = null;
        if ('content' in document.createElement('template')) {
            clone = template.content.cloneNode(true);
            tr = clone.querySelector('tr');
            tr.dataset.id = row.id;
            td = clone.querySelectorAll("td");

        } else {
            let tr = document.createElement('tr');
            tr.dataset.id = row.id;
            propertyNames.forEach((_, i) => {
                const datacol = document.createElement('td');
                td[i] = datacol;
                tr.appendChild(datacol);
            });
        }
        propertyNames.forEach((element, index) => {
            const col = td[index];
            tr.dataset[col.dataset.id] = data[col.dataset.id];
            if (col.children.length > 0) {
                col.firstChild.value = data[col.dataset.id];
            }
            else {

                if (col.dataset.type === 'securetext') {
                    col.textContent = "*******";
                }
                else if (col.dataset.type === 'boolean') {
                    col.textContent = data[col.dataset.id] == "1" ? "Yes" : "No";
                }
                else {
                    col.textContent = data[col.dataset.id];
                }
            }

        });

        tbody.appendChild(clone || tr);
    }

    /**
     * Update Row
     * @param {ModelRow} row Model Row 
     * @param {HTMLTableSectionElement} owner Table body element
     */
    updateRow(row, owner) {
        var tbody = owner || document.querySelector("tbody");
        var tr = tbody.querySelector('[data-id="' + row.id + '"]');
        if (tr) {
            tr.dataset.model = row.data;
            const data = row.data;
            var td = tr.querySelectorAll('td');
            const propertyNames = Object.keys(data);
            propertyNames.forEach((element, index) => {
                const col = td[index];
                if (col.children.length > 0) {
                    col.firstChild.value = data[col.dataset.id];
                }
                else {
                    if (col.dataset.type === 'boolean') {
                        col.textContent = data[col.dataset.id] == "1" ? "Yes" : "No";
                    }
                    else {
                        col.textContent = data[col.dataset.id];
                    }

                }
            });
        }
    }
    deleteRow(id, owner) {
        var tbody = owner || document.querySelector("tbody");
        var tr = tbody.querySelector('[data-id="' + id + '"]');
        if (tr) {
            tbody.removeChild(tr);
        }
    }
}

export const FE = new FrontendDOMHelper(null);

export class ENode {

    /**
     * Constructor
     * @param {typeof HTMLElementDeprecatedTagNameMap} tagName tagName
     * @param {any[]} props Props array 
     * @param {HTMLElement[]} children children Element array
     */
    constructor(tagName, props, children) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }
}

export class ModelRow {
    /**
     * Constractor
     * @param {string} id 
     * @param {string|object} data 
     */
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
}