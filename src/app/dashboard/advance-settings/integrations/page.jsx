"use client";

import IntegrationCard from "@/components/IntegrationsComponent/IntegrationOptionCard";
import Image from "next/image";
import GitlabIntegration from "./integration/gitlab";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function IntegrationPage() {
    return (
        <>
            <main>
                <div className="mb-3">
                    <p className="text-3xl font-bold ">Integrations </p>
                </div>
                <section>
                    <div className="grid grid-cols-4 gap-3">
                        <GitlabIntegration />
                    </div>
                </section>
            </main>
        </>
    );
}
