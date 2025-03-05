/* eslint-disable prettier/prettier */
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useFormContext } from "react-hook-form";
import { useCycles } from "../../../../context/useCountdown";
import { useThemeConfig } from "../../../../context/useTheme";

export function NewCycleForm() {
  const { activeCycle } = useCycles();
  const { register } = useFormContext();
  const { themeConfig } = useThemeConfig();

  return (
    <FormContainer defaultTheme={themeConfig}>
      <label htmlFor="task" id="taskLabel">
        Vou trabalhar em
      </label>

      <TaskInput
        id="task"
        data-cy="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <div>
        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          data-cy="minutesAmount"
          placeholder="00"
          step={1}
          min={1}
          max={60}
          disabled={!!activeCycle}
          {...register("minutesAmount", {
            valueAsNumber: true,
          })}
        />

        <span>minutos.</span>
      </div>
    </FormContainer>
  );
}
