

export function createRow(selector, id, data) {
    if ('content' in document.createElement('template')) {
        // Instantiate the table with the existing HTML tbody
        // and the row with the template
        let tbody = document.querySelector("tbody");
        let template = document.querySelector(selector);
        console.log(JSON.stringify(data));
        // Clone the new row and insert it into the table
        let clone = template.content.cloneNode(true);
        let tr = clone.querySelector('tr');
        tr.dataset.id = id;
       
         
        
        let td = clone.querySelectorAll("td");
        const propertyNames = Object.keys(data);
        data['documentId'] = id;
        propertyNames.forEach((element, index) => {
            const col = td[index];
            tr.dataset[col.dataset.id] =data[col.dataset.id]; 
            if (index == 3 && (selector == "#kitchenRow" || selector == "#ordersRow"))
                col.getElementsByTagName("select")[0].value = data[col.dataset.id];
            else {
                if (col.dataset.type === 'securetext') {
                    col.textContent = "*******";
                } else {
                    col.textContent = data[col.dataset.id];
                }
            }

        });

        tbody.appendChild(clone);
    }
}
export function updateRow(id, data, selector = null) {

    // Instantiate the table with the existing HTML tbody
    // and the row with the template
    var tbody = document.querySelector("tbody");
    var tr = tbody.querySelector('[data-id="' + id + '"]');
    if (tr) {
        tr.dataset.model = data;
        var td = tr.querySelectorAll('td');
        const propertyNames = Object.keys(data);
        propertyNames.forEach((element, index) => {
            const col = td[index];
            if (selector && (selector == "#kitchenRow" || selector == "#ordersRow") && index == 3)
                col.getElementsByTagName("select")[0].value = data[col.dataset.id];
            else
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

export function convertToLocalDateTime(datee) {
    var year = datee.getFullYear();
    var month = datee.getMonth() + 1;
    var day = datee.getDate();
    var hour = datee.getHours();
    var minute = datee.getMinutes();

    if (minute < 10)
        minute = "0" + minute;

    if (hour < 10)
        hour = "0" + hour;

    if (day < 10)
        day = "0" + day;

    if (month < 10)
        month = "0" + month;

    var time = "";

    if (datee) {
        time = hour + ":" + minute;
        datee = year + "-" + month + "-" + day;
    }

    return datee + " @ " + time;
}