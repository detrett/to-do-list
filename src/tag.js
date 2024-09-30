export class Tag {
    constructor(aTitle) {
        this.title = aTitle;
        this.isSelected = false;
        this.buttonElement = this.createTagButton(aTitle);
    }

    // Method to create the tag button element
    createTagButton(title) {
        // Create the button element
        const listElement = document.createElement("li");
        const button = document.createElement("button");
        button.id = this.parseTitleToId(title);
        button.innerHTML = `<span class="icon icon-tag"></span>${title}`;

        // Attach click event listener to toggle selection
        button.addEventListener("click", () => {
            this.toggleSelected();
            button.blur();
        });

        listElement.appendChild(button);
        return listElement;
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