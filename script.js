const model = (function () {
    const items = [];

    class ToDoItem {
        constructor(toDoText) {
            let globalId ;
            if(items.length == 0){
                globalId = items.length+1
            }else if(items.length > 0){
                globalId = (items[items.length-1].id)+1;
            }
            this.toDoText = toDoText;
            this.id = globalId;
            this.done = false;
            globalId++;
        }

    }


    function isItemInArray(text) {

        let isFound = false;

        items.forEach(elem => {


            if (elem.toDoText == text) {

                isFound = true;
            }
        })

        return isFound;


    }


    return {

        addNewItem: function (inputText) {

            let obj = new ToDoItem(inputText);

            if (!isItemInArray(inputText)) {
                items.push(obj);

                return obj;

            } else {
                return -1;
            }
        },
        deleteFromArray: function (check) {
            check.forEach(elem => {
                items.forEach(element => {
                    if (elem.id == element.id) {
                        let position = items.indexOf(element);
                        items.splice(position, 1);

                    }
                })
            })
        },
        changeInModel: function (model) {
            items.forEach(element => {
                if (element.id == model.id) {
                    element.toDoText = model.newValueOfTask;
                }
            });
        },
        completionCheck: function (nextElement, oneCheckbox) {
            items.forEach(elem => {
                if (elem.id == oneCheckbox.getAttribute('id')) {
                    if (nextElement.getAttribute("class") !== "") {
                        elem.done = true;
                    } else {
                        elem.done = false;
                    }
                }
            })
        },
        filterComplete: function (value) {
            
            if (value == 'all') {
                let newArray = items;
                return newArray;
            } else if (value == 'complete') {
                let newArray = items.filter(elem => elem.done == true);
                return newArray;
            } else if (value == 'unfinisher') {
                let newArray = items.filter(elem => elem.done == false);
                return newArray;
            }
        },
        setCookies: function () {
            let toSent = JSON.stringify(items)
            document.cookie = `allItems=${toSent}; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}`;
            alert(`Successfully saved`)
        },
        pushToArrayFromCookie: function (data) {
            items.push(data);
        }


    }


})();



const view = (function () {


    const DOMStrings = {


        myList: 'myList',
        userInput: 'userInput',
        addButton: 'button1',
        deleteButton: 'button2',
    }



    return {

        getInput: function () {


            return document.getElementById(DOMStrings.userInput).value;
        },

        getDOMStrings: function () {

            return DOMStrings;
        },
        addItemToView: function (obj) {
            
            const lista = document.getElementById(DOMStrings.myList);
            const listItem = document.createElement("li");
            const chekBox = document.createElement("input");

            chekBox.setAttribute("id", `${obj.id}`);

            chekBox.setAttribute("type", "checkbox");
            const span = document.createElement("span");
            span.setAttribute("id", `${obj.toDoText}`);
            if(obj.done == true){
                span.setAttribute("class", 'checked');
                chekBox.setAttribute("checked", "true");
            }
            span.innerText = obj.toDoText;

            listItem.appendChild(chekBox);
            listItem.appendChild(span);
            lista.appendChild(listItem);

            userInput.value = "";


        },
        taskIsdone: function (oneCheckbox) {
            console.log(`funkcija`);
            let nextElement = oneCheckbox.nextElementSibling;
            if (oneCheckbox.checked) {
                
                nextElement.classList.add("checked");

            } else {
               
                nextElement.classList.remove("checked");

            }

        },
        deleteFromList: function (checkedBoxes) {

            checkedBoxes.forEach(element => {
                element.parentElement.remove()
            })
        },
        changeTask: function (task) {

            let div = document.createElement("div");
            div.setAttribute("class", 'changeTask');
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("value", `${task.toDoText}`);
            input.setAttribute("class", `${task.id}`);
            input.setAttribute("class", "newInput");
            let btn = document.createElement("button");
            btn.setAttribute("class", "change");
            btn.innerText = 'Change Task';
            let btn2 = document.createElement("button");
            btn2.setAttribute("class", "noChange");
            btn2.innerText = 'No change';
            div.append(input);
            div.append(btn);
            div.append(btn2);
            document.body.append(div);
        },
        noChangeItem: function () {
            let x = document.querySelector('.newInput').value = "";
            document.querySelector('.changeTask').remove();
        },
        change: function (data) {
            let id = data.id;
            let newValueOfTask = document.querySelector('.changeTask').querySelector('input').value;
            return {
                id,
                newValueOfTask
            }
        },
        newRender: function (x) {
            let findLI = document.getElementById(x.id);
            findLI.nextSibling.innerText = x.newValueOfTask;
        },
        filterRender: function (data) {
            console.log(data);
            let allCheck = document.querySelectorAll('input[type="checkbox"]');
            allCheck.forEach(elem=>{
                elem.parentElement.style.display = 'none';
            })
            data.forEach(elem=>{
                document.getElementById(elem.id).parentElement.style.display = "block"
            })
        }

    }



})();



const controler = (function (model, view) {
    
        
        
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

})(model, view);


controler.init();