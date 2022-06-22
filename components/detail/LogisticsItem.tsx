import { ElementType } from "react";
import { GenericProps } from "../../types";
import styles from "./LogisticsItem.module.css";

interface LogisticsItemProps extends GenericProps {
  icon: ElementType;
}

function LogisticsItem({ icon: Icon, children }: LogisticsItemProps) {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
