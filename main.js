
const myform = document.getElementById('myform');
const outarea = document.getElementById('generated');
const strength = document.getElementById('strength-summary-value');
const bars = document.querySelector('.bars');
const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeral = '0123456789';
const symbols = '!@#$%^&*()-=+_[]?';

//form submission
const handleSubmit = (e) => {
  e.preventDefault();

  let fdata = new FormData(myform);
  const data = Object.fromEntries(fdata);
  
  let chars='';
  if(data['lowercase']) {
    chars += lowerAlpha;
  }
  if(data['uppercase']) {
    chars += upperAlpha;
  }
  if(data['number']) {
    chars += numeral;
  }
  if(data['symbols']) {
    chars += symbols;
  }
  let password='';
  let score = 0;
  if(chars.length > 0) {
    let nlength = data['char-length'];
    for(let i=0; i<nlength; ++i) {
      let k = Math.floor(Math.random() * chars.length);
      password += chars[k];
    }
    score = strengthScore(nlength, chars.length);
  }
  else {
    password = 'invalid';
  }
  console.log(password, score);

  outarea.innerText = password;
  let strength_type = 'invalid'
  if(score < 50) {
    strength_type = 'too weak!';
  } else if(score < 100) {
    strength_type = 'weak';
  } else if(score < 180) {
    strength_type = 'medium';
  } else {
    strength_type = 'strong';
  }
  strength.innerHTML = strength_type;
  bars.setAttribute('data-strength', strength_type);
}

//calculate the pathword strength score
const strengthScore = (length, N) => {
  return N * Math.log(length);
}

myform.addEventListener('submit', handleSubmit);

//handler for 'copy to clipboard'
const copyIcon = document.querySelector('.generated-card > img');
copyIcon.addEventListener('click', ()=> {
     // Copy the text inside the text field
    navigator.clipboard.writeText(outarea.innerText);
    console.log(outarea.innerText);
  }
);
//keydown handler for 'copy to clipboard'
copyIcon.addEventListener('keydown', (event)=>{
  if(event.code == "Enter") {
    navigator.clipboard.writeText(outarea.innerText);
    copyIcon.classList.toggle('active');
    setTimeout(()=> {
      copyIcon.classList.toggle('active');
    }, 250);
  }
});

//range input callback
const rangeInput = document.querySelector('.custom-range'); 
const rangeContainer = document.querySelector('.custom-range-container'); 

rangeInput.addEventListener('input', () => { 
  const value = rangeInput.value; 
  const max = rangeInput.max; 
  const percentage = (value / max) * 100; 
  rangeContainer.style.setProperty('--track-progress', `${percentage}%`);
  console.log(percentage); 
}); 


