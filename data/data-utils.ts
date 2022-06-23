import { join } from "path";
import { EventsModel } from "./dummy-data";

const eventStore: EventsModel[] = [];
const URL = "http://localhost:3000";

export async function findFeaturedEvents() {
  const eventsData = await findAllEvents();
  return eventsData.filter((event) => event.isFeatured);
}

export async function findAllEvents(): Promise<EventsModel[]> {
  const response = await fetch(`${URL}/data/data.json`);

  const eventsData = await response.json();

  return eventsData;
}

export async function findEventsByDateAndMonth(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;

  const eventsData = await findAllEvents();

  let filteredEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id: string) {
  const eventsData = await findAllEvents();

  return eventsData.find((event) => event.id === id);
}
