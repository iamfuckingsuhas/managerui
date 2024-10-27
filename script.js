document.addEventListener('DOMContentLoaded', () => {
    fetchLOData();
    fetchLRData();
    fetchCandidatesData();
});

// Show and hide tabs
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === tabName) {
            tab.classList.add('active');
        }
    });

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.includes(tabName.charAt(0).toUpperCase() + tabName.slice(1))) {
            button.classList.add('active');
        }
    });
}

// Fetch LO data from API
function fetchLOData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            const loTableBody = document.querySelector('#lo-table tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.userId}</td>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.body}</td>
                `;
                row.onclick = () => viewLO(item);
                loTableBody.appendChild(row);
            });
        });
}

// Fetch LR data from API
function fetchLRData() {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => {
            const lrTableBody = document.querySelector('#lr-table tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.postId}</td>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.body}</td>
                `;
                row.onclick = () => viewLR(item, 'lr');
                lrTableBody.appendChild(row);
            });
        });
}

// Fetch Candidates data from API
function fetchCandidatesData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const candidatesTableBody = document.querySelector('#candidates-table tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.username}</td>
                    <td>${item.email}</td>
                `;
                candidatesTableBody.appendChild(row);
            });
        });
}

// View LO Function
function viewLO(id) {
    // Navigate to the view page with the LO ID
    window.location.href = `view.html?id=${id}`;
}

// View LR Function
function viewLR(id) {
    // Navigate to the view page with the LR ID
    window.location.href = `view.html?id=${id}`;
}


// Show create form
function showCreateForm(type) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').innerText = `Create ${type.toUpperCase()}`;
    document.getElementById('modal-userId').value = '';
    document.getElementById('modal-id').value = '';
    document.getElementById('modal-title-input').value = '';
    document.getElementById('modal-body').value = '';
    modal.style.display = 'block';

    const form = document.getElementById('modal-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        closeModal();
        // Add logic to handle create
    };
}

// Close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Download LO data as CSV
function downloadLOData() {
    const table = document.querySelector('#lo-table tbody');
    const rows = Array.from(table.rows);
    const csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(row => Array.from(row.cells).map(cell => cell.textContent).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lo_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Download LR data as CSV
function downloadLRData() {
    const table = document.querySelector('#lr-table tbody');
    const rows = Array.from(table.rows);
    const csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(row => Array.from(row.cells).map(cell => cell.textContent).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lr_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
