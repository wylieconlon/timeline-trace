export default `
let result = '';
for(var i=0; i<20; i++) {
  if (i % 15 === 0) {
    result = result + ' fizzbuzz';
  } else if (i % 5 === 0) {
    result = result + ' buzz';
  } else if(i % 3 === 0) {
    result = result + ' fizz';
  } else {
    result = result + ' ' + i;
  }
}
document.body.innerText = result;
`;