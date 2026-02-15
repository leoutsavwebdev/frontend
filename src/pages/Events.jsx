import React, { useEffect, useState } from "react";
import { useAppData } from "../context/AppData";
import EventCard from "../components/EventCard";
import "./Events.css";

const Events = () => {
  const { events } = useAppData();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (events && events.length > 0) {
      setList(events.filter((e) => !e.status || e.status === "open" || e.status === "ongoing"));
    } else {
      fetch("/events.json")
        .then((res) => res.json())
        .then((data) => setList(data));
    }
  }, [events]);

  return (
    <div className="events-page">
      <h1 className="events-title">All Events</h1>
      <div className="events-grid">
        {list.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
