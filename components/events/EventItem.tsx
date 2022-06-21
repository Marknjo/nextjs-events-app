// import Image from "next/image";
import Link from "next/link";
import { EventsModel } from "../../data/dummy-data";
import styles from "./EventItem.module.css";

interface props extends EventsModel {}

const EventItem = ({ location, id, image, date, title }: props) => {
  const transformedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const locationStr = location.replace(",", "\n");

  const eventsPage = `/events/${id}`;

  return (
    <article className={styles.item}>
      <img src={image} alt={title}></img>
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <time>{transformedDate}</time>
          </div>
          <div className={styles.address}>
            <address>{locationStr}</address>
          </div>
        </div>

        <div className={styles.actions}>
          {/* @TODO: Design a Button element */}
          <Link href={eventsPage}>Explore More</Link>
        </div>
      </div>
    </article>
  );
};

export default EventItem;
