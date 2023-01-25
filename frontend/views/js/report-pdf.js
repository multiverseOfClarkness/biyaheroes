window.onload = () => {
  document.getElementById('dl-btn').addEventListener('click', ()=>{
    console.log('clicked')
     var opt = {
      margin:       0,
      filename:     'report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
     html2pdf().from(report).set(opt).save()
  })
}