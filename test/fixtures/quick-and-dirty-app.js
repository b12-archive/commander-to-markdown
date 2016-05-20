const program = require('commander');

program
  .option('-x', 'just some words bunched together.  some more here', 'nothing')
  .parse(process.argv);
