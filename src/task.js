import { Logger } from "./logger";

export class Task {
    static idCounter = 0;

    constructor(aTag = "No tag", aTitle, aPriority, aDeadline, aDetails = "No additional details!", onDelete, onEdit, isChecked = false, isHidden = false) {
        this.logger = new Logger();
        this.id = "task-" + Task.idCounter++; // Automatically assign an ID and increment the counter
        this.tag = aTag;
        this.title = aTitle;
        this.priority = aPriority;
        this.deadline = aDeadline;
        this.details = aDetails;
        this.isChecked = isChecked;
        this.onDelete = onDelete;
        this.onEdit = onEdit;
        this.isHidden = isHidden;
    }

    info() {
        this.logger.logInfo(`Id: ${this.id}, tag: ${this.tag}, title: ${this.title}, priority: ${this.priority},
        due date: ${this.deadline}, details: ${this.details}`, "brown")
    }

    toggleCheck() {
        this.isChecked = !this.isChecked;
    }

    updateVisibility() {
        const taskElement = document.getElementById(this.id);
        if (this.isHidden) {
            taskElement.classList.add("hide");
        } else {
            taskElement.classList.remove("hide");
        }
    }

    setHide(isHidden) {
        this.isHidden = isHidden;
        this.updateVisibility();
    }

    convertDeadlineToDate() {
        // Remove ordinal suffix (st, nd, rd, th) from the day part of the string
        const cleanedDeadline = this.deadline.replace(/(\d+)(st|nd|rd|th)/, '$1');

        // Convert the cleaned string into a Date object
        return new Date(cleanedDeadline);
    }

    renderEdit(newTitle, newTag, newPriority, newDeadline, newDetails) {
        this.title = newTitle;
        this.tag = newTag;
        this.priority = newPriority;
        this.deadline = newDeadline;
        this.details = newDetails;

        // Update the DOM elements
        const taskElement = document.getElementById(this.id);

        // Update title
        const titleElement = taskElement.querySelector('.title');
        titleElement.textContent = this.title;

        // Update tag
        const tagElement = taskElement.querySelector('.tag');
        tagElement.textContent = this.tag;

        // Update priority
        const priorityElement = taskElement.querySelector('.priority');
        priorityElement.className = `priority ${this.priority.toLowerCase()}`; // Update class based on priority
        priorityElement.firstChild.textContent = `${this.priority} `; // Update text

        // Update deadline
        const deadlineElement = taskElement.querySelector('.deadline');
        deadlineElement.textContent = this.deadline;

        // Update details content
        const detailsContent = taskElement.querySelector('.details-content');
        detailsContent.textContent = this.details;
    }

    // Method to create and return a task element
    createTaskElement() {
        // Create main task container
        const taskElement = document.createElement("li");
        taskElement.classList.add("task");
        taskElement.id = this.id;
        taskElement.dataset.taskId = this.id;
        // <li class="task" id="task-1"></li>

        // Create sub-elements dynamically
        const taskLabel = this.createTaskLabel();

        const tagElement = this.createTextElement("li", "tag", this.tag);
        const titleElement = this.createTextElement("li", "title", this.title);
        const priorityElement = this.createPriorityElement();
        const deadlineElement = this.createTextElement("li", "deadline", this.deadline);


        const collapsibleButton = this.createCollapsibleButton();
        const editButton = this.createIconButton("edit", "Edit task", "icon-edit");
        const deleteButton = this.createIconButton("delete", "Delete task", "icon-trash");

        const detailsContent = this.createDetailsContent();

        // Create list to wrap these elements
        const taskList = document.createElement("ul");

        // Append elements to taskList
        taskList.appendChild(taskLabel);
        taskList.appendChild(tagElement);
        taskList.appendChild(titleElement);
        taskList.appendChild(priorityElement);
        taskList.appendChild(deadlineElement);
        taskList.appendChild(collapsibleButton);
        taskList.appendChild(editButton);
        taskList.appendChild(deleteButton);

        // Append taskList and details content to task element
        taskElement.appendChild(taskList);
        taskElement.appendChild(detailsContent);

        return taskElement;
    }

    // Create a label with a checkbox
    createTaskLabel() {
        const listElement = document.createElement("li");
        const label = document.createElement("label");
        label.classList.add("task-label");
        // <label class="task-label"></label>

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.id = `checkbox-${this.id}`;
        checkbox.checked = this.isChecked;
        // <input type="checkbox" class="task-checkbox" id="checkbox-task-1" checked>

        // Add checkbox event listener
        checkbox.addEventListener("change", () => {
            checkbox.closest('.task').classList.toggle("checked", checkbox.checked);
            this.isChecked = checkbox.checked;
        });

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");
        // <span class="checkmark"></span>

        label.appendChild(checkbox);
        label.appendChild(checkmark);
        // <label class="task-label">
        //     <input type="checkbox" class="task-checkbox" id="checkbox-task-1" checked>
        //     <span class="checkmark"></span>
        // </label>

        listElement.appendChild(label);

        return listElement;
    }

    // Create text-based elements (like tag, title, deadline)
    createTextElement(tagName, className, textContent) {
        const element = document.createElement(tagName);
        element.classList.add(className);
        element.textContent = textContent;
        // <li class="tag">Gym</li> (example for tag)

        return element;
    }

    // Create the priority element
    createPriorityElement() {
        const priorityElement = document.createElement("li");
        priorityElement.classList.add("priority", this.priority.toLowerCase());
        priorityElement.textContent = `${this.priority} `;
        // <li class="priority high">High </li>

        const icon = document.createElement("span");
        icon.classList.add("icon");
        priorityElement.appendChild(icon);
        // <li class="priority high">High <span class="icon"></span></li>

        return priorityElement;
    }

    // Create collapsible button
    createCollapsibleButton() {
        const listElement = document.createElement("li");
        const collapsible = document.createElement("button");
        collapsible.title = "Toggle details";
        collapsible.classList.add("collapsible");
        collapsible.id = `collapsible-${this.id}`;
        // <button title="Toggle information" class="collapsible" id="collapsible-task-1"></button>

        const icon = document.createElement("span");
        icon.classList.add("icon");
        collapsible.appendChild(icon);
        // <button title="Toggle information" class="collapsible" id="collapsible-task-1">
        //     <span class="icon"></span>
        // </button>

        // Attach collapsible event listener
        collapsible.addEventListener("click", () => {
            collapsible.classList.toggle("active");
            const content = document.getElementById(`details-content-${this.id}`);
            content.style.display = content.style.display === "block" ? "none" : "block";
            collapsible.blur();
        });

        listElement.appendChild(collapsible)

        return listElement;
    }

    // Create details content
    createDetailsContent() {
        const detailsContent = document.createElement("div");
        detailsContent.classList.add("details-content");
        detailsContent.id = `details-content-${this.id}`;
        detailsContent.style.display = "none"; // Hidden by default
        detailsContent.textContent = this.details;
        // <div class="details-content" id="details-content-task-1" style="display:none;">Details here</div>

        return detailsContent;
    }

    // Create buttons with icons (edit, delete)
    createIconButton(type, title, iconClass) {
        const listElement = document.createElement("li");
        const button = document.createElement("button");
        button.title = title;
        // <button title="Edit task"></button> (for edit button)

        const icon = document.createElement("span");
        icon.classList.add("icon", iconClass);
        // <span class="icon icon-edit"></span> (for edit button)

        button.appendChild(icon);
        // <button title="Edit task"><span class="icon icon-edit"></span></button>

        if (type === "edit") {
            button.addEventListener("click", () => {
                button.blur();
                this.editTask();
            })
        }

        if (type === "delete") {
            button.addEventListener("click", () => this.deleteTask());
        }

        listElement.appendChild(button)

        return listElement;
    }

    deleteTask() {
        const taskElement = document.getElementById(this.id);
        taskElement.remove();
        this.onDelete(this.id);
    }

    editTask() {
        this.onEdit(this.id, this.tag, this.title, this.priority, this.deadline, this.details);

    }

}