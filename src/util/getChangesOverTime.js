export default function getChangesOverTime(eventLog) {
  const changes = {};
  const keys = [];
  eventLog.forEach(({ type, name, loc, args }, index) => {
    if (type === 'assignment') {
      if (!changes[name]) {
        changes[name] = [];
        keys.push(name);
      }

      changes[name].push({
        value: args[0],
        step: index + 1,
        loc
      });
    } else if (type === 'fncall') {
      const fnName = name === 'Anonymous Function' ? name + ' on line ' + loc.start.line : name;
      if (!changes[fnName]) {
        changes[fnName] = [];
        keys.push(fnName);
      }

      changes[fnName].push({
        value: args,
        step: index + 1,
        loc
      });
    }
  });

  return keys.map((key) => {
    return {
      name: key,
      values: changes[key]
    };
  });
}
