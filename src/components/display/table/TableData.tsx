import React from 'react';

type MapValueType<T extends Record<string, unknown>> = {
  [key in keyof T]: string;
};

type TableDataProps<T extends Record<string, unknown>> = {
  data: T[];
  map: MapValueType<T>;
  loading?: boolean;
};

export default function TableData<T extends Record<string, unknown>>({
  data,
  map,
  loading = false
}: TableDataProps<T>) {
  const column = Object.keys(map);
  return (
    <div className="overflow-x-auto">
      <table border={1} className="table">
        <thead>
          <tr>
            {column.map((key, index) => (
              <th key={index}>{map[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={column.length} className="text-center">
                <span className="loading loading-dots loading-md"></span>
              </td>
            </tr>
          ) : (
            <>
              {data.length ? (
                <>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {column.map((key, index) => (
                        <td key={index}>{row[key] ? String(row[key]) : '-'}</td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={column.length} className="text-center">
                    Empty
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
