import { EventsModel } from "../../data/dummy-data";
import styles from "./EventSummary.module.css";

interface EventSummaryProps extends EventsModel {}

function EventSummary(props: EventSummaryProps) {
  const { title } = props;

  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
