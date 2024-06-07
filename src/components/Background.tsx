import bg from "../assets/images/hero-bg.gif";

function Background(){
    return (
        <>
            <div className="fixed w-full">
                <img className="fixed top-0 left-0 min-w-full min-h-full object-cover z-0" src={bg} />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-md z-1"></div>
        </>
    );
}


export default Background;