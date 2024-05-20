"use client";
import { useRef } from "react";
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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonComponent } from "@/components/Buttons";
import { VscAdd } from "react-icons/vsc";
import { INTEGRATION_PROVIDER } from "@prisma/client";
import { useMutation, useQuery } from "react-query";
import { createIntegrate } from "@/app/apiFunctions/integration";
import { getDepartmentData } from "@/app/dashboard/tickets/component/forms/utils";
import { QUERY_KEYS } from "@/queryKeys";
import toast from "react-hot-toast";

const formSchema = z.object({
    access_token: z.string().min(16, {
        message: "Not a valid access token.",
    }),
    projectId: z.string(),
    openProjectUrl: z.string().url(),
    department: z.string().optional(),
});

export default function OpenProjectIntegrationForm() {
    const departmentRef = useRef(null);

    const defaultDepartmentId = localStorage.getItem(
        "ticket_defaultDepartment"
    );

    const { data: departments = [] } = useQuery({
        queryKey: [QUERY_KEYS.DEPARTMENT_LIST],
        queryFn: getDepartmentData,
        select: ({ data }) => data,
    });

    /**
     * @type {import("react-hook-form").UseFormProps}
     */
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) =>
            createIntegrate({
                ...formData,
                provider: INTEGRATION_PROVIDER.OPEN_PROJECT,
                department: departmentRef.current.value,
            }),
        onSuccess: ({ message, success }) => {
            success ? toast.success(message) : toast.error(message);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(mutate)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="access_token"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Access token</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Department (Project)</FormLabel>
                                    <FormControl>
                                        <select
                                            className="py-2 temp-bg border border-gray-500 rounded-lg px-2 w-full"
                                            {...field}
                                            ref={departmentRef}
                                        >
                                            <option value="">
                                                select department
                                            </option>
                                            {departments?.map((item) => (
                                                <option
                                                    key={item.id}
                                                    selected={
                                                        item.id ===
                                                        defaultDepartmentId
                                                    }
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <div className="">
                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Id</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Project id of the open project.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="openProjectUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Open Project Url</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
