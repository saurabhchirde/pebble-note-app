import { v4 as uuid } from "uuid";

const demoNotes = [
  {
    id: uuid(),
    title: "Class",
    text: "Class on every Saturday and sunday",
    pinned: false,
  },
  {
    id: uuid(),
    title: "Movie to watch",
    text: "Ants, Croods, Frozen ",
    pinned: false,
  },
  { id: uuid(), title: "Lent", text: "Lent 2000/- to kashi", pinned: false },
  { id: uuid(), title: "Header", text: "Check CL hearder ", pinned: false },
  { id: uuid(), title: "Mobile", text: "Recharge mobile", pinned: false },
];

export { demoNotes };
