"use client";
import IntegrationCard from "@/components/IntegrationsComponent/IntegrationOptionCard";
import Modal from "@/components/Modal";
import Image from "next/image";
import { Suspense, useContext, useState } from "react";
import { VscCircleSmallFilled, VscSaveAll } from "react-icons/vsc";
import GitlabIntegrationForm from "./forms/GitlabForm";
import { INTEGRATION_PROVIDER } from "@prisma/client";
import { getIntegrationData, IntegrationContext } from "../page";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useMutation, useQueryClient } from "react-query";
import { patchRequest } from "@/app/apiFunctions/api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/queryKeys";
import handleTimeFormat from "@/utils/dateTimeFormat";

export default function GitlabIntegration() {
    const { integrations, isLoading } = useContext(IntegrationContext);
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
                        loading="lazy"
                        width={50}
                        height={50}
                        src={"/svg/gitlab.svg"}
                    />
                }
                content={
                    <>
                        Streamline your engineering workflow with Gitlab
                        integration and keep in sync with issues and merge
                        requests.
                    </>
                }
            />
            <Modal
                isLoading={isLoading}
                dialogClass={"w-[13rem]"}
                icon={
                    <Image
                        alt="gitlab"
                        loading="lazy"
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
                        <ConnectionInfoAndUpdate
                            integrationData={integrationData}
                        />
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

const ConnectionInfoAndUpdate = ({ integrationData }) => {
    const dateTime = (date) => {
        return handleTimeFormat(date, {
            isFormated: true,
            dateTime: true,
        });
    };

    return (
        <>
            <div className="softer-bg mb-1 flex justify-between rounded-md p-2">
                <div className="">
                    <Label>Created by</Label>
                    <div>{integrationData?.createdBy?.first_name} </div>
                </div>
                <div className="">
                    <Label>Created on</Label>
                    <div>{dateTime(integrationData.createdAt)}</div>
                </div>
            </div>
            <div className="">
                <SwitchForm integrationData={integrationData} />
            </div>
        </>
    );
};

export function SwitchForm({ integrationData }) {
    const queryClient = useQueryClient();

    const FormSchema = z.object({
        active: z.boolean().default(true),
        issue_event: z.boolean().default(true),
        merge_event: z.boolean().default(true),
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            active: integrationData?.isActive,
            issue_event: integrationData?.config_json?.issue_event,
            merge_event: integrationData?.config_json?.merge_event,
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) =>
            patchRequest({
                url: `integration/${integrationData.id}`,
                formData: formData,
            }),
        onSuccess: (data) => {
            data?.success
                ? toast.success(data.message)
                : toast.error(data?.message);
            data.success &&
                queryClient.invalidateQueries([QUERY_KEYS.INTEGRATIONS]);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(mutate)} className="w-full mt-2">
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
                                            If this setting is de-active events
                                            will shut down the webhook events.
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
                                            If this setting is de-active events,
                                            will not create any tickets.
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
                                            If this setting is de-active events,
                                            will not close automatically.
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
                    <ButtonComponent
                        isLoading={isLoading}
                        icon={<VscSaveAll size={18} />}
                    >
                        Save changes
                    </ButtonComponent>
                </div>
            </form>
        </Form>
    );
}
