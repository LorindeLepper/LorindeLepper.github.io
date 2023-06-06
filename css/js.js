// service worker
window.addEventListener("load", () => {
   if ("serviceWorker" in navigator) {
       navigator.serviceWorker.register("service-worker.js")
   }
});



// navigation drawer
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main');


// temp solution drawer
function noClick () {
    document.querySelector('.main').classList.add('pointer');
}

// Openen en dicht doen van navigation drawer
// het moment dat er op het icoontje word gedrukt voor de drawer gaat hij open
document.querySelector('.mdc-top-app-bar__navigation-icon').addEventListener('click', (event)=>{drawer.open = true; noClick()});
listEl.addEventListener('click', (event) => {
    drawer.open = false;
});
document.body.addEventListener('MDCDrawer:closed', () => {
    mainContentEl.querySelector('input, button').focus();
});



// Filter systeem
// Selecteerd alle fotos en verbergt ze
// De fotos die hetzelfde id hebben als e worden weer zichtbaar
function selectAllFunction(e) {
    document.querySelectorAll('.mdc-image-list__item').forEach(elem => {elem.classList.add('hidden')});
    document.querySelectorAll('.' + e).forEach(elem => {elem.classList.remove('hidden')});
}



// als iemand op vorige drukt (naar home) worden de sheets gesloten
window.addEventListener('popstate', function() {
    closeSheet();
});



function openSheet(sheetID, source, title){
    // selecteer de juiste sheet op basis van id
    let sheet = document.getElementById(sheetID);

    // zorg dat de sheet geladen wordt voor de browser, naar de margin is deze nog niet in het zicht
    sheet.classList.remove('hidden');
    // even wachten zodat het element zeker zichtbaar is voor de browser (wel uit het zicht van de gebruiker) en geanimeerd kan worden
    // zodat hij niet aan het laden is terwijl hij bezig is met animeren
    setTimeout(function(){ sheet.classList.remove('sheet-out-of-view'); }, 10);

    // als de homepage heel lang zou zijn kan je onder de sheet door scrollen, dat willen we als de sheet open is voorkomen (wel pas na animatie)
    setTimeout(function() {
       let maxHoogteMain = sheet.getElementsByTagName('main')[0].offsetHeight - 10;
    }, 300);

    // pas de url aan zodat de pagina uiteindelijk ook gedeeld kan worden, maar refresh niet!
    let newURL = window.location.href + '?sheet=' + sheetID;
    history.pushState(null,null,newURL);

    // verbergt de main zodat je niet meer naar beneden kan scrollen in de sheet
    document.querySelector('#main').classList.add('hidden');

    // zet de titel  en foto op de juiste plek
    document.querySelector('#meme-image').src = source;
    document.querySelector('#meme-title').innerText = title;
}



function closeSheet(){
    // verwijder eerste "alle" sheets weer uit het zicht met een animatie en daarna ook niet meer weergeven in browser
    let sheets = document.querySelectorAll('.sheet');
    sheets.forEach(sheet=> {
        sheet.classList.add('sheet-out-of-view');
        setTimeout(function() { sheet.classList.add('hidden'); }, 310);
    });

    // maakt main weer zichtbaar zodat je weer de andere memes kan zien
    document.querySelector('#main').classList.remove('hidden');

    // url weer aanpassen naar home voor de zekerheid
    history.pushState(null,null, window.location.pathname);
}


