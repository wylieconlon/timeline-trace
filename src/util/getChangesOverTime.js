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
      let fnName = name === 'Anonymous Function' ? name + ' on line ' + loc.start.line : name;
      fnName = 'Arguments to ' + fnName;

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
    } else if (type === 'condition' && name !== 'else condition') {
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
    } else if (type === 'return') {
      const returnName = 'Returned on line ' + loc.start.line;
      if (!changes[returnName]) {
        changes[returnName] = [];
        meta.push({
          name: returnName,
          type,
        });
      }

      changes[returnName].push({
        value: args[0],
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
