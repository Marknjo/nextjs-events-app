import { EventsModel } from "./dummy-data";

const eventStore: EventsModel[] = [];
const eventsAPIRespose = "http://localhost:3000/api/events";

export async function findFeaturedEvents() {
  const eventsData = await findAllEvents();
  return eventsData.filter((event) => event.isFeatured);
}

/**
 * Simulates API call in the server to get all data
 * @returns returns a collection of data from data.json
 */
export async function findAllEvents(): Promise<EventsModel[]> {
  const response = await fetch(eventsAPIRespose);

  const eventsData: {
    data: { content: string };
    status: string;
  } = await response.json();

  return JSON.parse(eventsData.data.content);
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

export async function findEventById(id: string) {
  const eventsData = await findAllEvents();

  return eventsData.find((event) => event.id === id);
}
