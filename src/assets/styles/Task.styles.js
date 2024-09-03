import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 350px;
`;

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
  margin-bottom: 16px;
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
`;
export const TitleCrad = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

