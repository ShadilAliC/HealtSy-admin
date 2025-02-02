import React from "react";
import Loading from "../../common/Loading";
import Empty from "../../common/Empty";



const TableTwo = ({ columns, data, className = "", loading, tableRef }) => {
  const isEmpty = data.length === 0;

  return (
    <div className="relative w-full h-full border">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 ">
          <Loading />
        </div>
      ) : isEmpty ? (
        <div className=" h-80 inset-0 flex items-center justify-center">
          <Empty />
        </div>
      ) : (
        <table
          className={`w-full text-sm text-left text-primary dark:text-gray-400 ${className}`}
          ref={tableRef}
        >
          <thead className="text-[14px] font-extralight text-primary sticky top-0 bg-[#ece5e5] border-b-2 dark:bg-gray-700 dark:text-gray-400 font-poppins ">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="bg-white border-b text-[15px] text-[#000000] font-poppins dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((column) => (
                  <td key={`${row.id || rowIndex}-${column.key}`} className="px-4 py-2 font-poppins">
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableTwo;

