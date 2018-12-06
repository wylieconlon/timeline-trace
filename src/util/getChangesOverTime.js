export default function getChangesOverTime(eventLog) {
  const changes = {};
  const keys = [];
  eventLog.forEach(({ type, name, loc, args }, index) => {
    if (type !== 'assignment') {
      return;
    }

    if (!changes[name]) {
      changes[name] = [];
      keys.push(name);
    }

    changes[name].push({
      value: args[0],
      step: index + 1,
      loc
    });
  });

  return keys.map((key) => {
    return {
      name: key,
      values: changes[key]
    };
  });
}
