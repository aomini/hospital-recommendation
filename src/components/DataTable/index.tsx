import ReactDataTable from "react-data-table-component";

interface DataTableProps {
  columns: any;
  data: any;
  title?: string;
}
const datatableStyles = {
  headRow: {
    style: {
      border: "none",
      backgroundColor: "white",
      minHeight: "45px",
      fontSize: "14px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 500,
      textTransform: "uppercase",
      color: "#8397A0",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
    },
    style: {
      paddingTop: "12px",
      paddingBottom: "12px",
      borderBottom: "none !important",
      fontSize: "16px",
      color: "#2E3B44",
    },
    stripedStyle: {
      backgroundColor: "#F6FAFA",
    },
  },
};
const DataTable: React.FC<DataTableProps> = ({ columns, data, title }) => {
  return (
    <ReactDataTable
      columns={columns}
      data={data}
      title={title}
      striped={true}
      customStyles={{ ...datatableStyles }}
    />
  );
};

export default DataTable;
