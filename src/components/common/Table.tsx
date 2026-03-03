import React from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  accentColor?: string;
}

export const Table: React.FC<TableProps> = ({ columns, data, accentColor = '#1E4AB8' }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">
        <thead style={{ backgroundColor: `${accentColor}10` }}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-sm"
                style={{ color: accentColor }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-gray-700">
                  {column.cell ? column.cell(row[column.accessor], row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
