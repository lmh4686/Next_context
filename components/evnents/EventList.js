import EventItem from "./EventItem";
import classes from './event-list.module.css'

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((e) => (
        <EventItem
          key={e.id}
          id={e.id}
          title={e.title}
          location={e.location}
          date={e.date}
          image={e.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
