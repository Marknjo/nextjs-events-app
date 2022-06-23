import { GenericProps } from "../../types";
import styles from "./ErrorAlert.module.css";

function ErrorAlert(props: GenericProps) {
  return <div className={styles.alert}>{props.children}</div>;
}

export default ErrorAlert;
