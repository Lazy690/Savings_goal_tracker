
function Header() {
    
    
    const background = {
        width: "500px",
        padding: "10px",
        background: "#060a14",
        
    }
    const goalstyle = {
        fontweight: "500",
        fontfamily: "inherit",
        textalign: "center",

    }
    return (
        <div style={background}>
            <header>
                <h1 style={goalstyle}>Goal</h1>
                
                
            </header>
        </div>
    );
};

export default Header