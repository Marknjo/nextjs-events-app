import type { NextPage } from "next";
import EventList from "../components/events/EventList";
import MainHeading from "../components/ui/MainHeading";
import { getFeaturedEvents } from "../data/dummy-data";

const FeaturedEventsPage: NextPage = () => {
  const events = getFeaturedEvents();

  return (
    <>
      {/* <section className='main-heading'>
        <h1>Featured Events</h1>
      </section> */}

      <MainHeading>Featured Events</MainHeading>
      <EventList events={events} />
    </>
  );
};

export default FeaturedEventsPage;
