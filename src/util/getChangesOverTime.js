export default function getChangesOverTime(eventLog) {
  const changes = {};
  const meta = [];
  eventLog.forEach(({ type, name, loc, args }, index) => {
    if (type === 'assignment') {
      if (!changes[name]) {
        changes[name] = [];
        meta.push({
          name,
          type,
        });
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
        meta.push({
          name: fnName,
          type,
        });
      }

      changes[fnName].push({
        value: args,
        step: index + 1,
        loc
      });
    }
  });

  return meta.map(({ name, type }) => {
    return {
      name,
      values: changes[name],
      type,
    };
  });
}
