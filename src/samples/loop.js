export default `
var total = 0;

for(var i=0; i<10; i++) {
  if(i == 5) {
    break;
  }
  total += i;
}
`;