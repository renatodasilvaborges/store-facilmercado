import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface ContanierProps {
  isFocused: boolean; 
}

interface HourContentProps {
  isFocused: boolean; 
}

export const Container = styled.div`

  > header {
    height: 144px;
    background: #EFEEFF;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    
      svg {
        color: #999591;
        transition: color 0.3s;
      }
    
      a:hover {
        svg {
          color: ${lighten(0.2, '#999591')};
        }
      }
    }
  }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex; 

`;

export const Schedule = styled.div`
    flex: 1; 
    margin-right: 120px; 

    h1 {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
        color:  #6C63FF;
        display: flex; 
        align-items: center; 
        font-weight: 500; 

        span {
            display: flex;
            align-items: center; 
        } 

        span + span::before {
            content: '';
            width: 1px;
            height: 12px;
            background: #6C63FF;  
            margin: 0 8px; 
        }
    }
`;

export const Section = styled.aside`
    margin-top: 48px;
    margin-bottom: 48px;
    
    > a {
        text-decoration: none; 
    }

    > div {
        margin-top: 16px; 
    }

    > strong {
        color: #e4e2ff;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #EFEEFF; 
        display: block; 
        padding-bottom: 16px;
        margin-bottom: 16px; 
    } 

    > p {
        color: #efeefb;
    }
`;

export const Product = styled.div<ContanierProps>`
    display: flex;
    align-items: center; 
    margin-top: 16px; 

    span {
        
        margin-left: auto;
        display: flex;
        align-items: center; 
        color: #999591; 
        width: 70px;

        svg {
            color: #6C63FF;
            margin-right: 8px;
        }
    }

    div {
        flex: 1; 
        background: #FFF; 
        display: flex;
        align-items: center; 
        padding: 19px 24px; 
        border-radius: 10px;
        margin-left: 24px;
        border: 1px solid #EFEEFF;  

        ${ (props) => 
        props.isFocused && 
        css`
            border: 2px solid #6C63FF;
            color: #6C63FF; 
        `}


        img {
            width: 56px;
            height: 56px; 
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #6C6C80;
            font-size: 20px; 
            font-weight: 500; 

        }

        &:hover{
                opacity: 0.8;
                background: #f8f7ff; 
                cursor: pointer; 
                
        }
    }
`;

export const Calendar = styled.aside`
    width: 380px; 
    margin-left: 90px;

    .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #cccccc;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #E5E5E5 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #E5E5E5;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #fff;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #6C63FF !important;
    border-radius: 10px;
    color: #FFF !important;
  }
`;

export const HourContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;
`;

export const Hour = styled.div<HourContentProps>`
  padding: 12px;
  background: #f8f7ff; 
  border-radius: 10px;
  margin-right: 8px;

  ${ (props) => 
        props.isFocused && 
        css`
            border: 2px solid #6C63FF;
            color: #6C63FF; 
  `}

`;