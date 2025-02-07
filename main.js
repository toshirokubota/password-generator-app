
const myform = document.getElementById('myform');
const outarea = document.getElementById('generated');
const strength = document.getElementById('strength-summary');
const bars = Array.from(document.querySelectorAll('.bars > .bar'));
const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeral = '0123456789';
const symbols = '!@#$%^&*()-=+_[]?';
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
  else password = ' '; //just to fill the DIV
  console.log(password, score);

  outarea.innerText = password;
  if(score < 30) {
    strength.innerText = 'too weak!';
    bars[0].setAttribute('data-color', 'red');
    bars[1].setAttribute('data-color', 'none');
    bars[2].setAttribute('data-color', 'none');
    bars[3].setAttribute('data-color', 'none');
  } else if(score < 100) {
    strength.innerText = 'weak';
    bars[0].setAttribute('data-color', 'orange');
    bars[1].setAttribute('data-color', 'orange');
    bars[2].setAttribute('data-color', 'none');
    bars[3].setAttribute('data-color', 'none');
  } else if(score < 180) {
    strength.innerText = 'medium';
    bars[0].setAttribute('data-color', 'yellow');
    bars[1].setAttribute('data-color', 'yellow');
    bars[2].setAttribute('data-color', 'yellow');
    bars[3].setAttribute('data-color', 'none');
  } else {
    strength.innerText = 'strong';
    bars[0].setAttribute('data-color', 'green');
    bars[1].setAttribute('data-color', 'green');
    bars[2].setAttribute('data-color', 'green');
    bars[3].setAttribute('data-color', 'green');
  }
}

const strengthScore = (length, N) => {
  return N * Math.log(length);
}

myform.addEventListener('submit', handleSubmit);

const copyIcon = document.querySelector('.generated-card > img');
copyIcon.addEventListener('click', ()=> {
     // Copy the text inside the text field
    navigator.clipboard.writeText(outarea.innerText);
    console.log(outarea.innerText);
});

