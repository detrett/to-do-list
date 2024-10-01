import { Logger } from "./logger";
import { getToday, formatDate } from "./date";

export class TaskModal {
    constructor() {
        this.logger = new Logger();
        this.addCloseEventListener();
        this.addSubmitEventListener();
    }

    get taskModal() {
        return document.getElementById("task-modal");
    }
    get taskForm() {
        return document.getElementById("taskForm");
    }

    get taskTitle() {
        return document.getElementById("taskTitle");
    }
    get taskDetails() {
        return document.getElementById("taskDetails");
    }
    get taskTag() {
        return document.getElementById("taskTag");
    }
    get taskPriority() {
        return document.getElementById("taskPriority");
    }
    get taskDeadline() {
        return document.getElementById("taskDeadline");
    }

    set taskDeadline(newDeadline) {
        this.taskDeadline.value = newDeadline;
    }

    open = (callback, tags) => {
        this.taskModal.style.display = "block";
        this.callback = callback;
        this.populateTags(tags);
        this.taskDeadline = getToday();
    }

    close = () => {
        this.taskModal.style.display = "none";
    }

    addCloseEventListener = () => {
        this.taskModal.addEventListener("click", (e) => {
            if (e.target.id === "task-close-button" || e.target.id === "task-modal") {
                this.close();
            }
        });
    }

    addSubmitEventListener = () => {
        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Gather input values
            const title = this.taskTitle.value;
            const tag = this.taskTag.value;
            const priority = this.taskPriority.value;
            const deadline = this.taskDeadline.value;
            const details = this.taskDetails.value;

            // Basic validation
            if (title && priority && deadline) {
                // const [year, day, month] = deadline.split("-");
                // const flippedDate = `${day}-${month}`;
                const parsedDate = formatDate(new Date(deadline));

                // Call the callback with the values
                if (typeof this.callback === "function") {
                    this.callback(tag, title, priority, parsedDate, details);
                }

                // Reset form and close the modal
                this.taskForm.reset();
                this.close();
            } else {
                this.logger.logInfo("All fields are required.", "red");
            }

        })
    }

    populateTags(tags) {
        const taskTagSelect = document.getElementById("taskTag");
        
        // Remove options
        while (taskTagSelect.firstChild) {
            taskTagSelect.removeChild(taskTagSelect.firstChild);
        }

        const defaultOption = document.createElement("option");
        defaultOption.value = "No tag";
        defaultOption.textContent = "No tag";
        defaultOption.disabled;
        defaultOption.selected;
        taskTagSelect.appendChild(defaultOption);

        // Add options for each tag available in tags
        for (const tagKey in tags) {
            const option = document.createElement("option");
            option.value = tags[tagKey].title; // Set the value to the tag title
            option.textContent = tags[tagKey].title; // Display the tag title
            taskTagSelect.appendChild(option); // Add the option to the select
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

}

