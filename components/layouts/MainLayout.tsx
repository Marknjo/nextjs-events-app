import { GenericProps } from "../../types";

function MainLayout({ children }: GenericProps) {
  return (
    <>
      {/* Header Component */}
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
