"use client";
import IntegrationCard from "@/components/IntegrationsComponent/IntegrationOptionCard";
import Modal from "@/components/Modal";
import Image from "next/image";
import { Suspense, useContext, useState } from "react";
import { VscCircleSmallFilled, VscSaveAll } from "react-icons/vsc";
import { INTEGRATION_PROVIDER } from "@prisma/client";
import { getIntegrationData, IntegrationContext } from "../page";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SiOpenproject } from "react-icons/si";
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
import DateTime from "@/components/DateTime";
import handleTimeFormat from "@/utils/dateTimeFormat";
import OpenProjectIntegrationForm from "./forms/OpenProjectForm";

export default function OpenProjectIntegration() {
    const { integrations, isLoading } = useContext(IntegrationContext);
    const [gitlabModal, setOpenProjectModal] = useState(false);
    const integrationData = getIntegrationData(
        integrations,
        INTEGRATION_PROVIDER.GITHUB
    );

    return (
        <>
            {" "}
            <IntegrationCard
                connected={integrationData}
                onClick={() => setOpenProjectModal(true)}
                cardHeader={
                    <SiOpenproject className="text-blue-400" size={40} />
                }
                content={
                    <>
                        Get is sync with openProject link-back integration and
                        get auto create your work packages
                    </>
                }
            />
            <Modal
                isLoading={isLoading}
                dialogClass={"w-[13rem]"}
                icon={<SiOpenproject className="text-blue-400" size={30} />}
                modalTitle={"Connect to OpenProject"}
                open={gitlabModal}
                setOpen={setOpenProjectModal}
            >
                <div className="mt-2">
                    {integrationData ? (
                        <></>
                    ) : (
                        <Suspense>
                            <ConnectionGuide />
                            <OpenProjectIntegrationForm />
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
                Get an access token from openProject, under the{" "}
                <span className=" font-bold text-white">My Account</span>.
            </span>
        </>
    );
};
