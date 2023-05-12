export const formatDid = (
  did: string | undefined | null,
  startChars = 4,
  endChars = 5,
) => {
  if (!did) return '';

  return `${did.slice(0, startChars)}...${did.slice(did.length - endChars)}`;
};

export const formatKey = (key: string, startChars = 4, endChars = 5) => {
  return `${key.slice(0, startChars)}...${key.slice(key.length - endChars)}`;
};

export const formatBalance = (balance: string | number, decimals = 2) =>
  Number(balance).toFixed(decimals);

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 2) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 3)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  return color;
};