import { Tab } from "./tab";
import { Task } from "./task";

export class ScreenController {
    constructor() {
        this.tabs = {
            today: new Tab(document.getElementById("today")),
            week: new Tab(document.getElementById("week")),
            allTasks: new Tab(document.getElementById("all-tasks")),
            done: new Tab(document.getElementById("done")),
        };

        this.newTaskBtn = document.getElementById("new-task-btn");

        this.taskList = document.getElementById('task-list');

        this.activeTab = null; // Default to 'Today' tab
        this.setActiveTab(this.tabs.today); // Initialize with default active tab

        // Add event listeners for tab buttons
        Object.values(this.tabs).forEach((tab) => {
            tab.buttonElement.addEventListener("click", () => this.setActiveTab(tab));
        });

        // Add event listener to new task button
        this.newTaskBtn.addEventListener("click", () => { 
            const taskElement = this.createTask('Gym', 'Chest day', 'High', 'Today', 'Hello there');
            this.taskList.appendChild(taskElement);

        })
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
        const task = new Task(tag, title, priority, deadline, details);
        return task.createTaskElement();
    }
}