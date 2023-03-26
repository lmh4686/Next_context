import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "@/components/evnents/EventList";
import Head from "next/head";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        {/* Important for the SEO */}
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
