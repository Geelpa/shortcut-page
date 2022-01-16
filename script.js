//  PROGRAMAÇÃO ORIENTADA A OBJETOS //
const Modal = {
    toggle() {
        document
            .querySelector('.modal-overlay')
            .classList.toggle('hide')
    }
}

const DOM = {
    // innerHTMLTransaction(transaction, index) {
    // Verifica se é GASTO ou GANHO 
    // Se VALOR é menor que 0, então NEGATIVO (expense);
    // Se VALOR é maior que 0, então POSITIVO (income);
    // const CssClass = transaction.amount > 0 ? "income" : "expense"

    // const amount = Utils.formatCurrency(transaction.amount)
    // const html = `
    //     <td class="description">${transaction.description}</td>
    //     <td class="${CssClass}">${amount}</td>
    //     <td class="date">${transaction.date}</td>
    //     <td>
    //         <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" srcset="">
    //     </td>
    //  `
    // return html
    // },

    createSC() {
        const sc = document.querySelector('.container');
        sc.innerHTML = DOM.innerHTML()
    },


    innerHTML() {
        const html = `
            <a href=" ${Form.link.value}" class="add_btn">${Form.name.value} </a> 

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

        if (name.trim() === " " ||
            link.trim() === " ") {
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