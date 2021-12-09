const http = require('http');
const displayContent = require("./routes");
const colors = require('colors');

const server = http.createServer(displayContent);

server.listen(3001);

console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.red) // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass