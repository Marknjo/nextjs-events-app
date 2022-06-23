import type { NextPage } from "next";
import { useRouter } from "next/router";
import EventContent from "../../components/detail/EventContent";
import EventLogistics from "../../components/detail/EventLogistics";
import EventSummary from "../../components/detail/EventSummary";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getEventById } from "../../data/dummy-data";

const EventsDetailPage: NextPage = () => {
  const router = useRouter();

  const id = router.query.eventId! as string;

  const event = getEventById(id);

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
