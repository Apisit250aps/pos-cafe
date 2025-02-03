import { ObjectId } from 'mongodb';
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
  onDelete?: (data: ObjectId) => void;
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
  return (
    <div className="overflow-x-auto">
      <table border={1} className="table">
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
              <td colSpan={column.length} className="text-center">
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
                          <div className="dropdown">
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
                              <li>
                                <a onClick={() => onEdit && onEdit(row)}>
                                  <i className="bx bx-pencil"></i>Edit
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    onDelete && onDelete(row._id as ObjectId)
                                  }
                                  className='text-error'
                                >
                                  <i className="bx bx-trash"></i>Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      ) : null}
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
