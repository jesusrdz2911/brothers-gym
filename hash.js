const bcrypt = require('bcryptjs');

async function main(){
  const hash = await bcrypt.hash('1234', 10);
  console.log('Copia este hash:');
  console.log(hash);
}
main();