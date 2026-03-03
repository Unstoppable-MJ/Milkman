export default function Table({ headers, data }) {
    return (
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((h, i) => (
              <th key={i} className="p-3">{h}</th>
            ))}
          </tr>
        </thead>
  
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="text-center border-t">
              {row.map((cell, j) => (
                <td key={j} className="p-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }