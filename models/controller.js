const controler = function (model, view) {        
    let DOM = view.getDOMStrings();
    let setupListeners = function () {
        const saveBtn = document.querySelector('#save');
        saveBtn.addEventListener('click', ()=>{
            model.setCookies();
        })
        const addButton = document.getElementById(DOM.addButton);
        addButton.addEventListener("click", ctrlAddItem);
        const filter = document.querySelector('#filter');
        filter.addEventListener('change', filterFnc)
    }
    let filterFnc = () => {
        let value = filter.value
        model.filterComplete(value);
        let filterArray = model.filterComplete(value);
        view.filterRender(filterArray);
    };
    let ctrlAddItem = function () {
        let input = view.getInput();
        if (input.trim() !== "") {
            let newItem = model.addNewItem(input);
            if (newItem !== -1) {
                view.addItemToView(newItem);
                addListenerForCheckbox(newItem);
                addListenerForSpan(newItem);
            }
        }
    }
    let addListenerForCheckbox = (newItem) => {
        let oneCheckbox = document.getElementById(newItem.id)
        oneCheckbox.addEventListener('change', () => {
            view.taskIsdone(oneCheckbox);
            let nextElement = oneCheckbox.nextElementSibling
            model.completionCheck(nextElement, oneCheckbox);
        })
    };
    document.getElementById(DOM.deleteButton).addEventListener('click', () => {
        let checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
        view.deleteFromList(checkedBoxes);
        model.deleteFromArray(checkedBoxes)
    });
    let addListenerForSpan = (newItem) => {
        document.getElementById(newItem.toDoText).addEventListener('dblclick', () => {
            view.changeTask(newItem);
            let noChangeBtn = document.querySelector('.noChange')
            noChangeBtn.addEventListener('click', (newItem) => {
                view.noChangeItem(newItem);
            })
            let change = document.querySelector('.change');
            change.addEventListener('click', () => {
                view.change(newItem);
                let x = view.change(newItem);
                view.newRender(x);
                model.changeInModel(x);
                view.noChangeItem(x);
            });
        });
    }
    let myCookie = document.cookie.match('(^|;)\\s*' + 'allItems' + '\\s*=\\s*([^;]+)')?.pop() || ''
        if(myCookie.length > 0) {
            myCookie = JSON.parse(myCookie)
            myCookie.forEach(elem=>{
                model.pushToArrayFromCookie(elem);
                view.addItemToView(elem);
                addListenerForCheckbox(elem);
                addListenerForSpan(elem);    
            })
        }
    return {
        init: function () {
            setupListeners();
        }
    }
};

export default controler;