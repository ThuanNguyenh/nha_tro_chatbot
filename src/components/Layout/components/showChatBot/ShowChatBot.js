import './showChat.scss';
import { faCircleXmark, faCommentDots, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ChatBot from '~/components/chatbot/ChatBot';

function ShowChatBot() {
    const [show, setShow] = useState(false);

    const toggleChat = () => {
        setShow(!show);
    };

    const boxStyles = {
        width: show ? 'auto' : '50px',
        height: show ? 'auto' : '50px',
        background: show ? 'transparent' : 'blue',
        animation: show ? 'none' : 'shake 1s infinite',
    };

    return (
        <>
            <div
                className={`chat row row-cols-2 col-md-6 col-sm-6 col-xl-3 mx-4 g-0 text-center ${show ? 'open' : ''}`}
            >
                <div className="col-sm-6 col-md-10 chat-content">{show && <ChatBot />}</div>

                <div className="box col-6" style={boxStyles} onClick={toggleChat}>
                    {show ? (
                        <FontAwesomeIcon className="icon-1" icon={faSquareMinus} />
                    ) : (
                        <FontAwesomeIcon className="icon" icon={faCommentDots} />
                    )}
                </div>
            </div>
        </>
    );
}

export default ShowChatBot;
