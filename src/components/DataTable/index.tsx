import ReactDataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      background: "#fcc260",
      fontWeight: 500,
    },
  },
};

interface DataTableProps {
  columns: any;
  data: any;
  title?: string;
  responsive?: boolean;
}
const datatableStyles = {
  headRow: {
    style: {
      border: "none",
      backgroundColor: "#FDF2F8",
      minHeight: "45px",
      fontSize: "14px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 500,
      textTransform: "uppercase",
      color: "#1F2937",
      background: "#fcc260",
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
const DataTable: React.FC<DataTableProps> = ({
  columns,
  responsive = true,
  data,
  title,
}) => {
  return (
    <ReactDataTable
      columns={columns}
      data={data}
      title={title}
      striped={true}
      responsive={responsive}
      customStyles={{ ...datatableStyles }}
    />
  );
};

export default DataTable;
