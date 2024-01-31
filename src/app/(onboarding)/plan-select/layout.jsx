"use client";

export default function Layout({ children, select, detail }) {
  return (
    <>
      <div className="h-screen w-screen">
        <div className="grid place-content-center mx-auto">{select}</div>
      </div>
    </>
  );
}
