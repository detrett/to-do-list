import { Logger } from "./logger";
import { Tab } from "./tab";
import { Task } from "./task";
import { Tag } from "./tag";
import { TagModal } from "./tag-modal";
import { TaskModal } from "./task-modal";

export class ScreenController {
    constructor() {

        // LOGGER
        this.logger = new Logger();

        // SIDEBAR: TABS
        this.tabs = {
            today: new Tab(document.getElementById("today")),
            week: new Tab(document.getElementById("week")),
            allTasks: new Tab(document.getElementById("all-tasks")),
            done: new Tab(document.getElementById("done")),
        };
        this.activeTab = null;
        this.setActiveTab(this.tabs.today); // Set 'Today' as the default active tab
        Object.values(this.tabs).forEach((tab) => { // Add event listeners for tab buttons
            tab.buttonElement.addEventListener("click", () => {
                this.setActiveTab(tab)
                // Filter function
                // Display function
            });
        });

        // SIDEBAR: TAGS
        this.tags = {
            gym: new Tag("Gym", (title) => this.handleTagDeletion(title)),
            school: new Tag("School", (title) => this.handleTagDeletion(title)),
            home: new Tag("Home", (title) => this.handleTagDeletion(title)),
        };
        this.updateTagList(); // Initial tag list population

        // MODAL: TAGS
        this.tagModal = new TagModal();
        this.newTagBtn = document.getElementById("newTagBtn"); // New tag button
        this.newTagBtn.addEventListener("click", () => {
            this.newTagBtn.blur();
            // Callback function to retrieve input and update tag list
            this.tagModal.open((newTagName) => {
                this.logger.logInfo(newTagName + " tag added", "darkgreen");
                const newTag = new Tag(newTagName, (title) => this.handleTagDeletion(title));
                this.tags[newTagName.toLowerCase()] = newTag;

                this.updateTagList();

            });
        })

        // TASKS
        this.tasks = {
            "task-0": this.createTask('Gym', 'Back day', 'High', 'Today', '4 back exercises, 2 biceps exercises. No cardio today.', (id) => this.handleTaskDeletion(id)),
        };
        this.updateTaskList();

        // MODAL: TASKS
        this.taskModal = new TaskModal();
        this.newTaskBtn = document.getElementById("new-task-btn");
        this.newTaskBtn.addEventListener("click", () => {
            this.newTaskBtn.blur();

            // Callback function to retrieve new task and update task list
            this.taskModal.open((tag, title, priority, flippedDate, details) => {
                const newTask = new Task(tag, title, priority, flippedDate, details, (id) => this.handleTaskDeletion(id));
                newTask.info();
                this.tasks[newTask.id] = newTask;

                this.updateTaskList();
            }, this.tags);
        })

    }

    get tagList() {
        return document.getElementById("tag-list");
    }

    // SIDEBAR: TAG UPDATER
    updateTagList() {
        Object.values(this.tags).forEach((tag) => {
            // Check if the tag is already in the list to avoid duplicates
            if (!this.tagList.querySelector(`#${tag.parseTitleToId(tag.title)}`)) {
                this.tagList.appendChild(tag.buttonElement); // Append only new tags
            }
        });
    }

    handleTagDeletion(title) {
        if (this.tags[title.toLowerCase()]) {
            delete this.tags[title.toLowerCase()];
            console.log(`${title} tag removed.`);
        } else {
            console.log(`${title} tag not found.`);
        }
    }

    get taskList() {
        return document.getElementById('task-list');
    }

    // TASK LIST UPDATER
    updateTaskList() {
        // Collect existing task IDs in the DOM
        const existingTaskIds = new Set(Array.from(this.taskList.children).map(taskEl => taskEl.dataset.taskId));

        console.log("Existing DOM task IDs:", [...existingTaskIds]); // Log existing IDs

        // Iterate over tasks in the controller
        Object.values(this.tasks).forEach(task => {
            console.log("Checking task ID:", task.id); // Log the task ID being checked
            if (!existingTaskIds.has(task.id.toString())) {
                // Only append tasks that are not in the DOM yet
                console.log("Adding task ID:", task.id);
                this.taskList.appendChild(task.createTaskElement());
            }
        });
    }

    handleTaskDeletion(id) {
        if (this.tasks[id]) {
            delete this.tasks[id];
            console.log(`${id} tag removed.`);
        } else {
            console.log(`${id} tag not found.`);
        }
    }

    // Removes all children of an element
    removeChildren(myElement) {
        while (myElement.firstChild) {
            myElement.removeChild(myElement.firstChild);
        }
    }

    populateTagsSelect() {
        const taskTagSelect = document.getElementById("taskTag");

        // Add options for each tag available in this.tags
        for (const tagKey in this.tags) {
            const option = document.createElement("option");
            option.value = this.tags[tagKey].title; // Set the value to the tag title
            option.textContent = this.tags[tagKey].title; // Display the tag title
            taskTagSelect.appendChild(option); // Add the option to the select
        }
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

    createTask(tag, title, priority, deadline, details, onDelete) {
        return new Task(tag, title, priority, deadline, details, onDelete);
    }


}