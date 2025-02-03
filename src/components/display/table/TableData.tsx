import React from 'react';

type MapValueType<T extends Record<string, unknown>> = {
  [key in keyof T]: string;
};

type TableDataProps<T extends Record<string, unknown>> = {
  data: T[];
  map: MapValueType<T>;
  loading?: boolean;
  action?: boolean;
  onEdit?: (data: T) => void;
  onDelete?: (data: string) => void;
};

export default function TableData<T extends Record<string, unknown>>({
  data,
  map,
  loading = false,
  action,
  onEdit,
  onDelete
}: TableDataProps<T>) {
  const column = Object.keys(map);
  const addCol = action ? 1 : 0;
  return (
    <div className="overflow-x-auto min-h-96">
      <table border={1} className="table ">
        <thead>
          <tr>
            {column.map((key, index) => (
              <th key={index}>{map[key]}</th>
            ))}
            {action ? (
              <>
                <th></th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={column.length + addCol} className="text-center">
                <span className="loading loading-dots loading-md"></span>
              </td>
            </tr>
          ) : (
            <>
              {data.length ? (
                <>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover">
                      {column.map((key, index) => (
                        <td key={index}>{row[key] ? String(row[key]) : '-'}</td>
                      ))}
                      {action ? (
                        <td>
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-sm m-1"
                            >
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                            >
                              {onEdit ? (
                                <li>
                                  <a onClick={() => onEdit(row)}>
                                    <i className="bx bx-pencil"></i>Edit
                                  </a>
                                </li>
                              ) : null}
                              {onDelete ? (
                                <li>
                                  <a
                                    onClick={() => onDelete(row._id as string)}
                                    className="text-error"
                                  >
                                    <i className="bx bx-trash"></i>Delete
                                  </a>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={column.length + addCol} className="text-center">
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
