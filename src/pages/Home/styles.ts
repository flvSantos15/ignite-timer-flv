/* eslint-disable prettier/prettier */
import styled from 'styled-components'

export const HomeContainer = styled.main`
  /* height: 100%; */
  /* flex: 1; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

  @media (max-width: 700px) {
    padding: 0;
    border: 1px solid red;
  }
`

export const BaseCountDownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme['gray-100']};

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['red-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
