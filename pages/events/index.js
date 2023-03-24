import { getFeaturedEvents } from "@/dummy-data"
import EventList from "@/components/evnents/EventList"
import { useRouter } from "next/router"

const AllEventsPage = () => {
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default AllEventsPage