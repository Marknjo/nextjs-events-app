import Button from "./Button";
import styles from "./ResultsTitle.module.css";

function ResultsTitle(props: { date: Date; foundEvents: number }) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.title}>
      <h1>
        Found {props.foundEvents} events in {humanReadableDate}
      </h1>
      <Button link='/events'>Browse all events</Button>
    </section>
  );
}

export default ResultsTitle;
