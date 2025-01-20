export function FormatTable() {
    return (
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2">Column</th>
            <th className="text-left py-2">Required</th>
            <th className="text-left py-2">Format</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Name</td>
            <td className="py-2">Yes</td>
            <td className="py-2">Text</td>
          </tr>
          <tr>
            <td className="py-2">Number</td>
            <td className="py-2">Yes</td>
            <td className="py-2">Text</td>
          </tr>
          <tr>
            <td className="py-2">Email</td>
            <td className="py-2">No</td>
            <td className="py-2">Text</td>
          </tr>
        </tbody>
      </table>
    );
  }