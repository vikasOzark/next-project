import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import gitlabIntegrate from "@/app/actions/integration";
import { ButtonComponent } from "@/components/Buttons";
import { VscAdd } from "react-icons/vsc";

const formSchema = z.object({
    access_token: z.string().min(16, {
        message: "Not a valid access token.",
    }),
    webhookUrl: z
        .string()
        .min(10, {
            message: "Please generate secret token.",
        })
        .readonly(),
    webhook_secret: z
        .string()
        .min(12, {
            message: "Please generate secret token.",
        })
        .readonly(),
});

export default function GitlabIntegrationForm() {
    // const id = uuid();
    const [id, setId] = useState();
    const form = useForm({
        resolver: zodResolver(formSchema),
        values: {
            access_token: "",
            webhookUrl: "/api/integration/webhook/gitlab",
            webhook_secret: "",
        },
    });

    return (
        <Form {...form}>
            <form
                // onSubmit={form.handleSubmit(onSubmit)}
                action={gitlabIntegrate}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="access_token"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Access Token</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="***************"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Gitlab secret token.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    readonly
                    name="webhookUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Webhook endpoint</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="webhook_secret"
                    readonly
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Access Token</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This token will used to verify the gitlab
                                webhook events.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end mt-1">
                    <ButtonComponent icon={<VscAdd size={18} />} type="submit">
                        Connect
                    </ButtonComponent>
                </div>
            </form>
        </Form>
    );
}
