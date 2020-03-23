const firstLetterToUpperCase = str =>
  str // Match spaces or dashes
    .split(/[\s-]+/)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

const getNRandomItems = (n, items) => {
  if (items.length <= n) return items;
  const randomItems = [];
  const oldIndexes = [];
  for (let i = 0; i < n; i++) {
    let randomIndex = Math.floor(Math.random() * items.length);
    // Don't pick the same item twice
    while (oldIndexes.includes(randomIndex))
      randomIndex = Math.floor(Math.random() * items.length);

    randomItems.push(items[randomIndex]);
    oldIndexes.push(randomIndex);
  }
  return randomItems;
};
export { firstLetterToUpperCase, getNRandomItems };
