import type { NextPage } from "next";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../data/dummy-data";

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();

  return (
    <>
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
