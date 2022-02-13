//  PROGRAMAÇÃO ORIENTADA A OBJETOS //
const Modal = {
    toggle() {
        document
            .querySelector('.modal-overlay')
            .classList.toggle('hide')
    }
}
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem('shortcuts')) || []

    },

    set(shortcuts) {
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts))
    }
}

const Shortcut = {
    all: Storage.get(),

    add(shortcut) {
        Shortcut.all.push(shortcut)

        App.reload()
    },

    remove(index) {
        Shortcut.all.splice(index, 1)

        App.reload()
    }
}


const DOM = {
    shortcutDocker: document.querySelector('.container'),

    addShortcut(shortcut, index) {
        const sc = document.createElement('div');
        sc.setAttribute('class', 'shortcut_container')
        sc.innerHTML = DOM.innerHTML(shortcut, index)
        sc.dataset.index = index;
        DOM.shortcutDocker.appendChild(sc)
    },

    async getFetch() {
        const fetch = await fetch(`http://favicongrabber.com/api/grab/${Form.link.value}`)
        .then(res => res.json())
        .then(() => {
            fetch = res.icons[3].src
            console.log(fetch)
        }) 
        
        return fetch
    },

    innerHTML(shortcut, index) {
        const html = `
            <a 
            href="https://${shortcut.link}" 
            class="add_btn" 
            target="_blank"
            style="background: url("${DOM.getFetch()}") center;"
            >
            ${shortcut.name} 
            
            </a> 
            <a class="delete_btn"> 
                <img onclick="Shortcut.remove(${index})" src="./assets/minus.svg">
            </a>
        `
        return html
    },

    clearShortcuts() {
        DOM.shortcutDocker.innerHTML = ""
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
            // Form.getFetch()
            Form.validateFields()
            const shortcut = Form.formatValues()
            Shortcut.add(shortcut)
            Form.clearFields()
            Modal.toggle()
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Shortcut.all.forEach(DOM.addShortcut)

        Storage.set(Shortcut.all)
    },

    reload() {
        DOM.clearShortcuts()
        App.init()
    }
}

App.init()