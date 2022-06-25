import type { GetStaticProps, NextPage } from "next";
import EventList from "../components/events/EventList";
import MainHeading from "../components/ui/MainHeading";
import { findFeaturedEvents } from "../data/data-utils";
import { EventsModel } from "../data/dummy-data";

const FeaturedEventsPage: NextPage<{ events: EventsModel[] | [] }> = ({
  events,
}) => {
  return (
    <>
      <MainHeading>
        <h1>Featured Events</h1>
      </MainHeading>
      <EventList events={events} />
    </>
  );
};

export default FeaturedEventsPage;

export const getStaticProps: GetStaticProps = async () => {
  const foundEvents = await findFeaturedEvents();

  return {
    props: {
      events: foundEvents,
    },
    revalidate: 60,
  };
};
