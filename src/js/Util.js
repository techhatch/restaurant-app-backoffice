export function createRow(selector, id, data) {
    if ('content' in document.createElement('template')) {
        // Instantiate the table with the existing HTML tbody
        // and the row with the template
        var tbody = document.querySelector("tbody");
        var template = document.querySelector(selector);

        // Clone the new row and insert it into the table
        var clone = template.content.cloneNode(true);
        var tr = clone.querySelector('tr');
        tr.dataset.id = id;
        var td = clone.querySelectorAll("td");
        const propertyNames = Object.keys(data);
        propertyNames.forEach((element, index) => {
            const col = td[index];
            col.textContent = data[col.dataset.id];
        });

        tbody.appendChild(clone);
    }
}
export function updateRow(id, data) {

    // Instantiate the table with the existing HTML tbody
    // and the row with the template
    var tbody = document.querySelector("tbody");
    var tr = tbody.querySelector('[data-id="' + id + '"]');
    if (tr) {
        var td = tr.querySelectorAll('td');
        const propertyNames = Object.keys(data);
        propertyNames.forEach((element, index) => {
            const col = td[index];
            col.textContent = data[col.dataset.id];
        });

    }

}

export function deleteRow(id) {

    // Instantiate the table with the existing HTML tbody
    // and the row with the template
    var tbody = document.querySelector("tbody");
    var tr = tbody.querySelector('[data-id="' + id + '"]');
    if (tr) {
        tbody.removeChild(tr);
    }

}