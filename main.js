
const myform = document.getElementById('myform');
const outarea = document.getElementById('generated');
const strength = document.getElementById('strength-summary-value');
//const bars = Array.from(document.querySelectorAll('.bars > .bar'));
const bars = document.querySelector('.bars');
const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeral = '0123456789';
const symbols = '!@#$%^&*()-=+_[]?';

//form submission
const handleSubmit = (e) => {
  e.preventDefault();

  let isValid = true; // form is valid
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

const strengthScore = (length, N) => {
  return N * Math.log(length);
}

myform.addEventListener('submit', handleSubmit);

const copyIcon = document.querySelector('.generated-card > img');
const popup = document.getElementById("popup");
copyIcon.addEventListener('click', ()=> {
     // Copy the text inside the text field
    navigator.clipboard.writeText(outarea.innerText);
    console.log(outarea.innerText);
    //show pop up
    popup.classList.add("show");
  }
);

//range input callback
const rangeInput = document.querySelector('.custom-range'); 
const rangeContainer = document.querySelector('.custom-range-container'); 

const updateSlider = () => {
  const value = rangeInput.value; 
  const max = rangeInput.max; 
  const percentage = (value / max) * 100; 
  rangeContainer.style.setProperty('--track-progress', `${percentage}%`);
  console.log(percentage); 
}

rangeInput.addEventListener('load', updateSlider);

rangeInput.addEventListener('input', () => 
  { 
    updateSlider();
  }); 
