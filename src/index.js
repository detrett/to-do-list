import "./styles.css";
import { ScreenController } from "./screen";

const myScreen = new ScreenController();

window.onload = () => {
    myScreen.tags = myScreen.loadTags(); // Load tags from localStorage
    myScreen.tasks = myScreen.loadTasks(); // Load tasks from localStorage
    myScreen.updateTagList(); // Render tags
    myScreen.updateTaskList();  // Render tasks
};
