import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const Chip = styled.div`
  border-radius: 4px;
  font-size: 13px;
  margin-left: 10px;
  height: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f15a25;
  align-items: center;
  margin-top: 5px;
`;
export const Heading = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #f15a24;
  border-bottom: solid;
  width: fit-content;
  margin-top: 5px;
`;

export const Errors = styled.div`
  display: block;
  color: red;
  position: absolute;
  top: 38px;
  font-size: 12px;
  left: 6px;
`;

export const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f15a24;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 15px;
`;

export const collaspeToggleIcon = styled.span`
  font-size: 25px;
`;
