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

export default view;