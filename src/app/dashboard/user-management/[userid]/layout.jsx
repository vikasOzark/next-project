import BaseAdvancedCardLayout from "../../advance-settings/BaseCardLaylout";

export default function Layout({
  children,
  tickets,
  tags,
  activity,
  changepassword,
}) {
  return (
    <>
      <div className="grid grid-cols-8 gap-4">
        <BaseAdvancedCardLayout
          title={"Tickets"}
          childrenClass={" overflow-x-auto"}
          className={"p-3"}
        >
          {tickets}
        </BaseAdvancedCardLayout>
        <BaseAdvancedCardLayout className={"p-3"}>
          {tags}
        </BaseAdvancedCardLayout>
        <BaseAdvancedCardLayout className={"p-3"}>
          {activity}
        </BaseAdvancedCardLayout>
        <BaseAdvancedCardLayout className={"p-3"}>
          {changepassword}
        </BaseAdvancedCardLayout>
      </div>
    </>
  );
}
