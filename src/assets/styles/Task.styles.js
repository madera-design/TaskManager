import styled from 'styled-components';
export const Title = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
`;
export const ConatinerBtnAction = styled.div`
  margin-top: 5px;
`;

export const Description = styled.p`
  margin: 0 0 16px 0;
  color: #666;
  display: flex;
  align-items: center;
`;

export const Timer = styled.div`
  font-size: 24px;
  color: #007bff;
`;
export const ContainerTime = styled.div`
  display: flex;
  background-color: #e5e2e291;
  align-items: center;
  border-radius: 8px;
  justify-content: space-around;

  @media (max-width: 1300px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
export const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

