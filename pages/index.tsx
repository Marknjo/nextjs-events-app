import type { NextPage } from "next";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../data/dummy-data";

const FeaturedEventsPage: NextPage = () => {
  const events = getFeaturedEvents();

  return (
    <>
      <h1 className='centered'>Featured Events</h1>
      <EventList events={events} />
    </>
  );
};

export default FeaturedEventsPage;
