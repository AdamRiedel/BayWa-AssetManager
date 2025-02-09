const AssetList = () => {
  const assets = [
    {
      id: 1,
      threat: 3,
      name: "Main Website",
      type: "Web",
      listing: "ABC Listing",
      vulnerabilities: 198,
      location: "Durham",
      user: "Darren Kreal",
      lastUpdated: "5 minutes ago",
      status: true,
    },
    {
      id: 2,
      threat: 2,
      name: "Consumer App",
      type: "Mobile",
      listing: "ABC Listing",
      vulnerabilities: 777,
      location: "Hoofdorp",
      user: "Tarak Kulokov",
      lastUpdated: "7 minutes ago",
      status: false,
    },
    // Add more entries as needed
  ];

  return (
    <div
      style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Asset List</h2>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Asset
        </button>
      </div>

      <input
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
        placeholder="Search assets..."
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Threat
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Name
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Type
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Listing
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Vulnerabilities
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Location
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              User
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Last Update
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    backgroundColor:
                      asset.threat === 3
                        ? "#dc3545"
                        : asset.threat === 2
                        ? "#ffc107"
                        : "#28a745",
                  }}
                >
                  {asset.threat}
                </div>
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.name}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.type}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.listing}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.vulnerabilities}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.location}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.user}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {asset.lastUpdated}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                <input
                  type="checkbox"
                  checked={asset.status}
                  onChange={() => {}}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
