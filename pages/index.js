import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/evnents/EventList";
import EventsSearch from "@/components/evnents/EventsSearch";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const events = getAllEvents();

  const router = useRouter();

  function findEventsHandler(y, m) {
    const fullPath = `events/${y}/${m}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
