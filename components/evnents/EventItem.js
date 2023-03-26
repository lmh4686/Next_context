import Button from "../ui/button";
import classes from "./event-item.module.css";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
//img optimization
import Image from "next/image";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const readableDate = new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const exploreLink = `/events/${id}`;
  const address = location.replace(", ", "\n");

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={500} height={160} />
      <div className="{classes.content}">
        <div className="{classes.summary}">
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
