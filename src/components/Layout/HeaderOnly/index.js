import Header from '~/components/Layout/components/Header/header';
import ShowChatBot from '../components/showChatBot/ShowChatBot';
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />

            <div>{children}</div>
            <ShowChatBot/>
        </div>
    );
}

export default HeaderOnly;
