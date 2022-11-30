export const guid = () => {
  const x = 0x10000;
  const y = 16;
  const s4 = () => {
    return Math.floor((1 + Math.random()) * x)
      .toString(y)
      .substring(1);
  };

  return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
};
