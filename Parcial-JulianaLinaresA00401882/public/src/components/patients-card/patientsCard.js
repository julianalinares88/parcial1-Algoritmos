class PatientCard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }
   
    static get observedAttributes(){
        return ['name', 'especie', 'fecha', 'state']
    }
   
    connectedCallback(){
        this.render()
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }
    togglePatient(){
        this.state = !this.state
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = 
        
        `
        <link rel="stylesheet" href="./src/components/patient-card/patientCard.css">
        <li class=${this.state ? "completed" : "patient"}>
            <h3>${this.name}</h3>
            <p>${this.especie}</p>
            <p>${this.fecha}</p>
            <p>${!this.state ? "Pendiente" : "Atendido"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="patient-checkbox">
        </li>
        `

        
        
        const checkbox = this.shadowRoot.querySelector('.patient-checkbox')
        checkbox.addEventListener('change', () => this.togglePatient())
    }
}

customElements.define('patient-card', PatientCard)
export default PatientCard