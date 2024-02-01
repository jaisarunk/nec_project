import React from 'react';
import Header from "./Header";

function Home() {
    return (<>
        <Header/>
        <div className="container">
            <h3>Welcome {localStorage.getItem('currentUsername')}</h3>
        </div>
        </>
    );
}
export default Home;