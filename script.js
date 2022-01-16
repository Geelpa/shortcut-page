//  PROGRAMAÇÃO ORIENTADA A OBJETOS //
const Modal = {
    toggle() {
        document
            .querySelector('.modal-overlay')
            .classList.toggle('hide')
    }
}

const DOM = {
    shortcutDocker: document.querySelector('.container'),

    createSC(shortcut, index) {
        const sc = document.createElement('div');
        sc.innerHTML = DOM.innerHTML(shortcut, index)
        sc.dataset.index = index;

        DOM.shortcutDocker.appendChild(sc)
    },


    innerHTML() {
        const html = `
            <a 
            href="https://${Form.link.value}" 
            class="add_btn" 
            target="_blank">
            ${Form.name.value} 
            </a> 
        `
        return html
    }
}

const Form = {
    name: document.querySelector('input#name'),
    link: document.querySelector('input#link'),

    getValues() {
        return {
            name: Form.name.value,
            link: Form.link.value,
        }
    },

    validateFields() {
        const { name, link } = Form.getValues()

        if (name.trim() === "" ||
            link.trim() === "") {
            throw new Error("Preencha todos os campos.")
        }
    },

    formatValues() {
        let { name, link } = Form.getValues()

        return {
            name,
            link
        }
    },

    clearFields() {
        Form.name.value = ""
        Form.link.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            Form.formatValues()
            DOM.createSC()
            Form.clearFields()
            Modal.toggle()

        } catch (error) {
            alert(error.message)
        }
    }
}