export default `
var hasBeenCalled = false;

var button = document.createElement('button');
button.innerText = 'Click Me!';
document.body.appendChild(button);

button.addEventListener('click', function(ev) {
  ev.preventDefault();
  
  if (!hasBeenCalled) {
    document.body.appendChild(
      document.createTextNode('Clicked first time!')
    );
  } else {
    document.body.appendChild(
      document.createTextNode('Clicked another time!')
    );
  }
  hasBeenCalled = true;
});
`;
