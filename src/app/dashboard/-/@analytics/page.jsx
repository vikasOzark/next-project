"use client";
import ReactEcharts from "echarts-for-react";
import React, { useRef } from "react";

export default function Analytics() {
    /**
     * @type {import("echarts").EChartsOption}
     */
    const option = {
        darkMode: true,
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line",
                smooth: true,
            },
        ],
        textStyle: {
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
        },
    };

    return (
        <div>
            <div className=" text-white font-bold text-sm md:text-lg lg:text-lg">
                Analytics
            </div>
            <div className="text-white ">
                <ReactEcharts style={{ height: "452px" }} option={option} />
            </div>
        </div>
    );
}
