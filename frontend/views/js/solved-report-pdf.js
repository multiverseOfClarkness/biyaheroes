//event once na napindot yung download button


//nag lagay ako ng submitted proof na hinide ko muna kapag hindi naman siya idodownload
//since may button na "click to view submitted proof"
document.getElementById('proof-text').style.display='none';
// let hehe = document.getElementById('invisible').style.display='none';

function downloadPDF() {
  console.log('f')
  let downloadButton = document.getElementById('dl-btn');
  let backIcon = document.getElementById('back-icon');
  let text = document.getElementById('proof-text');
  let proofButton = document.getElementById('proof-btn');

  //after mapindot ito yung pinaka output na pdf hinide ko excpet sa resolved button
  if (downloadButton || backIcon ) {
      downloadButton.style.display = 'none';
      backIcon.style.display = 'none';
      proofButton.style.display = 'none';
      text.style.display = 'flex'; //displays the "submitted proof" na text

  }

  var pdf = new jsPDF();
  pdf.addHTML(document.body, function() {
    pdf.save('report.pdf');
  });

  //pinaka output ng website after mapindot yung button kasi may tendeny na mawala yung buttons
  if (downloadButton || backIcon) {
    downloadButton.style.display = 'block';
    backIcon.style.display = 'block';
    proofButton.style.display = 'block';
    text.style.display = 'none'; //hides the "submitted proof" na text
  }
}
