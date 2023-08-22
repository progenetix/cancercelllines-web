import React from "react";
import {VictoryContainer ,VictoryPie, VictoryLegend } from "victory";

export function AncestryData({ individual }) {
  const processedData = individual?.genomeAncestry
      ?.sort((a, b) => a.label.localeCompare(b.label)) // Sort alphabetically
      ?.filter((datum) => parseFloat(datum.percentage) > 0); // Filter out data points with percentage of 0


    return (
        <>
            {processedData && processedData.length > 0 && (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", width: "100%", marginBottom: "0px" }}>
                    <div style={{ width: "400px", height: "400px"}}>
                        <VictoryPie
                            data={processedData}
                            x="label"
                            y={(datum) => parseFloat(datum.percentage)}
                            radius={70}
                            colorScale={['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3', '#FEE1E8', '#D3C2CE']}
                            style={{ labels: { display: "none" } }}
                            containerComponent={<VictoryContainer
                                responsive={false}
                            />}

                        />
                    </div>
                    <div style={{ width: "40%" }}>
                        <VictoryLegend
                            data={processedData.map((datum) => ({ name: `${datum.label} ${datum.percentage}%` }))}
                            style={{ labels: { fontSize: 16} }}
                            colorScale={['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3', '#FEE1E8', '#D3C2CE']}
                        />
                    </div>
                </div>
            )}
        </>
    );
}