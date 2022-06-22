import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import EventList from "../../components/events/EventList";
import EventsSearchForm from "../../components/events/EventsSearchForm";
import { getAllEvents } from "../../data/dummy-data";

const AllEventsPage: NextPage = () => {
  const events = getAllEvents();
  const [searchHasError, setSearchHasError] = useState<boolean>(false);
  const router = useRouter();

  const searEventsHandler = function (
    year: string | undefined,
    month: string | undefined
  ) {
    /// handle errors
    if (!year || !month) {
      setSearchHasError(true);
    }

    /// redirect if there are no errors
    if (year && month) {
      router.push(`/events/${year}/${month}`);
    }
  };

  return (
    <>
      <EventsSearchForm onSearch={searEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
