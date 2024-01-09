import { createMachine } from "xstate";

export const ThemeMachine = createMachine(
  {
    id: "Theme",
    initial: "Light",
    states: {
      Light: {
        on: {
          switch: {
            target: "Dark",
          },
        },
      },
      Dark: {
        on: {
          switch: {
            target: "Light",
          },
        },
      },
    },
    schema: { events: {} as { type: "switch" } },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {},
    services: {},
    guards: {},
    delays: {},
  },
);
