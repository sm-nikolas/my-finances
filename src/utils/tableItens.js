export const columns = [
  {
    title: "entryDate",
    dataIndex: "entryDate",
    key: "entryDate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "complement",
    dataIndex: "complement",
    key: "complement",
  },
  {
    title: "amount",
    key: "amount",
    dataIndex: "amount",
  },
];
