export default function getTextForEvent({ type, name, loc, args }, index) {
  if (type === 'assignment') {
    return `Step ${index + 1}: Assign ${name} to "${args[0]}" on line ${loc.start.line}`;
  } else if (type === 'fncall') {
    return `Step ${index + 1}: Call ${name} on line ${loc.start.line} with arguments: ${args.join(', ')}`;
  } else if (type === 'block') {
    return `Step ${index + 1}: Run branch on line ${loc.start.line}`;
  } else if (type === 'condition' && name === 'else condition') {
    return `Step ${index + 1}: No other conditions met, else branch on line ${loc.start.line} was run`;
  } else if (type === 'condition') {
    return `Step ${index + 1}: Condition ${name} on line ${loc.start.line} had result: ${args[0]}`;
  } else {
    return `Step ${index + 1}`;
  }
}
