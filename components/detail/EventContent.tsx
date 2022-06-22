import { GenericProps } from "../../types";
import styles from "./EventContent.module.css";

function EventContent(props: GenericProps) {
  return <section className={styles.content}>{props.children}</section>;
}

export default EventContent;
