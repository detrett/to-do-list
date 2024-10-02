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
                
                switch (tab.buttonElement.id) {
                    case 'today':
                        this.filterTasks('today');
                        break;
                    case 'week':
                        this.filterTasks('week');
                        break;
                    case 'all-tasks':
                        this.filterTasks('all-tasks');
                        break;
                    case 'done':
                        this.filterTasks('done');
                        break;
                    default:
                        this.filterTasks('all-tasks');
                }
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
            "task-0": this.createTask('Gym', 'Back day', 'High', 'October 5th, 2024', '4 back exercises, 2 biceps exercises. No cardio today.', (id) => this.handleTaskDeletion(id),
        (id, tag, title, priority, dueDate, details) => this.handleTaskModification(id, tag, title, priority, dueDate, details)),
        };
        this.updateTaskList();

        // MODAL: TASKS
        this.taskModal = new TaskModal();
        this.newTaskBtn = document.getElementById("new-task-btn");
        this.newTaskBtn.addEventListener("click", () => {
            this.newTaskBtn.blur();

            // Callback function to retrieve new task and update task list
            this.taskModal.open((tag, title, priority, dueDate, details) => {
                const newTask = new Task(tag, title, priority, dueDate, details, (id) => this.handleTaskDeletion(id), 
                (id, tag, title, priority, dueDate, details) => this.handleTaskModification(id, tag, title, priority, dueDate, details));
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

    handleTaskModification(id, tag, title, priority, dueDate, details) {
        const task = this.tasks[id];
        if (task) {
            this.taskModal.open((newTag, newTitle, newPriority, newDueDate, newDetails) => {
                task.renderEdit(newTitle, newTag, newPriority, newDueDate, newDetails);  
            }, this.tags, tag, title, priority, dueDate, details);
        } else {
            console.log(`${id} task not found.`);
        }
    }

    // Removes all children of an element
    removeChildren(myElement) {
        while (myElement.firstChild) {
            myElement.removeChild(myElement.firstChild);
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

    createTask(tag, title, priority, deadline, details, onDelete, onEdit) {
        return new Task(tag, title, priority, deadline, details, onDelete, onEdit);
    }

    filterTasks() {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7); // Set the date to 7 days from today
    
        Object.values(this.tasks).forEach(task => {
            const taskDeadline = task.convertDeadlineToDate(); // Convert the string to a Date object
    
            if (this.activeTab === this.tabs.today) {
                const isToday = taskDeadline.toDateString() === today.toDateString();
                task.setHide(!isToday); // Hide tasks that aren't due today
            }
    
            if (this.activeTab === this.tabs.week) {
                const isThisWeek = taskDeadline >= today && taskDeadline <= weekFromNow;
                task.setHide(!isThisWeek); // Hide tasks that aren't due this week
            }
    
            if (this.activeTab === this.tabs.allTasks) {
                task.setHide(false); // Show all tasks
            }
    
            if (this.activeTab === this.tabs.done) {
                task.setHide(!task.isChecked); // Show only completed tasks
            }
        });

        
    }

    

}