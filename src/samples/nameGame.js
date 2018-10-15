export default `
document.body.innerText = 'Guess a number, then hit enter';

const input = document.createElement('input');
document.body.appendChild(input);

input.addEventListener('keydown', handleInput);

function handleInput(ev) {
  if (ev.keyCode === 13) {
    var number = parseInt(ev.target.value);
    if (number === 17) {
      document.body.appendChild(document.createTextNode('Correct!'));
    } else {
      document.body.appendChild(document.createTextNode('Wrong!'));
    }
  }
}
`;
