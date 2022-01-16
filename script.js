//  PROGRAMAÇÃO ORIENTADA A OBJETOS //
const Modal = {
    toggle() {
        document
            .querySelector('.modal-overlay')
            .classList.toggle('hide')
    }
}

const DOM = {
    shortcutContainer: document.querySelector('.container'),

    addShortcut(shortcut, index) {
        const sc = document.createElement('a')
        sc.innerHTML = DOM.innerHTMLShortcut(shortcut, index)
        sc.dataset.index = index

        DOM.shortcutContainer.appendChild(sc)
    },

    innerHTMLShortcut(shortcut, index) {
        const html = `
            <a href="#" class="add_btn" onclick="Modal.toggle()">
                <i class="fas fa-plus"></i>
            </a>
         `
        return html
    }

    // addTransaction (transaction, index) {
    //     const tr = document.createElement('tr')
    //     tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    //     tr.dataset.index = index
    //     DOM.transactionsContainer.appendChild(tr)
    // },
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

        if (name.trim() === " " ||
            link.trim() === " ") {
            throw new Error("Preencha todos os campos.")
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
            Form.clearFields()
            Form.addShortcut()
            Modal.toggle()
        } catch (error) {
            alert(error.message)
        }
    }
}