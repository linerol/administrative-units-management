import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface District {
    name: string;
    description: string;
    communeName: string;
}

@customElement('district-page')
export class AppSettings extends LitElement {
    @property({ type: Array }) districts: District[] = [];
    @property({ type: Object }) districtToUpdate: District | null = null;

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

    div.district {
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

    div.district:hover {
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
        this.districts = await this.getDistricts();
    }

    async getDistricts() {
        const response = await fetch('http://localhost:3000/district');
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
            communeName: data.get('communeName') as string
        });
        let response;
        if (this.districtToUpdate) {
            response = await fetch(`http://localhost:3000/district/${this.districtToUpdate.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
        } else {
            response = await fetch('http://localhost:3000/district', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
        }
        if (response.ok) {
            this.closeForm();
            this.districts = await this.getDistricts();
        } else {
            console.error('Failed to create or update district');
        }
    }

    async deleteDistrict(name: string) {
        const response = await fetch(`http://localhost:3000/district/${name}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            this.districts = await this.getDistricts();
        } else {
            console.error('Failed to delete district');
        }
    }

    async updatedistrict(district: District) {
        this.districtToUpdate = district;
        const form = this.shadowRoot!.getElementById('createForm') as HTMLFormElement;
        (form.elements.namedItem('name') as HTMLInputElement).value = district.name as string;
        (form.elements.namedItem('description') as HTMLInputElement).value = district.description;
        (form.elements.namedItem('communeName') as HTMLInputElement).value = district.communeName;
            this.openForm();
    }
    render() {
        return html`
      <app-header ?enableBack="${true}"></app-header>

      <div class="header">
        <div class="title-container"> <h1 class="title"> All districts </h1> </div>
        <div class="button-container"> <button @click="${this.openForm}" class="create-button">Create New</button> </div>
      </div>
      <main>
        ${this.districts.map(
            (district) => html`
            <div class="district">
            <h2>${district.name}</h2>
            <p>${district.description}</p>
            <p>Name of Commune : ${district.communeName}</p>
            <button @click="${() => this.deleteDistrict(district.name)}" class="delete-button">Delete</button>

            <button @click="${() => this.updatedistrict(district)}" class="update-button">Update</button>

            </div>
          `
        )}


        <form id="createForm" class="hidden" @submit="${this.submitForm}">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>

            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description"><br>

            <label for="communeName">Name of Commune:</label><br>
            <input type="text" id="communeName" name="communeName"><br>

            <input type="submit" value="Submit">
        </form>

      </main>
    `;
    }
}
