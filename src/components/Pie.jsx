// import * as React from "react";
// import { PieChart } from "@mui/x-charts/PieChart";

// export default function Pie({ data }) {
//   return (
//     <PieChart
//       series={[
//         {
//           data: data,
//           highlightScope: { faded: "global", highlighted: "item" },
//           innerRadius: 30,
//           paddingAngle: 2,
//           cornerRadius: 5,
//         },
//       ]}
//       width={400}
//       height={200}
//       margin={{ right: 5 }}
//     />
//   );
// }

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Pie({ data }) {
  return (
    <div className="flex flex-col items-center">
      <PieChart
        series={[
          {
            data: data,
            highlightScope: { faded: "global", highlighted: "item" },
            innerRadius: 30,
            paddingAngle: 2,
            cornerRadius: 5,
          },
        ]}
        width={300}
        height={200}
        margin={{ right: 5 }}
        slotProps={{
          legend: {
            hidden: true, // Hide the default legend
          },
        }}
      />
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span
              className="w-3 h-3 mr-2 inline-block"
              style={{
                backgroundColor:
                  item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
              }}
            ></span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
