import "./header.css";

function Header() {
   
    return (
        <div className="header">
            <span className="buton-wrap">
                <button className="goal-button">Goals</button>
                <button className="goal-button">Theme</button>
            </span>
            <header>
                <h1 className="goal">Gaming PC</h1>
            </header>
            
        </div>
    );
};

export default Header;