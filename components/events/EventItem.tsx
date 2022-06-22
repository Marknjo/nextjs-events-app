// import Image from "next/image";
import Link from "next/link";
import { EventsModel } from "../../data/dummy-data";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DateIcon from "../icons/DateIcon";
import Button from "../ui/Button";
import styles from "./EventItem.module.css";

interface props extends EventsModel {}

const EventItem = ({ location, id, image, date, title }: props) => {
  const transformedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const locationStr = location.replace(", ", "\n");

  const eventsPage = `/events/${id}`;

  return (
    /// @TODO: Implemet icons for time, address and button elements
    <article className={styles.item}>
      <img src={image} alt={title}></img>
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{transformedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{locationStr}</address>
          </div>
        </div>

        <div className={styles.actions}>
          <Button link={eventsPage}>
            <span>Explore More</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default EventItem;
