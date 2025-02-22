import {LitElement, html} from  'lit-element';

export class MdcComponent extends LitElement { 
    static get properties() {
        return {
            title                         : {type: String},
            shceduleBank                  : {type: Object},
            availableOwners               : {type: Array},
            nameProject                   : {type: String},
            selectedLine                  : {type: String},
            selectedOwner                 : {type: String},
            countPerson                   : { type: Number },
            timeMonth                     : { type: Number },
            totalHours                    : { type: Number },
            fieldsPerson                  : { type: Array },
            persons                       : { type: Array },
            managers                      : { type: Array },
            participationManagerPercent   : {type: Number}, 
            fieldsCoach                   : { type: Array },
            coachs                        : { type: Array },
            tecnologies                   : { type: Array },
            tecnologiesSelected           : { type: Array },  

            errors                        : { type: Object }
        }
    }

    constructor() {
        super();
            this.title           = 'MDC';
            this.nameProject     = '';
            this.selectedLine    = '';
            this.selectedOwner   = '';
            this.availableOwners = [],
            this.shceduleBank    = {
                'Data':['Jorge Pinto', 'Irene'],
                'Prestamos':['Camilo Cabra'],
            }

            this.fieldsPersons = [{ key:0, id: 0, namePerson: '', participationPersonPercent:0 }]; 
            this.persons = [{ id: 1, name: 'Luis', rate:50000, feeDefault:30000,  expertise: "Back"},{ id: 2, name: 'Gerardo', rate:52000, feeDefault:20000, expertise: "Host" }];  
            this.fieldsCoachs = [{ key:0, id: 0, namePerson: ''}]; 
            this.coachs = [{ id: 1, name: 'Danel', rate:50000, feeDefault:30000 },{ id: 2, name: 'Carlos', rate:52000, feeDefault:20000 }]; 
            this.managers = [{ id: 1, name: 'Sharin', rate:50000 },{ id: 2, name: 'Carlos', rate:52000 }]; 
            this.participationManagerPercent = 0,
            this.tecnologies = ['Back', 'Host', 'Front']; 
            this.tecnologiesSelected = [];

            this.timeMonth  = 0;
            this.totalHours = 0;

            this.errors          = {};
    }


    handleLineChange(event) {
        this.selectedLine = event.target.value;
        this.availableOwners = this.shceduleBank[this.selectedLine] || [];
        this.selectedOwner = ''; 
    }

    handleOwnerChange(event) {
        this.selectedOwner = event.target.value;
    }

    onSave(event) {
        event.preventDefault();
        console.log(this.selectedOwner);
    }    
    
    removeField(key) {
        this.fieldsPerson = this.fieldsPerson.filter(field => field.key !== key);
    }

    toggleSelection(event) {
        const value = event.target.value;
        if (event.target.checked) {
          this.tecnologiesSelected = [...this.tecnologiesSelected, value]; // Agrega el valor seleccionado
        } else {
          this.tecnologiesSelected = this.tecnologiesSelected.filter(item => item !== value); // Lo elimina si se desmarca
        }
        console.log(this.tecnologiesSelected);
    }


    render () {
        return html`
            <h1>MDC</h1>
            
            
                <label>Nombre de la Iniciativa:</label>
                <input type="text" name="nameProject" .value="${this.nameProject}" @input="${this.handleInput}">
                ${this.errors.nameProject ? html`<span class="error">${this.errors.nameProject}</span>` : ''}
                
                <label>Nombre de la Mesa:</label>
                <select id="line" @change="${this.handleLineChange}">
                    <option value="">Seleccione una mesa</option>
                    ${Object.keys(this.shceduleBank).map(line => html`
                    <option value="${line}" ?selected="${this.selectedLine === line}">
                        ${line}
                    </option>
                    `)}
                </select>


                <label>Nombre de la Owner del Proyecto:</label>
                <select id="owner" ?disabled="${this.availableOwners.length === 0}" @change="${this.handleOwnerChange}">
                    <option value="">Seleccione una Owner</option>
                    ${this.availableOwners.map(owner => html`
                    <option value="${owner}" ?selected="${this.selectedOwner === owner}">
                        ${owner}
                    </option>
                    `)}
                </select>
                ${this.errors.selectedOwner ? html`<span class="error">${this.errors.selectedOwner}</span>` : ''}

               
                <div>
                    Managers: 
                    

                   
                    <select id="manager">
                        <option value="">Seleccione una Persona</option>
                        ${this.managers.map(manager => html`
                        <option value="${manager.id}">
                            ${manager.name}
                        </option>
                        `)}
                    </select>
                   
                    <input type="text" placeholder="% participation" name="participationManagerPercent" value="${this.participationManagerPercent}" @input="${this.handleInput}">                       
                 
                </div>
                
                ${this.tecnologies.map(technology => html`
                    <label>
                    <input type="checkbox" value="${technology}" @change="${this.toggleSelection}">
                    ${technology}
                    </label>
                `)}

                <div class="time">
                    <label>Tiempo en meses:</label>
                    <input type="text" name="timeMonth" value="${this.timeMonth}" @input="${this.handleInput}">
                    <label>Total de horas:</label>
                    <input type="text" name="totalHours" value="${this.totalHours}" @input="${this.handleInput}">          
                    

                </div>

                <div>
                    Coach:  <button @click=${this._onIncrement}>+</button>[${this.fieldsCoachs.length}]
                    

                    ${this.fieldsCoachs.map(fieldCoach => html`
                        <div>
                            <input type="button" class="remove-btn" @click="${() => this.removeField(fieldCoach.key)}">-</button>
                            <select id="coach">
                                <option value="">Seleccione una Persona</option>
                                ${this.coachs.map(coach => html`
                                <option value="${coach.id}">
                                    ${coach.name}
                                </option>
                                `)}
                            </select>
                            <input type="text" placeholder="% participation" .participationPersonPercent="${fieldCoach.participationPersonPercent}"
                                @input="${(e) => this.handleInput(e, field.key)}">                            
                        </div>
                        
                    `)}

                </div>


                <div>
                    Persons:  <button @click=${this._onIncrement}>+</button>[${this.fieldsPersons.length}]
                    

                    ${this.fieldsPersons.map(fieldPerson => html`
                        <div>
                            <input type="button" class="remove-btn" @click="${() => this.removeField(fieldPerson.key)}">-</button>
                            <select id="person">
                                <option value="">Seleccione una Persona</option>
                                ${this.persons
                                .filter(item => item.expertise.includes(this.tecnologiesSelected))
                                .map(person => html`
                                <option value="${person.id}">
                                    ${person.name}
                                </option>
                                `)}
                            </select>
                            <input type="text" placeholder="% participation" .participationPersonPercent="${fieldPerson.participationPersonPercent}"
                                @input="${(e) => this.handleInput(e, field.key)}">                            
                        </div>
                        
                    `)}

                </div>
           


                
           

                <button @click="${this.onSave}">Guardar</button>
           
        `;
    }

    _onIncrement() {
        this.countPerson += 1;
        const newKey = this.fieldsPersons.length; // Nuevo ID basado en la cantidad de campos
        this.fieldsPersons = [...this.fieldsPersons, { key:newKey, id: 0, namePerson: '', participationPersonPercent:0  }];
    }

}

customElements.define ('mdc-component', MdcComponent)