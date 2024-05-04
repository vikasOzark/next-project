import { useContext, useState } from "react";
import { TicketDataContext } from "../../page";
import { TagLabel } from "@/components/TagComponent";
import Image from "next/image";
import { ButtonComponent } from "@/components/Buttons";
import Modal from "@/components/Modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { VscLink } from "react-icons/vsc";
import handleTimeFormat from "@/utils/dateTimeFormat";

export const GitlabCreatedActivityPill = () => {
    const { ticketData } = useContext(TicketDataContext);
    const [open, setOpen] = useState(false);
    const gitlabData = ticketData?.webhook_body || {};

    const modalProps = {
        open,
        setOpen,
        modalTitle: "Gitlab",
        icon: (
            <Image
                alt="This ticket is created by gitlab issue event."
                loading="lazy"
                width={20}
                height={20}
                src={"/svg/gitlab.svg"}
            />
        ),
    };

    return (
        <>
            <ButtonComponent
                onClick={() => setOpen(true)}
                className={
                    "p-0 hover:bg-transparent flex items-center rounded-full"
                }
                type={"button"}
            >
                <GitlabUserPill user={gitlabData.user} />
            </ButtonComponent>
            <Modal {...modalProps}>
                <GitLabInformation />
            </Modal>
        </>
    );
};

const GitlabUserPill = ({ user }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src={user?.avatar_url} />
            </Avatar>
            <span className=" text-lg">{user?.username}</span>
        </div>
    );
};

export default function GitLabInformation() {
    const { ticketData } = useContext(TicketDataContext);
    const gitlabData = ticketData?.webhook_body || {};

    const labels = gitlabData.object_attributes.labels || [];
    const issue = gitlabData.object_attributes || {};

    const date = (dateTimeString) =>
        handleTimeFormat(dateTimeString || "", {
            isFormated: true,
            dateTime: true,
        });

    return (
        <>
            <div className=" grid grid-cols-3 gap-2 p-2">
                <div className="">
                    <Label className={"text-xl"}>Project</Label>
                    <div className="">
                        <Link
                            className="flex items-center gap-1 text-lg"
                            href={gitlabData?.project.web_url}
                        >
                            {gitlabData?.project?.name}
                            <VscLink size={20} />
                        </Link>
                    </div>
                </div>
                <div className="Assinees">
                    <Label className={"text-xl"}>Author</Label>
                    <GitlabUserPill user={gitlabData.user} />
                </div>
                <div className="">
                    <Label className={"text-xl"}>State</Label>
                    <div>{issue.state}</div>
                </div>

                <div className="">
                    <Label className={"text-xl"}>Created</Label>
                    <div>{date(issue.created_at)}</div>
                </div>
                <div className="">
                    <Label className={"text-xl"}>Updated</Label>
                    <div>{date(issue.updated_at)}</div>
                </div>
                <div className="">
                    <Label className={"text-xl"}>Assignees</Label>
                    {gitlabData.assignees.map((person) => (
                        <GitlabUserPill
                            key={`person-assigned-${person.id}`}
                            user={person}
                        />
                    ))}
                </div>
                <div className="">
                    <Label className={"text-xl"}>Labels</Label>
                    {labels.map((issue) => (
                        <TagLabel
                            key={issue.id}
                            title={issue.title}
                            color={issue.color}
                        />
                    ))}
                </div>
                <div className="">
                    <Link
                        className="flex text-blue-500 items-center gap-1 text-lg"
                        href={issue.url}
                    >
                        See more
                        <VscLink size={20} />
                    </Link>
                </div>
            </div>
        </>
    );
}
7834977568;
