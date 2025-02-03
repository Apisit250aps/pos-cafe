import React from 'react';

type MapValueType = { [key: string]: string };

type TableDataProps<T extends Record<string, unknown>> = {
  data: T[];
  map: MapValueType;
};

export default function TableData<T extends Record<string, unknown>>({
  data,
  map
}: TableDataProps<T>) {
  return (
    <table border={1}>
      <thead>
        <tr>
          {Object.keys(map).map((key, index) => (
            <th key={index}>{map[key]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(map).map((key, index) => (
              <td key={index}>{String(row[key])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
