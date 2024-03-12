import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Department {
    name: string;
    description: string;
    nbCommune: string;
}

@customElement('department-page')
export class AppSettings extends LitElement {
    @property({ type: Array }) departments: Department[] = [];
    @property({ type: Object }) departmentToUpdate: Department | null = null;


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

    div.department {
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

    div.department:hover {
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
        this.departments = await this.getDepartments();
    }

    async getDepartments() {
        const response = await fetch('http://localhost:3000/department');
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
            nbCommune: parseInt(data.get('nbCommune') as string, 10)
        });
        let response;
        if (this.departmentToUpdate) {
            response = await fetch(`http://localhost:3000/department/${this.departmentToUpdate.name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
        } else {
            response = await fetch('http://localhost:3000/department', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
        }
        if (response.ok) {
            this.closeForm();
            this.departments = await this.getDepartments();
        } else {
            console.error('Failed to create or update department');
        }
    }

    async deleteDepartment(name: string) {
        const response = await fetch(`http://localhost:3000/department/${name}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            this.departments = await this.getDepartments();
        } else {
            console.error('Failed to delete department');
        }
    }

    async updateDepartment(department: Department) {
        this.departmentToUpdate = department;
        const form = this.shadowRoot!.getElementById('createForm') as HTMLFormElement;
        (form.elements.namedItem('name') as HTMLInputElement).value = department.name as string;
        (form.elements.namedItem('description') as HTMLInputElement).value = department.description;
        (form.elements.namedItem('nbCommune') as HTMLInputElement).value = department.nbCommune;
            this.openForm();
    }

    // navigateToDepartment(departmentId: string) {
    //     router.navigate(`/department-page/${departmentId}`);
    // }

    render() {
        return html`
      <app-header ?enableBack="${true}"></app-header>

      <div class="header">
        <div class="title-container"> <h1 class="title"> All Departments </h1> </div>
        <div class="button-container"> <button @click="${this.openForm}" class="create-button">Create New</button> </div>
      </div>
      <main>
        ${this.departments.map(
            (department) => html`
            <div class="department">
            <h2>${department.name}</h2>
            <p>${department.description}</p>
            <p>Nombre de communes : ${department.nbCommune}</p>
            <button @click="${() => this.deleteDepartment(department.name)}" class="delete-button">Delete</button>

            <button @click="${() => this.updateDepartment(department)}" class="update-button">Update</button>

            </div>
          `
        )}


        <form id="createForm" class="hidden" @submit="${this.submitForm}">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description"><br>
            <label for="nbCommune">Number of Communes:</label><br>
            <input type="number" id="nbCommune" name="nbCommune" min="1" step="1"><br>
            <input type="submit" value="Submit">
        </form>

      </main>
    `;
    }
}
