export const taskAddClass = {
    options: {
        showModalButtonClass: ".js-show-modal-button",
        modalClass: ".js-modal"
    },
    showModalButton: null,
    modal: null,

    init: function (options) {
        if (options) {
            this.options = options
        }

        const parameters = this.options;

        console.log(parameters);

        this.showModalButton = document.querySelector(parameters.showModalButtonClass);
        this.modal = document.querySelector(parameters.modalClass);

        console.log(this.showModalButton);
        console.log(this.modal);

        this.events();
    },

    events: function () {

    }
}
