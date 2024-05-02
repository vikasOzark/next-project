"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid } from "uuid";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import gitlabIntegrate, { getIntegrations } from "@/app/actions/integration";
import { ButtonComponent } from "@/components/Buttons";
import { VscAdd, VscCopy } from "react-icons/vsc";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { INTEGRATION_PROVIDER } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { createIntegrate } from "@/app/apiFunctions/integration";

const formSchema = z.object({
    access_token: z.string().min(16, {
        message: "Not a valid access token.",
    }),
    webhookUrl: z.string(),
    webhook_secret: z.string(),
});

export default function GitlabIntegrationForm() {
    const { data } = useSession();
    const { userData } = data?.user || {};

    const id = useMemo(() => uuid(), []);
    const gitlab_webhook_url = `/api/integration/webhook/gitlab/${userData?.uniqueCompanyId}`;

    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            access_token: "",
            webhookUrl: gitlab_webhook_url,
            webhook_secret: id,
            provider: INTEGRATION_PROVIDER.GITLAB,
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) =>
            createIntegrate({
                ...formData,
                provider: INTEGRATION_PROVIDER.GITLAB,
            }),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(mutate)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="access_token"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Access token</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Gitlab secret token.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="">
                    <FormLabel>Webhook endpoint</FormLabel>
                    <div className="softer-bg flex items-center justify-between rounded-md p-2">
                        <small>
                            <code>{gitlab_webhook_url}</code>
                        </small>
                        <span
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    gitlab_webhook_url
                                )
                            }
                            className="p-1 cursor-pointer rounded-md temp-bg"
                        >
                            <VscCopy size={20} />
                        </span>
                    </div>
                </div>
                <div className="">
                    <FormLabel>Webhook secret</FormLabel>
                    <div className="softer-bg flex items-center justify-between rounded-md p-2">
                        <small>
                            <code>{id}</code>
                        </small>
                        <span
                            onClick={() => navigator.clipboard.writeText(id)}
                            className="p-1 cursor-pointer rounded-md temp-bg"
                        >
                            <VscCopy size={20} />
                        </span>
                    </div>
                </div>
                <div className="flex justify-end mt-1">
                    <ButtonComponent
                        isLoading={isLoading}
                        icon={<VscAdd size={18} />}
                        type="submit"
                    >
                        Connect
                    </ButtonComponent>
                </div>
            </form>
        </Form>
    );
}
