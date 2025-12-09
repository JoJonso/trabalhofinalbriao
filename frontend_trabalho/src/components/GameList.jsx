export default function({data = []}) {
    return(
        <>
            <div>
                {data.map(game => (
                    <div key={game.id}>
                        <img src={game.cover_image}></img>
                        <h1>{game.title}</h1>
                        <p>{game.description}</p>
                        <p>{game.developer}</p>
                        <p>{game.publisher}</p>
                        <p>{}</p>
                        <p>{game.genre}</p>

                        <button>Fazer Review</button>
                    </div>
                ))}
            </div>
        </>
    );
}