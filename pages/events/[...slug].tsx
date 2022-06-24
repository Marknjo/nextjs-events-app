import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EventList from "../../components/events/EventList";
import ErrorAlert from "../../components/ui/ErrorAlert";
import ResultsTitle from "../../components/ui/ResultsTitle";
import { findEventsByDateAndMonth } from "../../data/data-utils";
import { EventsModel } from "../../data/dummy-data";

// interface SearchResultsProps {
//   searchResults: EventsModel[] | [];
//   resultsDate?: string;
//   hasError: {
//     status: boolean;
//     message?: string;
//   };
// }

// const FilteredEventsPage: NextPage<SearchResultsProps> = ({
//   searchResults,
//   resultsDate,
//   hasError,
// }) => {

const FilteredEventsPage: NextPage = () => {
  const [searchResults, setSearchResults] = useState<EventsModel[] | []>([]);
  const [isLoading, setIsloading] = useState(false);
  const [paramsHasErrors, setParamsHasErrors] = useState(false);
  const [validationFailed, setValidationsFailed] = useState(false);
  const [numYear, setNumYear] = useState<number>();
  const [numMonth, setNumMonth] = useState<number>();

  //
  const router = useRouter();

  const slug = router.query.slug;
  useEffect(() => {
    if (!slug) {
      setIsloading(true);
    }

    !slug ? setIsloading(true) : setIsloading(false);

    /// Slug found
    if (slug) {
      setIsloading(false);

      const [year, month] = slug as string[];

      /// Evaluate month and year
      !year || !month ? setParamsHasErrors(true) : setParamsHasErrors(false);

      /// Month and year provided
      if (year && month) {
        const numYear = +year;
        const numMonth = +month;

        setNumMonth(numMonth);
        setNumYear(numYear);

        /// Handle validation errors
        isNaN(numYear) ||
        isNaN(numMonth) ||
        year.length > 4 ||
        numYear > 2030 ||
        numYear < 2021 ||
        month.length > 2 ||
        numMonth > 12 ||
        numMonth < 1
          ? setValidationsFailed(true)
          : setValidationsFailed(false);

        /// Find data if there is no validation errors
        if (!validationFailed) {
          const foundSearchEvents = async () => {
            const searchResults = await findEventsByDateAndMonth({
              year: numYear,
              month: numMonth,
            });

            setSearchResults(searchResults);
          };
          foundSearchEvents();
        }
      }
    }
  }, [slug, validationFailed]);

  /// Show loading if app is yet to get the slug
  if (isLoading) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    );
  }

  /// Show errors if year or month is incorrect
  if (paramsHasErrors) {
    return (
      <ErrorAlert>
        <p>
          Year or month missing in the url. Please provide a valid url as
          /events/yyyy/mm format.
        </p>
      </ErrorAlert>
    );
  }

  // Show errors if there is validation errors
  if (validationFailed) {
    return (
      <ErrorAlert>
        <p>
          Invalid search creteria. Ensure year is a number between 2021 and
          2031, while your month is a number between 1 and 12
        </p>
      </ErrorAlert>
    );
  }

  /// All validations passed
  const resultsDate = new Date(numYear!, numMonth! - 1);

  if (!searchResults || searchResults.length === 0) {
    return (
      <ResultsTitle foundEvents={searchResults.length} date={resultsDate} />
    );
  }

  /// Server side data implementation - requires everytime to fetch data from the server
  // const transformedResultsDate = JSON.parse(resultsDate!);

  // /// Handle errors
  // if (hasError.status) {
  //   if (hasError.message) {
  //     return (
  //       <ErrorAlert>
  //         <p>{hasError.message}</p>
  //       </ErrorAlert>
  //     );
  //   }

  //   return (
  //     <ResultsTitle
  //       foundEvents={searchResults.length}
  //       date={transformedResultsDate}
  //     />
  //   );
  // }

  return (
    <>
      <ResultsTitle foundEvents={searchResults.length} date={resultsDate} />
      ;
      <EventList events={searchResults} />
    </>
  );
};

export default FilteredEventsPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;

//   const hasError: {
//     status: boolean;
//     message?: string;
//   } = { status: false };

//   const slug = params?.slug;

//   if (!slug) {
//     hasError.status = true;
//     hasError.message = "Loading...";
//     return {
//       props: {
//         searchResults: [],
//         hasError,
//       },
//     };
//   }

//   const [year, month] = slug as string[];

//   if (!year || !month) {
//     hasError.status = true;
//     hasError.message =
//       "Year or month missing in the url. Please provide a valid url as /events/yyyy/mm format.";

//     return {
//       props: {
//         searchResults: [],
//         hasError,
//       },
//     };
//   }

//   const numYear = +year;
//   const numMonth = +month;

//   // Add more validation
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     year.length > 4 ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     month.length > 2 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     hasError.status = true;
//     hasError.message =
//       "Invalid search creteria. Ensure year is a number between 2021 and 2031, while your month is a number between 1 and 12";

//     return {
//       props: {
//         searchResults: [],
//         hasError,
//       },
//     };
//   }

//   const searchResults = await findEventsByDateAndMonth({
//     year: numYear,
//     month: numMonth,
//   });

//   const resultsDate = new Date(numYear, numMonth - 1);

//   if (!searchResults || searchResults.length === 0) {
//     hasError.status = true;
//     return {
//       props: {
//         searchResults: [],
//         hasError,
//       },
//     };
//   }

//   hasError.status = false;
//   return {
//     props: {
//       searchResults,
//       resultsDate: JSON.stringify(resultsDate),
//       hasError,
//     },
//   };
// };
