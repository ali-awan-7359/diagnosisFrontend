import React, { useEffect, useState } from "react";

const ResultScreen = () => {
  const [fixationPoints, setFixationPoints] = useState([]);
  const [saccades, setSaccades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fixationResponse, saccadesResponse] = await Promise.all([
          fetch("http://localhost:9000/api/diagnosis/fixation-points"),
          fetch("http://localhost:9000/api/diagnosis/saccades"),
        ]);

        if (fixationResponse.ok) {
          const fixationData = await fixationResponse.json();
          setFixationPoints(fixationData);
        }

        if (saccadesResponse.ok) {
          const saccadesData = await saccadesResponse.json();
          setSaccades(saccadesData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // Wait 2 seconds after script ends
    setTimeout(fetchData, 2000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderTable = (data) => {
    if (data.length === 0) return <div>No data available</div>;

    const headers = Object.keys(data[0]);

    return (
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header, i) => (
                <td key={i} className="border border-gray-300 px-4 py-2">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold">Fixation points</h2>
        {renderTable(fixationPoints)}
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold">Saccades</h2>
        {renderTable(saccades)}
      </div>
    </div>
  );
};

export default ResultScreen;
