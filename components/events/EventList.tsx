import { EventsModel } from "../../data/dummy-data";
import EventItem from "./EventItem";
import styles from "./EventList.module.css";

interface props {
  events: EventsModel[];
}

const EventList = ({ events }: props) => {
  return (
    <section className={styles.list}>
      {events.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </section>
  );
};

export default EventList;
