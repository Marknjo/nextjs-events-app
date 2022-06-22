import { GenericProps } from "../../types";
import MainHeader from "./MainHeader";

function MainLayout({ children }: GenericProps) {
  return (
    <>
      {/* Header Component */}
      <MainHeader />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
