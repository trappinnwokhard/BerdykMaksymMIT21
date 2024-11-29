const selectors = {
    stateJson: '#state',
    emptyState: '.empty-state',
    deleteFormula: 'trash',
    createFormula: 'create_formula',
    pen: 'pen',
    textInputforCreatingFormula: '.text_input',
    discard: '.discard',
    save: '.save',
    formulasFolder: '#formulasFolder',
    template: '.formula-template',
    createFormulaFromEmptyState: 'b_0',
    link: 'linkToFormulasPage',
    table: '.formulas_s',
    home: '#home'
}


const currentSettings  = document.querySelector(selectors.formulasFolder);
const savedSettings = currentSettings.cloneNode(currentSettings);

const empty = document.querySelector(selectors.emptyState);
const table = document.querySelector(selectors.table)

const url = new URL(window.location);



function emptyStateFunction( x ){
    if (x.childElementCount == 1) {
        empty.classList.remove('hidden');
        table.classList.add('hidden');
    }
    else {
        empty.classList.add('hidden');
        table.classList.remove('hidden');
    }
}
emptyStateFunction(currentSettings);


const initialState = document.querySelector(selectors.stateJson).textContent;
const state = JSON.parse(initialState);


document.addEventListener('click', (event) => {
    if (event.target.classList.contains(selectors.deleteFormula)) {
        const parent = event.target.parentElement.parentElement;
        parent.remove();
        emptyStateFunction(currentSettings);
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains(selectors.pen)) {
        if (document.querySelector(selectors.textInputforCreatingFormula).value == "") {
            console.log("Write something ...");
            alert("Write something ...");
        }
        else{
            const sibling = event.target.parentElement.parentElement.firstElementChild.firstElementChild;
            sibling.innerText = document.querySelector(selectors.textInputforCreatingFormula).value;
            document.querySelector(selectors.textInputforCreatingFormula).value = "";
        }
    }
});








const field = document.querySelector(selectors.formulasFolder);
const template = document.querySelector(selectors.template);
// CREATE FORMULA
document.addEventListener('click', (event) => {
    if (event.target.classList.contains(selectors.createFormula) || event.target.classList.contains(selectors.createFormulaFromEmptyState)) {
        if (document.querySelector(selectors.textInputforCreatingFormula).value == "") {
            console.log("Write something ...");
            alert("Write something ...");
        }
        else{
            const newElement = document.createElement("tr");
            newElement.classList.add("." + selectors.template);
            newElement.innerHTML = template.innerHTML;
            newElement.querySelector("." + selectors.link).innerText = document.querySelector(selectors.textInputforCreatingFormula).value;
        
            console.log(newElement);
            field.appendChild(newElement);
            document.querySelector(selectors.textInputforCreatingFormula).value = "";
            emptyStateFunction(currentSettings);
        }
    }
});



const saveButton = document.querySelector(selectors.save);
const discardButton = document.querySelector(selectors.discard);

saveButton.addEventListener('click', () => {
    savedSettings.innerHTML = currentSettings.innerHTML;
    console.log(savedSettings);
})
discardButton.addEventListener('click', () => {
    document.querySelector(selectors.formulasFolder).innerHTML = savedSettings.innerHTML;
    console.log(document.querySelector(selectors.formulasFolder));
    emptyStateFunction(currentSettings);
})


document.addEventListener('click', (e) => {
    if (e.target.classList.contains(selectors.link)) {

        const child = e.target.parentElement.parentElement; // formula-template
        const parent = child.parentElement; // formulaFolder
        const children = Array.from(parent.children); // children of formulaFolder
        const index = children.indexOf(child); // index of formula template
        console.log(index);
        const urlToMerge = "http://127.0.0.1:5500/WEB-Shopify--MIT-21-BerdykMaksym/";
        console.log
        window.location.href = `${urlToMerge}formula.html${url.search}&id=${index}`;
    }
})
document.querySelector(selectors.home).addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:5500/WEB-Shopify--MIT-21-BerdykMaksym/";
})
