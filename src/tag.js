export class Tag {
    static idCounter = 0;

    constructor(aTitle, onDelete) {
        this.id = "task-" + Tag.idCounter++;
        this.title = aTitle;
        this.isSelected = false;
        this.buttonElement = this.createTagButton(aTitle);
        this.onDelete = onDelete;
    }

    info() {
        return `Tag title: ${this.title}`
    }

    get tagListElement() {
        return document.getElementById("tag-list");
    }

    // Method to create the tag button element
    createTagButton(title) {
        // Create the list element
        const listElement = document.createElement("li");
        listElement.classList.add("tag-element");
        listElement.dataset.taskId = this.id;
    
        // Create the first button for the tag
        const button = document.createElement("button");
        button.id = this.parseTitleToId(title);
        
        // Create and append the icon span for the tag button
        const tagIcon = document.createElement("span");
        tagIcon.classList.add("icon", "icon-tag");
        button.appendChild(tagIcon);
        
        // Append the title text to the tag button
        button.appendChild(document.createTextNode(title));
    
        // Attach click event listener to toggle selection
        button.addEventListener("click", () => {
            this.toggleSelected();
            button.blur();
        });
    
        // Create the second button for the trash icon
        const deleteButton = document.createElement("button");
    
        // Create and append the icon span for the delete button
        const trashIcon = document.createElement("span");
        trashIcon.classList.add("icon", "icon-trash");
        deleteButton.appendChild(trashIcon);
    
        deleteButton.addEventListener("click", () => {
            deleteButton.blur();
            this.deleteTag();
        });
    
        // Append both buttons to the list element
        listElement.appendChild(button);
        listElement.appendChild(deleteButton);
        
        return listElement;
    }

    deleteTag() {
        this.buttonElement.remove();
        this.onDelete(this.title);
    }


    parseTitleToId(title) {
        return `tag-${title.toLowerCase().replace(/\s+/g, '-')}`;
        // e.g., "Weight Loss" -> "tag-weight-loss"
    }

    toggleSelected() {
        this.isSelected = !this.isSelected;
        this.buttonElement.classList.toggle("selected", this.isSelected);
    }

    setSelected(isSelected) {
        this.isSelected = isSelected;
        this.buttonElement.classList.toggle("selected", this.isSelected);
    }

    isSelectedTag() {
        return this.isSelected;
    }
}