"use client";
import IntegrationCard from "@/components/IntegrationsComponent/IntegrationOptionCard";
import Modal from "@/components/Modal";
import Image from "next/image";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { VscCircleSmallFilled, VscSaveAll, VscSaveAs } from "react-icons/vsc";
import GitlabIntegrationForm from "./GitlabForm";
import { INTEGRATION_PROVIDER } from "@prisma/client";
import { getIntegrationData, IntegrationContext } from "../page";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { ButtonComponent } from "@/components/Buttons";

export default function GitlabIntegration() {
    const { integrations } = useContext(IntegrationContext);
    const [gitlabModal, setGitlabModal] = useState(false);
    const integrationData = getIntegrationData(
        integrations,
        INTEGRATION_PROVIDER.GITLAB
    );

    return (
        <>
            {" "}
            <IntegrationCard
                connected={integrationData}
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
                content={
                    <>
                        {/* {integrationData && (
                            <ConnectionInfo integrationData={integrationData} />
                        )} */}
                        Streamline your engineering workflow with Gitlab
                        integration and keep in sync with issues and merge
                        requests.
                    </>
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
                <div className="mt-2">
                    {integrationData ? (
                        <ConnectionInfo integrationData={integrationData} />
                    ) : (
                        <Suspense>
                            <ConnectionGuide />
                            <GitlabIntegrationForm />
                        </Suspense>
                    )}
                </div>
            </Modal>
        </>
    );
}

const ConnectionGuide = () => {
    return (
        <>
            {" "}
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
                <span className="font-bold text-white">project settings.</span>
                <ul>
                    <li className="flex ">
                        <div className="mt-1">
                            <VscCircleSmallFilled />
                        </div>
                        <div>
                            The token requires{" "}
                            <span className="font-bold text-white">api</span> or{" "}
                            <span className="font-bold text-white">
                                read_api
                            </span>{" "}
                            scope. With the{" "}
                            <span className="font-bold text-white">
                                read_api
                            </span>{" "}
                            scope, We will not post linkbacks to the issue on
                            GitLab merge requests.
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
        </>
    );
};

const ConnectionInfo = ({ integrationData }) => {
    return (
        <>
            <div className="softer-bg mb-1 flex justify-between rounded-md p-2">
                <div className="">
                    <Label>Created by</Label>
                    <div>{integrationData?.createdBy?.first_name} </div>
                </div>
                <div className="">
                    <Label>Created on</Label>
                    <div>{integrationData?.createdAt}</div>
                </div>
            </div>
            <div className="">
                <SwitchForm />
            </div>
        </>
    );
};

export function SwitchForm() {
    const FormSchema = z.object({
        active: z.boolean().default(true),
        issue_event: z.boolean().default(true),
        merge_event: z.boolean().default(true),
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            active: true,
            issue_event: true,
            merge_event: true,
        },
    });

    return (
        <Form {...form}>
            <form className="w-full mt-2">
                <div className="space-y-4 ">
                    <h3 className="text-lg font-medium">
                        Gitlab connection configurations
                    </h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between border-gray-600 rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Service Active</FormLabel>
                                        <FormDescription>
                                            Manage your gitlab integration.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="issue_event"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between border-gray-600 rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Issue Events</FormLabel>
                                        <FormDescription>
                                            Manage your gitlab integration.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="merge_event"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between border-gray-600 rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Merge Events</FormLabel>
                                        <FormDescription>
                                            Manage your gitlab integration.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end my-2">
                    <ButtonComponent icon={<VscSaveAll size={18} />}>
                        Save changes
                    </ButtonComponent>
                </div>
            </form>
        </Form>
    );
}
