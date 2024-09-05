import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <h1>Scope And Sequence Editor</h1>
      <Outlet />
    </div>
  );
}
