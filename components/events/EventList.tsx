import { EventsModel } from "../../data/dummy-data";
import styles from "./EventList.module.css";

interface props {
  events: EventsModel[];
}

const EventList = ({ events }: props) => {
  return (
    <section className={styles.list}>
      {events.map((event) => (
        <article key={event.id} {...event}>
          {event.title}
        </article>
      ))}
    </section>
  );
};

export default EventList;
