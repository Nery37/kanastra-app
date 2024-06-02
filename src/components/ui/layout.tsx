import React from "react";
import { Outlet } from "react-router-dom";

function Layout(): React.ReactElement {
  return (
    <>
      <main className="p-6 flex flex-col gap-8">
        <Outlet />
      </main>
    </>
  );
}

export { Layout };
