import styled from 'styled-components'; 

interface FormProps {
  hasError: boolean; 
}


export const Container = styled.div`

`;


export const Header = styled.header`
    padding: 32px 0;
    background: #EFEEFF;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto; 
    display: flex; 
    align-items: center; 

    > img {
        height: 35px; 
    }

    button {
        margin-left: auto; 
        background: transparent; 
        border: 0; 

        svg {
            color: #999591;
            width: 20px;
            height: 20px; 
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center; 
    margin-left: 80px;

    img {
        width: 56px; 
        height: 56px;
        border-radius: 50%; 
    }

    div {
        display: flex; 
        flex-direction: column; 
        margin-left: 16px; 
        line-height: 24px;

        span {
            color: #999591;
        }

        a {
            text-decoration: underline;
            color: #6C63FF; 

            &:hover{
                opacity: 0.8;
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

    a {
        text-decoration: none;
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

export const Provider = styled.div`
    display: flex;
    align-items: center; 
    text-decoration: none;
    margin-bottom: 28px; 
    

    & + div {
        margin-top: 16px; 
    }

    a {
        text-decoration: none;
    }

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

// search 

export const Form = styled.form`
    margin-top: 40px; 
    display: flex; 

    input {
        flex: 1;
        background-color: #f8f7ff;
        height: 70px;
        padding: 0 24px; 
        border: 0;
        border-radius: 10px; 
        color: #3a3a3a; 
        border: 2px solid #fff;
        border-right: 0; 

        &::placeholder {
            color: #a8a8b3; 
        }

        &:hover{
                opacity: 0.8;
                background: #f8f7ff; 
                border: 2px solid #6C63FF;
                
        }
    }

`;

