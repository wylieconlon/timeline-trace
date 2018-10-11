export default `
var total = 0;

for(var i=0; i<10; i++) {
  if (i === 0) {
    total = 1;
  } else if (i === 1) {
    total = 10;
  } else if(i == 5) {
    break;
  }
  total += i;
}
`;