export class Tab {
    constructor(buttonElement) {
        this.buttonElement = buttonElement;
        this.isActive = false;
    }

    setActive(isActive) {
        this.isActive = isActive;
        this.buttonElement.classList.toggle("active", this.isActive);
    }

    isActiveTab() {
        return this.isActive;
    }
}
