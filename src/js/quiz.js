const blocks = document.querySelectorAll('.quiz__block');
const next = document.querySelector('.quiz__next');
const prev = document.querySelector('.quiz__prev');
const currentNumber = document.querySelector('#current')
const totalNumber = document.querySelector('#total')
const form = document.querySelector('.quiz__form')
const thanks = document.querySelector('.quiz__thanks')
let currentIndex = 0;
totalNumber.textContent = blocks.length;


next.addEventListener('click', () => {
  prev.removeAttribute('disabled')
  blocks[currentIndex].classList.remove('active')
  currentIndex += 1

  if (currentIndex + 1 == blocks.length) {
    next.setAttribute('disabled', true)
  }

  currentNumber.textContent = currentIndex + 1
  blocks[currentIndex].classList.add('active')
})


prev.addEventListener('click', () => {
  next.removeAttribute('disabled')
  blocks[currentIndex].classList.remove('active')
  currentIndex -= 1

  if (currentIndex == 0) {
    prev.setAttribute('disabled', true)
  }
  currentNumber.textContent = currentIndex + 1
  blocks[currentIndex].classList.add('active')
})





form.addEventListener('submit', (e) => {
  e.preventDefault();
  thanks.classList.add('active')
  form.reset();
})

