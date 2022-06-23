import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/Button";
import MainHeading from "../../components/ui/MainHeading";
import ResultsTitle from "../../components/ui/ResultsTitle";
import { getFilteredEvents } from "../../data/dummy-data";

const FilteredEventsPage: NextPage = () => {
  const headingContent = <MainHeading>Events Search results</MainHeading>;
  const router = useRouter();
  const monthsName = useMemo(
    () => [
      "January",
      "February",
      "march",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const slug = router.query.slug;

  if (!slug) {
    return (
      <>
        {headingContent}
        <p>
          Invalid search query. Please provide a valid url as /events/yyyy/mm
          format.
        </p>
      </>
    );
  }

  const [year, month] = slug as string[];

  if (!year || !month) {
    return (
      <>
        {headingContent}
        <p>
          Year or month missing in the url. Please provide a valid url as
          /events/yyyy/mm format.
        </p>
      </>
    );
  }

  const numYear = +year;
  const numMonth = +month;

  // Add more validation
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    year.length > 4 ||
    numYear > 2030 ||
    numYear < 2021 ||
    month.length > 2 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <>
        {headingContent}
        <p>
          Invalid search creteria. Ensure year is a number between 2021 and
          2031, while your month is a number between 1 and 12
        </p>
      </>
    );
  }

  const searchEventsResults = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const resultsDate = new Date(numYear, numMonth - 1);

  if (!searchEventsResults || searchEventsResults.length === 0) {
    return (
      <ResultsTitle
        foundEvents={searchEventsResults.length}
        date={resultsDate}
      />
    );
  }

  return (
    <>
      <ResultsTitle
        foundEvents={searchEventsResults.length}
        date={resultsDate}
      />
      ;
      <EventList events={searchEventsResults} />
    </>
  );
};

export default FilteredEventsPage;
