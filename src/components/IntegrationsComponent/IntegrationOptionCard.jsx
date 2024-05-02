"use client";

import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function IntegrationCard({
    className,
    cardHeader,
    onClick,
    identifier,
    connected,
    content,
}) {
    return (
        <Card className={" cursor-pointer"} onClick={() => onClick(identifier)}>
            <CardHeader>
                <div className="flex justify-between">
                    <div className="">{cardHeader}</div>
                    {connected && (
                        <span>
                            <span className="bg-green-600 p-2  font-bold text-white rounded-md ">
                                Connected
                            </span>
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>{content}</CardContent>
        </Card>
    );
}
