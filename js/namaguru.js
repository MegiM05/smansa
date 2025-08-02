const kelompokColors = [
    { bg: 'rgba(243, 156, 18, 0.2)', text: '#f39c12', border: 'rgba(243, 156, 18, 0.5)' },
    { bg: 'rgba(46, 204, 113, 0.2)', text: '#2ecc71', border: 'rgba(46, 204, 113, 0.5)' },
    { bg: 'rgba(155, 89, 182, 0.2)', text: '#9b59b6', border: 'rgba(155, 89, 182, 0.5)' },
    { bg: 'rgba(52, 152, 219, 0.2)', text: '#3498db', border: 'rgba(52, 152, 219, 0.5)' },
    { bg: 'rgba(231, 76, 60, 0.2)', text: '#e74c3c', border: 'rgba(231, 76, 60, 0.5)' },
    { bg: 'rgba(26, 188, 156, 0.2)', text: '#1abc9c', border: 'rgba(26, 188, 156, 0.5)' }
];

// Ubah path ini jika lokasi file berbeda
async function loadData() {
    return dataGuru;
}

function generateFilterButtons(kelompokList) {
    const container = document.getElementById('filter-buttons');
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Semua';
    allBtn.dataset.filter = 'all';
    container.appendChild(allBtn);

    kelompokList.forEach((kelompok, index) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = `Kelompok ${index + 1}`;
        btn.dataset.filter = kelompok;
        container.appendChild(btn);
    });
}

async function displayData(filter = 'all') {
    const container = document.getElementById('guru-container');
    container.innerHTML = '<div class="loading-state">Memuat data...</div>';
    const data = await loadData();

    if (!data) {
        container.innerHTML = '<div class="error-state">Gagal memuat data</div>';
        return;
    }

    container.innerHTML = '';

    if (filter === 'all') {
        Object.entries(data).forEach(([kelompok, guruList], index) => {
            const colorIndex = index % kelompokColors.length;
            const title = document.createElement('h2');
            title.className = 'group-title';
            title.textContent = `Kelompok ${index + 1}`;
            container.appendChild(title);

            guruList.forEach(guru => {
                const card = document.createElement('div');
                card.className = 'guru-card';
                card.innerHTML = `
                    <div class="guru-nama">${guru.nama}</div>
                    <div class="guru-jabatan">${guru.jabatan}</div>
                    <div class="guru-kelompok kelompok-${index + 1}" 
                         style="background:${kelompokColors[colorIndex].bg};
                                color:${kelompokColors[colorIndex].text};
                                border:2px solid ${kelompokColors[colorIndex].border}; 
                                margin-bottom:4px;">
                        Kelompok ${index + 1}
                    </div>
                `;
                container.appendChild(card);
            });
        });
    } else {
        const keys = Object.keys(data);
        const kelompokIndex = keys.indexOf(filter);
        if (kelompokIndex !== -1) {
            const colorIndex = kelompokIndex % kelompokColors.length;
            const title = document.createElement('h2');
            title.className = 'group-title';
            title.textContent = `Kelompok ${kelompokIndex + 1}`;
            container.appendChild(title);

            data[filter].forEach(guru => {
                const card = document.createElement('div');
                card.className = 'guru-card';
                card.innerHTML = `
                    <div class="guru-nama">${guru.nama}</div>
                    <div class="guru-jabatan">${guru.jabatan}</div>
                    <div class="guru-kelompok kelompok-${kelompokIndex + 1}" 
                         style="background:${kelompokColors[colorIndex].bg};
                                color:${kelompokColors[colorIndex].text};
                                border:2px solid ${kelompokColors[colorIndex].border}; 
                                margin-bottom:4px;">
                        Kelompok ${kelompokIndex + 1}
                    </div>
                `;
                container.appendChild(card);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData();
    if (data) {
        generateFilterButtons(Object.keys(data));
        document.getElementById('filter-buttons').addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                displayData(e.target.dataset.filter);
            }
        });
        displayData();
    } else {
        document.getElementById('guru-container').innerHTML = '<div class="error-state">Gagal memuat data</div>';
    }
});
