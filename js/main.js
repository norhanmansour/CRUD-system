var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");

var submitBtn = document.getElementById("submitBtn");
var inputs = document.getElementsByClassName("form-control");
var table = document.getElementById("createTable");
var sites = [];
var currentIndex = 0;

if (JSON.parse(localStorage.getItem('site') != null)) {
    sites = JSON.parse(localStorage.getItem('site'));
    displaySite();
}

submitBtn.onclick = function() {
    if (submitBtn.innerHTML == 'Submit') {
        createSite();
    } else {

        updateSiteInfo();

    }

    displaySite();
    resetForm();
}

function createSite() {
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }
    sites.push(site);
    localStorage.setItem('site', JSON.stringify(sites));

}

function visitBtn(index) {
    var urlNeeded = sites[index].url;
    window.open(urlNeeded, '_blank');
}

function displaySite() {
    var cartona = '';
    for (var i = 0; i < sites.length; i++) {
        cartona += `
    <tr class="p-5  bg-light shadow">
    <td>${sites[i].name} </td>
    <td>
        <button onClick="visitBtn(${i})" class="btn btn-outline-primary">Visit</button>
        <button onClick="getSiteInfo(${i})" class="btn btn-outline-warning">Update</button>
        <button id="deleteBtn" onClick="deleteSite(${i}) " class="btn btn-outline-danger">Delete</button>
    </td>
    </tr>
    `
    }
    table.innerHTML = cartona;
}

function getSiteInfo(index) {
    currentIndex = index;
    var currentSite = sites[index]
    siteNameInput.value = currentSite.name;
    siteUrlInput.value = currentSite.url;
    submitBtn.innerHTML = 'Update Site';
    // updateSiteInfo();



}

function updateSiteInfo() {

    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    }
    sites[currentIndex] = site;
    localStorage.setItem('site', JSON.stringify(sites));
    submitBtn.innerHTML = 'Submit';




}

function resetForm() {

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function deleteSite(index) {
    sites.splice(index, 1);
    displaySite();
    localStorage.setItem('site', JSON.stringify(sites));
}

function searchInput(searchTxt) {
    console.log(searchTxt);

    var cartona = '';
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].name.toLowerCase().includes(searchTxt.toLowerCase())) {
            cartona += `
            <tr class="p-5  bg-light shadow">
            <td>${sites[i].name} </td>
            <td>
                <button onClick="visitBtn(${i})" class="btn btn-outline-primary">Visit</button>
                <button onClick="getSiteInfo(${i})" class="btn btn-outline-warning">Update</button>
                <button id="deleteBtn" onClick="deleteSite(${i}) " class="btn btn-outline-danger">Delete</button>
            </td>
            </tr>
            `
        }
    }
    table.innerHTML = cartona;
}



var alertName = document.getElementById('alertName');

var validation1 = siteNameInput.onkeyup = function() {
    var rejexSiteName = /^[a-z A-Z]{3,}$/;
    if (rejexSiteName.test(siteNameInput.value)) {

        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        return true;

    } else {
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        alertName.classList.remove('d-none');
    }
}


var alertUrl = document.getElementById('alertUrl');
var validation2 = siteUrlInput.onkeyup = function() {
    var rejexSiteUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (rejexSiteUrl.test(siteUrlInput.value)) {

        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        alertUrl.classList.add('d-none');
        return true;

    } else {
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        alertUrl.classList.remove('d-none');
    }
}

if (validation1 && validation2) {
    submitBtn.removeAttribute('disabled');
}