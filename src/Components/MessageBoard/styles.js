// Styled components for message board component and children
import styled from 'styled-components';

export const Board = styled.section`
    padding-top: 30px;
    width: 400px;
    min-width: 400px;
    max-width: 600px;
    height: 100%;
    h1{
        margin-bottom: 30px;
        text-align: center;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
    }
    h2{
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
    }
    h4{
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        font-family: 'Raleway', sans-serif;
    }
    .spinner{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .error{
        text-align: center;
    }
    .card-container{
        height: 70%;
        overflow: scroll;
    }
`;

export const Card = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 90%;
    margin: 20px auto;
    cursor: pointer;
    &:hover{
        transform: scale(1.05);
    }
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .content-container{
        margin-left: 10px;
    }
`;

export const Form = styled.div`
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 20px;
    margin-top: 20px;
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        .btn-container{
            display: flex;
            justify-content: flex-end;
            button{
                font-family: 'Raleway', sans-serif;
                font-size: 18px;
                width: 50%;
                height: 30px;
                margin: 10px 0;
                border: none;
                border-radius: 5px;
                background-color: #44cdcd;
                color: white;
                cursor: pointer;
                &:hover{
                    transform: scale(1.05);
                }
            }
        }
    }
    
`;