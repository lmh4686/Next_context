import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import EventList from "@/components/evnents/EventList";
import ResultsTitle from "@/components/evnents/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const FilteredEventsPage = (props) => {
  const [events, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-87461-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setEvents(events);
    }
  }, [data]);

  //Should change this value later because useRouter runs after the first render
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      {/* Important for the SEO */}
      <meta
        name="description"
        content={`All filtered events`}
      />
    </Head>
  );

  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      {/* Important for the SEO */}
      <meta
        name="description"
        content={`All events for ${filteredYear}/${filteredMonth}.`}
      />
    </Head>
  );

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const filteredYear = +filterData[0];
//   const filteredMonth = +filterData[1];

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: filteredYear,
//         mont: filteredMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
