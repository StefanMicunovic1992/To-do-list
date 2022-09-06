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

export default model;