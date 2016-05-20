const proxyquire = require('proxyquire');
const sentence = require('sentence-tools');
const u = require('untab');
const compose = require('1-liners').compose;

module.exports = (path) => {
  const options = [];

  const commanderLookalike = {};

  commanderLookalike.option = (label, description, defaultValue) => {
    options.push({ label, description, defaultValue });
    return commanderLookalike;
  };

  const noop = () => commanderLookalike;
  [
    'version', 'usage', 'parse', 'arguments', 'action', 'command', 'on',
    'description', 'alias',
  ].forEach((key) => {
    commanderLookalike[key] = noop;
  });

  proxyquire(path, { commander: commanderLookalike });

  return options.map((option) => u`
    #### \`${option.label}\`
    ${
      option.description.split(/\.\s+/)
        .map(compose(sentence.capitalize, sentence.stripTrailingPeriod))
        .concat(typeof option.defaultValue === 'undefined'
          ? []
          : [`Default: \`${option.defaultValue}\``]
        )
        .join('. ')
    }.
  `).join('\n');
};
