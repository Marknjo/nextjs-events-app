import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import EventList from "../../components/events/EventList";
import EventsSearchForm from "../../components/events/EventsSearchForm";
import ErrorAlert from "../../components/ui/ErrorAlert";
import MainHeading from "../../components/ui/MainHeading";
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
      <MainHeading>
        <h1>View All Events</h1>
      </MainHeading>
      {searchHasError && (
        <ErrorAlert>
          <p>
            Year or month not in the search query. Please ensure you have and
            month selected.
          </p>
        </ErrorAlert>
      )}
      <EventsSearchForm onSearch={searEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
