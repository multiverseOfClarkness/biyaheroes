const showEvidenceButton = document.getElementById('proof-btn')
const proof = document.getElementById('proof')
const proofText = document.getElementById('proof-text')

let counter = 1

const displayImage = () => {
    const clickCount = counter ++
    
   
    if (clickCount % 2 != 0) {
        showEvidenceButton.innerHTML = 'Hide proof'
        proof.style.display = 'inline'
        proof.style.visibility = 'visible'
        proofText.style.visibility = 'visible'
        
    } else {
        showEvidenceButton.innerHTML = 'View submitted proof'
        proof.style.display = 'none'
        proof.style.visibility = 'hidden'
        proofText.style.visibility = 'hidden'
    }


}