export default function Layout({ children, team }) {
  return (
    <>
      <div className="">
        {children}
        {team}
      </div>
    </>
  );
}
