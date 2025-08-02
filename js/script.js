let students = [];

function toggleAccordion(header) {
  const accordion = header.parentElement;
  const content = header.nextElementSibling;

  if (accordion.classList.contains('active')) {
    // Tutup accordion dengan animasi smooth
    content.style.maxHeight = content.scrollHeight + "px";
    setTimeout(() => {
      content.style.maxHeight = "0";
    }, 10);
    
    accordion.classList.remove('active');
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    accordion.classList.add('active');
    setTimeout(() => {
      if (accordion.classList.contains('active')) {
        content.style.maxHeight = "none";
      }
    }, 500);
  }
}

function renderStudents(data) {
  const container = document.getElementById('studentList');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<div class="not-found">Data tidak ditemukan. Coba kata kunci lain.</div>';
    return;
  }

  data.forEach(student => {
    const el = document.createElement('div');
    el.className = 'student-item';
    el.innerHTML = `
      <div class="student-id">${String(student.id).padStart(3, '0')}</div>
      <div class="student-info">
        <div class="student-name">${student.name}</div>
        <div class="student-nisn">NISN: ${student.nisn}</div>
        <div class="lulus-text">LULUS</div>
        ${student.status ? `
          <div class="status-badge ${student.status === 'Lulus' ? 'status-lulus' : 'status-tidak-lulus'}">
            ${student.status}
          </div>
        ` : ''}
      </div>
    `;
    container.appendChild(el);
  });
}

function searchStudents(keyword) {
  const lower = keyword.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(lower) ||
    s.nisn.includes(lower)
  );
  renderStudents(filtered);
  const accordion = document.getElementById('accordion');
  const content = accordion.querySelector('.accordion-content');
  if (accordion.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function showLoading(show) {
  const loader = document.getElementById('loader');
  const studentList = document.getElementById('studentList');
  
  if (show) {
    loader.style.display = 'block';
    studentList.style.display = 'none';
  } else {
    loader.style.display = 'none';
    studentList.style.display = 'grid';
  }
}

showLoading(true);

fetch('database/data.json')
  .then(res => {
    if (!res.ok) {
      throw new Error('Gagal memuat data');
    }
    return res.json();
  })
  .then(data => {
    students = data;
    renderStudents(students);
    showLoading(false);
  })
  .catch(error => {
    console.error('Error:', error);
    showLoading(false);
    document.getElementById('studentList').innerHTML = `
      <div class="not-found">
        Gagal memuat data. Pastikan file data.json ada dan formatnya benar.
      </div>
    `;
  });

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchStudents(e.target.value);
});