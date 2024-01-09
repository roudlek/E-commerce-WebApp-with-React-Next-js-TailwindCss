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
  