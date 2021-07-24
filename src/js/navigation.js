/**
 * Navigation bar
 */
export class Navigation {

    /**
     * Instansiate navigation class object
     * @param {string} selector Container selector
     * @param {Function} navigationHandler Bind anchor click function to load component content
     */
    constructor(selector, navigationHandler) {
        /**
         * @property {HTMLElement} container Container Element
         */
        this.container = document.querySelector(selector);
        this.navigationHandler = navigationHandler;
    }

    /**
     * Render
     * @param {HTMLElement} nav Navigation
     * @param {Array<NavigationItem>} thisArgArray Navigation Items
     */
    render(nav, ...thisArgArray) {
        const ul = document.createElement('ul');
        thisArgArray.forEach(item => {
            const li = document.createElement('li');
            const anchor = item.createLink(this.navigationHandler);
            li.appendChild(anchor);
            ul.appendChild(li);
        });
        nav.appendChild(ul);
    }
}

/**
 * Navigation Item
 */
export class NavigationItem {

    /**
     * Constructor
     * @param {string} id Link id
     * @param {string} name Link Name
     * @param {string} path Component path
     * @param {string} iconClass Icon class
     * @param {Function} onLoad Callback for onload 
     */
    constructor(id, name, path, iconClass, onload) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.iconClass = iconClass;
        this.onload = onload;
    }

    /**
     * Create Link
     * @param {Function} render Render function that take dom element argument
     */
    createLink(render) {
        const anchor = document.createElement('a');
        const textNode = document.createTextNode(this.name);
        const textElem = document.createElement('span');
        const icon = document.createElement('span');

        anchor.id = this.id;
        icon.classList.add(this.iconClass);
        textElem.appendChild(textNode);

        anchor.setAttribute('href', '#');
        anchor.appendChild(icon);
        anchor.appendChild(textElem);
        anchor.classList.add('changepage');
        anchor.addEventListener('click', async (ev) => {
            ev.preventDefault();
            await loadComponent(this.path).then(elem => {
                render(elem);
                if(this.onload)
                {
                    this.onload(elem);
                }
            }, err => {
                console.error('Unable to load component' + err);
            });
        });
        return anchor;
    }
}

/**
 * 
 * @param {string} pagename Component Name
 * @returns {Promise} Promoise
 */
function loadComponent(pagename) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pagename);
    const parser = new DOMParser();
    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            try {
                let domElement = parser.parseFromString(this.response, 'text/html');
                resolve(domElement.activeElement.firstChild);
            } catch (error) {
                reject(error);
            }
        };
        xhr.send();
    });
}