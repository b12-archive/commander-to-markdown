const proxyquire = require('proxyquire');
const sentence = require('sentence-tools');
const u = require('untab');
const compose = require('1-liners').compose;
const asObject = require('as/object');

module.exports = (path, options) => {
  const safeOptions = options || {};
  const programModules = safeOptions.programModules || ['.', '..'];

  const programOptions = [];

  const commanderLookalike = {};

  const pushOption = (label, description, defaultValue) => {
    programOptions.push({ label, description, defaultValue });
    return commanderLookalike;
  };
  [
    'option', 'arguments',
  ].forEach((key) => {
    commanderLookalike[key] = pushOption;
  });

  const noop = () => commanderLookalike;
  [
    'version', 'usage', 'parse', 'action', 'command', 'on',
    'description', 'alias',
  ].forEach((key) => {
    commanderLookalike[key] = noop;
  });

  const programStubs = asObject(programModules.map((modulePath) => ({
    key: modulePath,
    value: () => ({}),
  })));

  proxyquire(path, Object.assign({
    commander: commanderLookalike,
  }, programStubs));

  return programOptions.map((option) => u`
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
