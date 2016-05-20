require('tap-spec-integrated');
const test = require('tape-catch');
const u = require('untab');

const commanderToMarkdown = require('.');

test('Works as advertized', (is) => {
  is.equal(
    commanderToMarkdown(`${__dirname}/test/fixtures/app`),
    u`
      #### \`<address>\`
      Address for delivery.

      #### \`-p, --peppers\`
      Add peppers.

      #### \`-P, --pineapple\`
      Add pineapple.

      #### \`-b, --bbq-sauce\`
      Add bbq sauce.

      #### \`-c, --cheese [type]\`
      Pick the type of cheese. Default: \`marble\`.
    `,
    'covers the readme example'
  );
  is.end();
});

test('Prints the description in sentences', (is) => {
  is.equal(
    commanderToMarkdown(`${__dirname}/test/fixtures/quick-and-dirty-app`),
    u`
      #### \`-x\`
      Just some words bunched together. Some more here. Default: \`nothing\`.
    `,
    'capitalizes sentences'
  );
  is.end();
});
