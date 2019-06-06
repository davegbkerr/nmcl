// function to save data to appropriate storage method
function saveData() {

    // create vehicle object and assign values from DOM
    const VEHICLE = {
        model: HELIOS.components.cfg_v2.coreConfiguratorJson["model"]["basicModelInformation"]["dataName"],
        price: document.querySelector("span.price").childNodes[0].data,
        year: HELIOS.components.cfg_v2.coreConfiguratorJson["model"]["basicModelInformation"]["year"]
    };

    // JSONify vehicle object for ease of use
    const SAVE_VALUE = JSON.stringify(VEHICLE);

    // check for localStorage support
    if (typeof(Storage) !== "undefined") {
        // save data as localStorage key->value pairs
        localStorage.setItem('jsdkvehicle', SAVE_VALUE);
    } else {
        // localStorage not supported - fallback to cookies (expiry 1 year)
        const EXPIRES = new Date(Date.now() + 3600 * 1000 * 24 * 365).toUTCString();
        document.cookie = `jsdkvehicle=${saveValue}; expires=${EXPIRES}; path=/`;
    }

    return VEHICLE;
}

// load data from storage or cookies as appropriate
function loadData() {
    let vehicle;
    if (typeof(Storage) !== "undefined" && localStorage.getItem("jsdkvehicle") !== null) {
        // load data from localStorage
        vehicle = JSON.parse(localStorage.getItem('jsdkvehicle'));
    } else {
        // load data from cookie (or nullify)
        let vehicleCookie = document.cookie.split(';').filter((ind) => ind.trim().startsWith('jsdkvehicle='));
        vehicle = vehicleCookie.length ? JSON.parse(vehicleCookie[0].trim().replace('jsdkvehicle=','')) : null;
    }
    return vehicle;
}

// show data on page
function displayData() {
    // get the data
    let vehicle = loadData();
    if (typeof vehicle === null) return;

    // populate markup
    let html = `<div style="position:fixed;width:100%;max-width:300px;display:block;background:#FFFFFF;top:55%;right:0;z-index:999999;padding:20px;border:solid 1px #ccc;">
      <h4>You recently viewed the following vehicle:</h4><ul style="margin:10px 0;padding:0;list-style:none;">`;
    for (let k in vehicle) {
        html += `<li style="color:#8a8a8a;text-transform:capitalize;"><span style="color:#343434;">${k}:</span> ${vehicle[k]}</li>`
    }
    html += `</ul><a style="border:1px solid #c3002f;background:#c3002f;color:#fff;font-family:'Nissan Regular','Nissan Regular';
          text-transform:uppercase;padding:10px;text-decoration:none;text-align:center;display:block;"
      href="https://www.nissanusa.com/vehicles/cars/versa-sedan/build-price.html#configure/Ak5Jc/exterior-colour">Resume price builder</a></div>`;

    // create wrapper div and append to body or refresh if exists
    const newDiv = document.body.contains(document.getElementById('jsdkWrapper')) ? document.getElementById('jsdkWrapper') : document.body.appendChild(document.createElement("div"));
    newDiv.id="jsdkWrapper";
    newDiv.innerHTML = html;
}

// clear out data for testing purposes
function clearData() {
    if (typeof(Storage) !== "undefined" && localStorage.getItem("jsdkvehicle") !== null) {
        localStorage.removeItem("jsdkvehicle");
    }
    if (document.cookie.split(';').filter((ind) => ind.trim().startsWith('jsdkvehicle=')).length) {
        document.cookie = 'jsdkvehicle=; path=/; expires=' + new Date(0).toUTCString() + ';';
    }
}