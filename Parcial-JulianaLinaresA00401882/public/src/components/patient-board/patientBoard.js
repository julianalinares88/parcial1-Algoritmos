import '../patients-card/patientsCard.js'

class PatientBoard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        this.patient = []
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot.querySelector('.patient-form')
        form.addEventListener("submit", (e)=>{
        
            e.preventDefault()
        
        
            const name = this.shadowRoot.querySelector('.input-name').value
            const especie = this.shadowRoot.querySelector('.input-especie').value
            
            
            this.patient.push({name, especie,  state: false})

            
            this.addPatient({name, especie, state: false})
            
            
            form.reset()
        })
    }

    render(){ 
        this.shadowRoot.innerHTML =
       
        `
        <h2>Añadir Paciente</h2>
        <form class="patient-form">
            <input type="text" placeholder="Nombre" class="input-name" required>
            <input type="text" placeholder="Especie" class="input-especie" required>
            <input type="date" name="" id=""class="input-fecha" required>
            <button>Añadir</button>
        </form>
        <ul class="patient-container">
        </ul>
        `

        this.patient.forEach(patient => this.addPatient(patient))
    }

    addPatient({name, especie, state}){
        
        const patientContainer = this.shadowRoot.querySelector('.patient-container')
        patientContainer.innerHTML += `
        <patient-card 
            name="${name}" 
            especie="${especie}" 
            state="${state}"
        ></patient-card>
        `

    }
}

customElements.define('patient-board', PatientBoard)
export default PatientBoard