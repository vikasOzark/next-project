"use client";

import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function IntegrationCard({
    className,
    cardHeader,
    onClick,
    identifier,
}) {
    return (
        <Card onClick={() => onClick(identifier)}>
            <CardHeader>{cardHeader}</CardHeader>
            <CardContent>
                Streamline your engineering workflow with Gitlab integration and
                keep in sync with issues and merge requests.
            </CardContent>
        </Card>
    );
}
