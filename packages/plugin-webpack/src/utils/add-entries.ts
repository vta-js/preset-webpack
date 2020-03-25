import { Configuration } from "webpack";

/**
 * prependEntry Method
 * @param {Entry} originalEntry
 * @param {Entry} additionalEntries
 * @returns {Entry}
 */
const prependEntry = (originalEntry, additionalEntries) => {
  if (typeof originalEntry === "function") {
    return () =>
      Promise.resolve(originalEntry()).then(entry => prependEntry(entry, additionalEntries));
  }

  if (typeof originalEntry === "object" && !Array.isArray(originalEntry)) {
    /** @type {Object<string,string>} */
    const clone = {};

    Object.keys(originalEntry).forEach(key => {
      // entry[key] should be a string here
      clone[key] = prependEntry(originalEntry[key], additionalEntries);
    });

    return clone;
  }

  // in this case, entry is a string or an array.
  // make sure that we do not add duplicates.
  /** @type {Entry} */
  const entriesClone = additionalEntries.slice(0);
  [].concat(originalEntry).forEach(newEntry => {
    if (!entriesClone.includes(newEntry)) {
      entriesClone.push(newEntry);
    }
  });
  return entriesClone;
};

export default function addEntries(config: Configuration, entries: string[]) {
  /* eslint-disable no-param-reassign */
  config.entry = prependEntry(config.entry, entries);
}
