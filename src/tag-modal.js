import { Logger } from "./logger";

export class TagModal {
    constructor() {
        this.logger = new Logger();
        this.addCloseEventListener();
    }

    get tagModal() {
        return document.getElementById("tag-modal");
    }

    get tagInput() {
        return document.getElementById("new-tag-input");
    }

    set tagInput(newValue) {
        this.tagInput.value = newValue;
    }

    open = (callback) => {
        this.tagModal.style.display = "block";

        // Attach event listener only when the modal is opened
        const confirmButton = document.getElementById("confirm-add-tag");
        const confirmListener = () => {
            const newTagName = this.tagInput.value;
            this.logger.logInfo(newTagName + " parsed", "orange");

            this.tagInput = ""; // Clear input
            this.close(); // Close the modal

            // Only execute the callback if it's a valid function and the input isn't empty
            if (newTagName && typeof callback === "function") {
                callback(newTagName); // Pass the new tag name back to the ScreenController
            }

            // Remove the listener to prevent multiple triggers
            confirmButton.removeEventListener("click", confirmListener);
        };

        // Attach listener to "Confirm Add Tag" button
        confirmButton.addEventListener("click", confirmListener);
    }

    close = () => {
        this.tagModal.style.display = "none";
    }

    addCloseEventListener = () => {
        this.tagModal.addEventListener("click", (e) => {
            if (e.target.id === "tag-close-button" || e.target.id === "cancel-add-tag" || e.target.id === "tag-modal") {
                this.close();
            }
        });
    }
}

