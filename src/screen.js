import { Tab } from "./tab";

export class ScreenController {
    constructor() {
        this.tabs = {
            today: new Tab(document.getElementById("today")),
            week: new Tab(document.getElementById("week")),
            allTasks: new Tab(document.getElementById("all-tasks")),
            done: new Tab(document.getElementById("done")),
        };

        this.activeTab = null; // Default to 'Today' tab
        this.setActiveTab(this.tabs.today); // Initialize with default active tab
        
        // Add event listeners for tab buttons
        Object.values(this.tabs).forEach((tab) => {
            tab.buttonElement.addEventListener("click", () => this.setActiveTab(tab));
        });
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
}