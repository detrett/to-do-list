import "./styles.css";
import { Task } from "./task";

const taskList = document.getElementById('task-list');
const task1 = new Task('task-0', 'Gym', 'Chest day', 'High', 'Today', 'Hello there');

const taskElement = document.createRange().createContextualFragment(task1.renderTask());

taskList.appendChild(taskElement);

const coll = document.querySelectorAll(".collapsible");

coll.forEach((button, index) => {
    button.addEventListener("click", function () {
        this.classList.toggle("active");

        const content = document.getElementById(`details-content-task-${index}`);

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});

const checkboxes = document.querySelectorAll(".task-checkbox");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const task = this.closest('.task');

        if (this.checked) {
            task.classList.add("checked");
        } else {
            task.classList.remove("checked");
        }
    });
});
