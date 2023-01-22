document.getElementById('dl-btn').addEventListener('click', function() {
  downloadPDF();
});

//nag lagay ako ng submitted proof na hinide ko muna kapag hindi naman siya idodownload
//since may button na "click to view submitted proof"
document.getElementById('proof-text').style.display='none';

function downloadPDF() {
  console.log('clicked')
  let downloadButton = document.getElementById('dl-btn');
  let backIcon = document.getElementById('back-icon');
  let proofButton = document.getElementById('proof-btn');
  let text = document.getElementById('proof-text');
  let resolvedButton = document.getElementById('resolved-btn')

  //after mapindot ito yung pinaka output na pdf hinide ko except sa resolved button
  if (downloadButton) {
      downloadButton.style.display = 'none';
      backIcon.style.display = 'none';
      proofButton.style.display = 'none';
      resolvedButton.style.display = 'none';
      text.style.display = 'block'; //displays the "submitted proof" na text
  }

  var pdf = new jsPDF();
  pdf.addHTML(document.body, function() {
    pdf.save('report.pdf');
  });

  //pinaka output ng website after mapindot yung button kasi may tendeny na mawala yung buttons
  if (downloadButton || backIcon || proofButton || receivedButton || resolvedButton) {
    downloadButton.style.display = 'inline';
    backIcon.style.display = 'inline';
    proofButton.style.display = 'inline';
    text.style.display = 'none'; //hides the "submitted proof" na text
    resolvedButton.style.display = 'inline';
  }
}

// window.html2canvas = html2canvas
// window.jsPDF = window.jspdf.jsPDF

// function downloadPDF() {
//   console.log('clicked')
//   html2canvas(document.body, {
//     allowTaint: true,
//     useCORS: true,
//     scale: 1
//   }).then(canvas => {
   

//     var doc = new jsPDF();
//     doc.setFont('Arial');
//     doc.getFontSize(11);
//     doc.save();
//   });
// }