"use client"
import { useMachine } from '@xstate/react';
import { ThemeMachine } from '../_machines/ThemeMachine';

export default function ThemeButton(){
  const [state, send] = useMachine(ThemeMachine);

  return (
    <div>
      <div>Value: {state.value}</div>
      <button onClick={() => send({ type: 'switch' })}>
        Switch
      </button>
    </div>
  );
};