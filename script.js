

//  PROGRAMAÇÃO ORIENTADA A OBJETOS //
const Modal = {
    toggle(){
        document
        .querySelector('.modal-overlay')
        .classList.toggle('hide')
    }
}


const Form = {
    name: document.querySelector('input#name'),
    link: document.querySelector('input#link'),

    getValues() {
        return {
            name: Form.name.value,
            link: Form.name.link,
        }
    },

    validateFields() {
        const { name, link } = Form.values()

        if (name.trim() === "" ||
            link.trim() === "") {
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
            Modal.close()
        } catch (error) {
            alert(error.message)
        }
    }
}