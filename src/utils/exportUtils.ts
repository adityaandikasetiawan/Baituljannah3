// Utility functions for exporting data

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    alert('Tidak ada data untuk diekspor');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape values that contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportApplicationsToCSV = (applications: any[]) => {
  const formattedData = applications.map(app => ({
    'Nama': app.name,
    'Email': app.email,
    'Telepon': app.phone,
    'Posisi': app.position,
    'Unit': app.unit,
    'Pendidikan': app.education,
    'Pengalaman': app.experience,
    'Tanggal Melamar': new Date(app.appliedDate).toLocaleDateString('id-ID'),
    'Status': app.status
  }));
  
  exportToCSV(formattedData, 'lamaran_kerja');
};

export const exportJobsToCSV = (jobs: any[]) => {
  const formattedData = jobs.map(job => ({
    'Posisi': job.position,
    'Unit': job.unit,
    'Tipe': job.type,
    'Lokasi': job.location,
    'Jumlah Pelamar': job.applicants,
    'Status': job.status,
    'Tanggal Posting': new Date(job.postedDate).toLocaleDateString('id-ID')
  }));
  
  exportToCSV(formattedData, 'lowongan_pekerjaan');
};
