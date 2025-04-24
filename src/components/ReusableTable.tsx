const ReusableTable = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div>
      <table className="mt-4 w-full">
        <thead className="text-xs text-gray-500">
          <tr className="text-left">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={column.header === "Info" ? "px-2" : column.className}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
