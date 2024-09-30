import { Tab } from "./tab";
import { Task } from "./task";
import { Tag } from "./tag";

export class ScreenController {
    constructor() {
        this.tabs = {
            today: new Tab(document.getElementById("today")),
            week: new Tab(document.getElementById("week")),
            allTasks: new Tab(document.getElementById("all-tasks")),
            done: new Tab(document.getElementById("done")),
        };
        this.tags = {
            gym: new Tag("Gym"),
            school: new Tag("School"),
            home: new Tag("Home"),
        }

        this.activeTab = null; // Default to 'Today' tab
        this.setActiveTab(this.tabs.today); // Initialize with default active tab
        // Add event listeners for tab buttons
        Object.values(this.tabs).forEach((tab) => {
            tab.buttonElement.addEventListener("click", () => this.setActiveTab(tab));
        });

        this.newTaskBtn = document.getElementById("new-task-btn");
        this.taskList = document.getElementById('task-list');
        // Add event listener to new task button
        this.newTaskBtn.addEventListener("click", () => {
            const newTask = this.createTask('Gym', 'Chest day', 'High', 'Today', 'Hello there');
            this.taskList.appendChild(newTask.createTaskElement());

        });
        const myTask = this.createTask('Gym', 'Back day', 'High', 'Today', 'Hello there');
        this.taskList.appendChild(myTask.createTaskElement());

        this.newTagBtn = document.getElementById("newTagBtn");
        this.newTagBtn.addEventListener("click", () => {
            this.newTagBtn.blur();
            this.newTagInput.value = ''; // Clear input
            this.tagModal.style.display = "block"; // Show modal
        })

        this.tagsContainer = document.getElementById("tag-list");
        Object.values(this.tags).forEach((tag) => {
            this.tagsContainer.append(tag.buttonElement);
        })

        // Modal elements
        this.tagModal = document.getElementById("tag-modal");
        this.newTagInput = document.getElementById("new-tag-input");
        this.confirmAddTagBtn = document.getElementById("confirm-add-tag");
        this.cancelAddTagBtn = document.getElementById("cancel-add-tag");
        this.closeModalBtn = document.querySelector(".close-button");

        // Close modal when clicking on cancel or close button
        this.cancelAddTagBtn.addEventListener("click", this.closeModal.bind(this));
        this.closeModalBtn.addEventListener("click", this.closeModal.bind(this));

        this.confirmAddTagBtn.addEventListener("click", () => {
            const tagName = this.newTagInput.value.trim();
            if (tagName) {
                this.createTag(tagName); // Add new tag
            }
        });
    }

    closeModal() {
        this.tagModal.style.display = "none"; // Hide modal
    }

    setActiveTab(newTab) {
        if (this.activeTab !== newTab) {
            // Deactivate current active tab
            if (this.activeTab) {
                this.activeTab.setActive(false);
            }

            // Activate new tab
            newTab.setActive(true);
            this.activeTab = newTab;
        }
    }

    getActiveTab() {
        return this.activeTab;
    }

    createTask(tag, title, priority, deadline, details) {
        return new Task(tag, title, priority, deadline, details);
    }

    createTag(tagName) {
        const newTag = new Tag(tagName); // Create new tag instance
        this.tagsContainer.appendChild(newTag.buttonElement); // Add to tags list
        this.closeModal(); // Close the modal
    }
}