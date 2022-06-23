import React from "react";
import { GenericProps } from "../../types";

import styles from "./MainHeading.module.css";

function MainHeading({ children }: GenericProps) {
  return <section className={styles["main-heading"]}>{children}</section>;
}

export default MainHeading;
