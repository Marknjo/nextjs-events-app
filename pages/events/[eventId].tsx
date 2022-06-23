import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import { useRouter } from "next/router";
import EventContent from "../../components/detail/EventContent";
import EventLogistics from "../../components/detail/EventLogistics";
import EventSummary from "../../components/detail/EventSummary";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { findAllEvents, findEventById } from "../../data/data-utils";
import { EventsModel } from "../../data/dummy-data";

const EventsDetailPage: NextPage<{ event: EventsModel | undefined }> = ({
  event,
}) => {
  // Check if event id is found
  if (!event) {
    /// handle events error

    return (
      <ErrorAlert>
        <p>Event not found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary {...event} />
      <EventLogistics {...event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventsDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const foundEvents = await findAllEvents();

  const params = foundEvents.map((event) => {
    return {
      params: { eventId: event.id },
    };
  });

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const id = params!.eventId as string;

  const foundEvent = await findEventById(id);

  return {
    props: {
      event: foundEvent,
    },
  };
};
