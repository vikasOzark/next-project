import IntegrationCard from "@/components/IntegrationsComponent/IntegrationOptionCard";
import Modal from "@/components/Modal";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { VscCircleSmallFilled } from "react-icons/vsc";
import GitlabIntegrationForm from "./GitlabForm";

export default function GitlabIntegration({ children }) {
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
                    <Suspense>{children}</Suspense>
                </div>
            </Modal>
        </>
    );
}
