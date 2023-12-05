export const subText = (value: string, limit: number) => {
  return value.length > limit ? value.substring(0, limit) + "..." : value;
};
