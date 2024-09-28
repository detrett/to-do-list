export class Task {
    constructor(id, tag, title, priority, deadline, details, isChecked = false) {
        this.id = id;
        this.tag = tag;
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
        this.details = details;
        this.isChecked = isChecked;
    }

    toggleCheck() {
        this.isChecked = !this.isChecked;
    }

    editTask(newTitle, newPriority, newDeadline, newDetails) {
        this.title = newTitle;
        this.priority = newPriority;
        this.deadline = newDeadline;
        this.details = newDetails;
    }

    deleteTask() {

    }

    renderTask() {
    return `
      <li class="task" id="${this.id}">
        <ul>
          <li>
            <label class="task-label">
              <input type="checkbox" class="task-checkbox" id="${this.id}" ${this.isChecked ? 'checked' : ''}>
              <span class="checkmark"></span>
            </label>
          </li>
          <li class="tag">${this.tag}</li>
          <li class="title">${this.title}</li>
          <li class="priority ${this.priority.toLowerCase()}">${this.priority} &nbsp;<span class="icon"></span></li>
          <li class="deadline">${this.deadline}</li>
          <li class="details">
            <button title="Toggle information" class="collapsible" id="collapsible-${this.id}">
              <span class="icon"></span>
            </button>
          </li>
          <li class="edit"><button title="Edit task"><span class="icon icon-edit"></span></button></li>
          <li class="delete"><button title="Delete task"><span class="icon icon-trash"></span></button></li>
        </ul>
        <div class="details-content" id="details-content-${this.id}">${this.details}</div>
      </li>
      `;
    }
}