"use client";
import IntegrationCard from "@/components/IntegrationsComponent/IntegrationOptionCard";
import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { VscAdd, VscCircleSmallFilled, VscCopy } from "react-icons/vsc";
import { ButtonComponent } from "@/components/Buttons";

const formSchema = z.object({
    access_token: z.string().min(16, {
        message: "Not a valid access token.",
    }),
});

export default function GitlabIntegration() {
    const [gitlabModal, setGitlabModal] = useState(false);
    return (
        <>
            {" "}
            <IntegrationCard
                onClick={() => setGitlabModal(true)}
                cardHeader={
                    <Image
                        alt="gitlab"
                        loading="eager"
                        width={50}
                        height={50}
                        src={"/svg/gitlab.svg"}
                    />
                }
            />
            <Modal
                dialogClass={"w-[13rem]"}
                icon={
                    <Image
                        alt="gitlab"
                        loading="eager"
                        width={40}
                        height={40}
                        src={"/svg/gitlab.svg"}
                    />
                }
                modalTitle={"Connect to Gitlab"}
                open={gitlabModal}
                setOpen={setGitlabModal}
            >
                <p className="font-bold text-lg my-3">API Access token</p>
                <span className="font-medium text-gray-300">
                    Get an access token from GitLab.{" "}
                    <a
                        href="https://gitlab.com/-/profile/personal_access_tokens"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="font-bold text-blue-500">
                            user settings
                        </span>
                    </a>{" "}
                    or{" "}
                    <span className="font-bold text-white">
                        project settings.
                    </span>
                    <ul>
                        <li className="flex ">
                            <div className="mt-1">
                                <VscCircleSmallFilled />
                            </div>
                            <div>
                                The token requires{" "}
                                <span className="font-bold text-white">
                                    api
                                </span>{" "}
                                or{" "}
                                <span className="font-bold text-white">
                                    read_api
                                </span>{" "}
                                scope. With the{" "}
                                <span className="font-bold text-white">
                                    read_api
                                </span>{" "}
                                scope, Linear will not post linkbacks to the
                                issue on GitLab merge requests.
                            </div>
                        </li>
                        <li className="flex">
                            <div className="mt-1">
                                <VscCircleSmallFilled />
                            </div>
                            <div>
                                If you use a project access token, it requires{" "}
                                <span className="font-bold text-white">
                                    reporter
                                </span>{" "}
                                role access.
                            </div>
                        </li>
                    </ul>
                </span>
                <div className="mt-2">
                    <GitlabIntegrationForm />
                </div>

                <div className="my-2 softer-bg rounded-lg p-2">
                    <p>Webhook URL</p>
                    <div
                        onmousedown="return false;"
                        onselectstart="return false;"
                        className="border rounded-md  px-2 py-1 flex justify-between items-center  bg-gray-800 border-gray-600"
                    >
                        http://test.com
                        <span
                            className="cursor-pointer hover:bg-gray-500 p-2 rounded-md"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    "http://test.com"
                                );
                            }}
                        >
                            <VscCopy size={18} />
                        </span>
                    </div>

                    <div className="flex justify-end mt-1">
                        <ButtonComponent
                            icon={<VscAdd size={18} />}
                            type="submit"
                        >
                            Activate
                        </ButtonComponent>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export function GitlabIntegrationForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            access_token: "",
        },
        disabled: true,
    });

    /**
     * @param {z.infer<typeof formSchema>} values
     */
    function onSubmit(values) {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                This service is not available yet.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
