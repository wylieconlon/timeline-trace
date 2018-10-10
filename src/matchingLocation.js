export default function isMatchingLocation(loc1, loc2) {
  if (!loc1 || !loc2) {
    return false;
  }

  return (loc1.start.line === loc2.start.line &&
    loc1.start.ch === loc2.start.ch &&
    loc1.end.line === loc2.end.line &&
    loc1.end.ch === loc2.end.ch);
}
