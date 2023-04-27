export const formatDate = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  console.log(year, month, day);
  return `${day}/${month}/${year}`;
};

export const formatCurrency = (value) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
