export class Tab {
    constructor(aButtonElement) {
        this.buttonElement = aButtonElement;
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
