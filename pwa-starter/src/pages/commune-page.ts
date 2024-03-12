import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Commune {
    name: string;
    description: string;
    departmentName: string;
    nbDistrict: string;
}

@customElement('commune-page')
export class AppSettings extends LitElement {
    @property({ type: Array }) communes: Commune[] = [];
    @property({ type: Object }) communeToUpdate: Commune | null = null;

    static styles = css`
    div.header {
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }


    h1.title-container {
        flex-grow: 1;
        display: flex;
        justify-content: center;

    }

    h1.title {
        text-align: center;
        // flex-grow: 1;
    }

    button.create-button {
        align-self: center;
        background-color: white;
        // margin-right: 20%;
    }

    button.button-container {
        display: flex;
        justify-content: flex-end;
        width: 20%; /* ajustez cette valeur pour déplacer le bouton vers la gauche */
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
        margin-top: 5%;
    }

    div.commune {
        position: relative;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 1em;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 80%;
    }

    div.commune:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    button.delete-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: red;
    }

    button.update-button {
        position: absolute;
        bottom: 10px;
        right: 100px;
        background-color: blue;
    }

    .hidden {
        display: none;
      }

  `;

    async connectedCallback() {
        super.connectedCallback();
        this.communes = await this.getCommunes();
    }

    async getCommunes() {
        const response = await fetch('http://localhost:3000/commune');
        const data = await response.json();
        return data;
    }

    openForm() {
        this.shadowRoot!.getElementById('createForm')!.classList.remove('hidden');
    }

    closeForm() {
        this.shadowRoot!.getElementById('createForm')!.classList.add('hidden');
    }

    async submitForm(event: Event) {
        event.preventDefault();
        const form = this.shadowRoot!.getElementById('createForm') as HTMLFormElement;
        const data = new FormData(form);
        const json = JSON.stringify({
            name: data.get('name'),
            description: data.get('description'),
            departmentName: data.get('departmentName'),
            nbDistrict: parseInt(data.get('nbDistrict') as string, 10)
        });
        let response;
        if (this.communeToUpdate) {
            response = await fetch(`http://localhost:3000/commune/${this.communeToUpdate.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
        } else {
            response = await fetch('http://localhost:3000/commune', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
        }
        if (response.ok) {
            this.closeForm();
            this.communes = await this.getCommunes();
        } else {
            console.error('Failed to create or update commune');
        }
    }

    async deleteCommune(name: string) {
        const response = await fetch(`http://localhost:3000/commune/${name}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            this.communes = await this.getCommunes();
        } else {
            console.error('Failed to delete commune');
        }
    }

    async updatecommune(commune: Commune) {
        this.communeToUpdate = commune;
        const form = this.shadowRoot!.getElementById('createForm') as HTMLFormElement;
        (form.elements.namedItem('name') as HTMLInputElement).value = commune.name as string;
        (form.elements.namedItem('description') as HTMLInputElement).value = commune.description;
        (form.elements.namedItem('departmentName') as HTMLInputElement).value = commune.departmentName;
        (form.elements.namedItem('nbDistrict') as HTMLInputElement).value = commune.nbDistrict;
            this.openForm();
    }

    navigateToDepartment(departmentName: string) {
}


    render() {
        return html`
      <app-header ?enableBack="${true}"></app-header>

      <div class="header">
        <div class="title-container"> <h1 class="title"> All communes </h1> </div>
        <div class="button-container"> <button @click="${this.openForm}" class="create-button">Create New</button> </div>
      </div>
      <main>
        ${this.communes.map(
            (commune) => html`
            <div class="commune">
            <h2>${commune.name}</h2>
            <p>${commune.description}</p>
            <p>Department Name: ${commune.departmentName}</p>
            <p>Nombre de communes : ${commune.nbDistrict}</p>

            <button @click="${() => this.deleteCommune(commune.name)}" class="delete-button">Delete</button>

            <button @click="${() => this.updatecommune(commune)}" class="update-button">Update</button>

            </div>
          `
        )}


        <form id="createForm" class="hidden" @submit="${this.submitForm}">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description"><br>

            <label for="departmentName">Department Name:</label><br>
            <input type="text" id="departmentName" name="departmentName"><br>

            <label for="nbDistrict">Number of District:</label><br>
            <input type="number" id="nbDistrict" name="nbDistrict" min="1" step="1"><br>


            <input type="submit" value="Submit">
        </form>

      </main>
    `;
    }
}
