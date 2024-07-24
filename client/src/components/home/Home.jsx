import { useEffect, useState } from "react";
import catsAPI from "../../api/catsAPI";
import LatestCat from "./latest-cat/LatestCat";

export default function Home() {
    const [latestCats, setLatestCats] = useState([]);

    useEffect(() => {
        (async () => {
            // TODO: MODIFY TO FETCH ONNLY LATEST CATS
            const result = await catsAPI.getAll();

            setLatestCats(result.reverse().slice(0, 3));
        })();
    }, [])
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Cats</h1>

                {latestCats.length > 0
                    ? latestCats.map(cat => <LatestCat key={cat._id} {...cat} />)
                    : <p className="no-articles">No cats yet</p>
                }

            </div>
        </section>
    );
}