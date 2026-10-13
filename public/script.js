
// All projects live in this array.
// localStorage keeps them after a page refresh.
const STORAGE_KEY = 'workshop-projects-v1';
const projects = [];

let nextId = 1;
let editingId = null;

const form = document.querySelector('#project-form');
const nameInput = document.querySelector('#name');
const statusInput = document.querySelector('#status');
const saveButton = document.querySelector('#save-button');
const cancelButton = document.querySelector('#cancel-button');
const projectList = document.querySelector('#project-list');
const emptyState = document.querySelector('#empty-state');
const message = document.querySelector('#message');

const validStatuses = [
    'Planned',
    'In Progress',
    'Completed'
];

// Check that stored data has the expected structure.
function isValidProjectArray(data) {
    if (!Array.isArray(data)) {
        return false;
    }

    const ids = new Set();

    return data.every(project => {
        if (
            project === null ||
            typeof project !== 'object' ||
            !Number.isSafeInteger(project.id) ||
            project.id < 1 ||
            typeof project.name !== 'string' ||
            project.name.trim() === '' ||
            project.name.length > 80 ||
            !validStatuses.includes(project.status) ||
            ids.has(project.id)
        ) {
            return false;
        }

        ids.add(project.id);
        return true;
    });
}

// Load saved projects when the page starts.
function loadProjects() {
    let storedData;

    try {
        storedData = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        message.textContent =
            'Could not read saved projects from browser storage. ' +
            'Changes may not be saved.';
        return;
    }

    // A missing key means this is a new collection.
    if (storedData === null) {
        return;
    }

    try {
        const parsedData = JSON.parse(storedData);

        if (!isValidProjectArray(parsedData)) {
            message.textContent =
                'Saved project data is invalid. ' +
                'It has not been overwritten automatically.';
            return;
        }

        projects.push(...parsedData);

        // Continue assigning IDs without reusing existing ones.
        nextId = projects.reduce(
            (highest, project) =>
                Math.max(highest, project.id + 1),
            1
        );

        message.textContent = '';
    } catch (error) {
        message.textContent =
            'Saved project data could not be read. ' +
            'It has not been overwritten automatically.';
    }
}

// Convert the collection to JSON text and save it.
function saveProjects() {
    try {
        const jsonText = JSON.stringify(projects);
        localStorage.setItem(STORAGE_KEY, jsonText);
        return true;
    } catch (error) {
        return false;
    }
}

// Return the form to Add mode.
function resetForm() {
    editingId = null;
    form.reset();
    saveButton.textContent = 'Save Project';
    cancelButton.hidden = true;
}

// Display the projects array in the page.
function render() {
    projectList.textContent = '';

    projects.forEach(project => {
        const item = document.createElement('li');
        item.dataset.id = project.id;

        const details = document.createElement('span');
        details.textContent = `${project.name} - ${project.status}`;

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';
        editButton.dataset.action = 'edit';
        editButton.dataset.id = project.id;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.action = 'delete';
        deleteButton.dataset.id = project.id;

        item.appendChild(details);
        item.appendChild(document.createTextNode(' '));
        item.appendChild(editButton);
        item.appendChild(document.createTextNode(' '));
        item.appendChild(deleteButton);

        projectList.appendChild(item);
    });

    emptyState.textContent = projects.length === 0
        ? 'No projects yet.'
        : '';
}

// Handle Edit and Delete using each project's stable ID.
projectList.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');

    if (!button || !projectList.contains(button)) {
        return;
    }

    const id = Number(button.dataset.id);
    const project = projects.find(item => item.id === id);

    if (!project) {
        return;
    }

    if (button.dataset.action === 'edit') {
        editingId = project.id;
        nameInput.value = project.name;
        statusInput.value = project.status;

        saveButton.textContent = 'Save changes';
        cancelButton.hidden = false;
        message.textContent = '';

        nameInput.focus();
        return;
    }

    if (button.dataset.action === 'delete') {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${project.name}"?`
        );

        // Cancel must not change the collection or storage.
        if (!confirmed) {
            return;
        }

        const index = projects.findIndex(
            item => item.id === id
        );

        if (index === -1) {
            return;
        }

        projects.splice(index, 1);

        // If the deleted project was being edited,
        // return the form to Add mode.
        if (editingId === id) {
            resetForm();
        }

        render();

        if (saveProjects()) {
            message.textContent = 'Project deleted successfully.';
        } else {
            message.textContent =
                'Project deleted in this session, but changes ' +
                'could not be saved to browser storage.';
        }
    }
});

// Handle both creating and updating with one submit listener.
form.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const status = statusInput.value;

    if (name === '') {
        message.textContent = 'Please enter a project name.';
        nameInput.focus();
        return;
    }

    if (!validStatuses.includes(status)) {
        message.textContent = 'Please select a valid project status.';
        statusInput.focus();
        return;
    }

    if (editingId === null) {
        // Add mode: create a new project.
        projects.push({
            id: nextId,
            name: name,
            status: status
        });

        nextId += 1;
    } else {
        // Edit mode: update the existing project.
        const project = projects.find(
            item => item.id === editingId
        );

        if (!project) {
            message.textContent =
                'Project not found. Please try again.';
            resetForm();
            render();
            return;
        }

        project.name = name;
        project.status = status;
    }

    const wasEditing = editingId !== null;

    resetForm();
    render();

    if (saveProjects()) {
        message.textContent = wasEditing
            ? 'Project updated successfully.'
            : 'Project added successfully.';
    } else {
        message.textContent =
            'Changes were made in this session, but could not ' +
            'be saved to browser storage.';
    }
});

// Cancel editing without changing stored records.
cancelButton.addEventListener('click', () => {
    resetForm();
    message.textContent = 'Edit cancelled.';
    render();
});

// Load saved data before displaying the initial list.
loadProjects();
render();
