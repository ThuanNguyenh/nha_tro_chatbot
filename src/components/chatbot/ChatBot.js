import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ChatBot.scss';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
function ChatBot() {
    // content
    const [content, setContent] = useState();
    const [contents, setContents] = useState(() => {
        const storageContents = JSON.parse(localStorage.getItem('contents'));
        return storageContents;
    });

    // status rep
    const [responseText, setResponseText] = useState();
    const [responseTexts, setResponseTexts] = useState(() => {
        const storageResponses = JSON.parse(localStorage.getItem('responseTexts'));
        return storageResponses;
    });

    // Sử dụng useRef để tham chiếu đến phần tử input
    const inputRef = useRef(null);

    // màng hình tự động cuộn
    const containerRef = useRef(null)

    // nhấn enter sẽ bắt được handleSubmit
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }
    
    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [responseTexts]);

    const handleSubmit = async () => {
        if (content) {
            setContents((prev) => {
                if (Array.isArray(prev)) {
                    // Kiểm tra xem prev có phải là mảng không
                    const newContents = [...prev, content];

                    // Save to local storage
                    const jsonContents = JSON.stringify(newContents);
                    localStorage.setItem('contents', jsonContents);

                    return newContents;
                } else {
                    // Nếu prev không phải là mảng, thì tạo một mảng mới
                    const newContents = [content];

                    // Save to local storage
                    const jsonContents = JSON.stringify(newContents);
                    localStorage.setItem('contents', jsonContents);

                    return newContents;
                }
            });
            setContent('');

            // Gửi yêu cầu API bằng Axios
            try {
                const response = await fetch(`http://localhost:5000/predict`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_input: content }),
                });
                const data = await response.json();
                const responseData = data.response;

                await setResponseText(responseData);

                await setResponseTexts((prev) => {
                    if (Array.isArray(prev)) {
                        const newResponseTexts = [...prev, responseData];

                        // Save to local storage
                        const jsonResponseTexts = JSON.stringify(newResponseTexts);
                        localStorage.setItem('responseTexts', jsonResponseTexts);

                        return newResponseTexts;
                    } else {
                        const newResponseTexts = [responseData];

                        const jsonResponseTexts = JSON.stringify(newResponseTexts);
                        localStorage.setItem('responseTexts', jsonResponseTexts);

                        return newResponseTexts;
                    }
                });
            } catch (error) {
                console.error('Loi: ', error);
            }

            // Tập trung trở lại ô input sau khi xử lý submit
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div className="all">
                <div className='box-title'>ChatBot</div>
                <div className="wrap" ref={containerRef}>
                    <div className="mes">Xin chào, tôi có thể giúp gì cho bạn?</div>
                    {responseTexts &&
                        contents &&
                        responseTexts.map((responseText, index) => (
                            <>
                                {index < contents.length && (
                                    <div className="rep" key={`rep-${index}`}>
                                        {contents[index]}
                                    </div>
                                )}
                                <div className="mes" key={`mes-${index}`}>
                                    {responseText}
                                </div>
                            </>
                        ))}
                </div>
                <div className="post">
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="text-post"
                        type="text"
                        ref={inputRef}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSubmit} className="sub-post" type="submit">
                        <FontAwesomeIcon className='icon-2' icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatBot;
