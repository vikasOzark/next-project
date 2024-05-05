"use client";

import { createContext, Suspense } from "react";
import GitlabIntegration from "./integration/gitlab";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { getRequest } from "@/app/apiFunctions/api";
import { QUERY_KEYS } from "@/queryKeys";
import GithubIntegration from "./integration/Github";

export const IntegrationContext = createContext({});

export default function IntegrationPage() {
    const { data } = useSession();
    const { uniqueCompanyId } = data?.user?.userData || {};

    const { data: integrations = [], isLoading } = useQuery({
        queryKey: [QUERY_KEYS.INTEGRATIONS],
        queryFn: () =>
            getRequest({ url: `integration/webhook/${uniqueCompanyId}` }),
        retry: 0,
        select: (data) => data?.data || [],
    });

    return (
        <>
            <IntegrationContext.Provider value={{ integrations, isLoading }}>
                <main>
                    <div className="mb-3">
                        <p className="text-3xl font-bold ">Integrations </p>
                    </div>
                    <section>
                        <div className="grid grid-cols-4 gap-3">
                            <Suspense>
                                <GitlabIntegration />
                            </Suspense>
                            <Suspense>
                                <GithubIntegration />
                            </Suspense>
                        </div>
                    </section>
                </main>
            </IntegrationContext.Provider>{" "}
        </>
    );
}

export const getIntegrationData = (integrations, provider) =>
    integrations.find(
        (integration) =>
            integration.providerName.toLowerCase() === provider.toLowerCase()
    );
