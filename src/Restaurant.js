import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';

export default function Restaurant() {

    let { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        setLoading(true);
        fetch(`https://shrouded-caverns-06727.herokuapp.com/api/restaurants/${id}`)
            .then((res) => res.json())
            .then(function (result) {

                setLoading(false);
                if (result.data.hasOwnProperty("_id")) {
                    setRestaurant(result.data);                
                }
                else {
                    setRestaurant(null);
                }
                
            }).catch(function (err) {
                console.log(err);
            });
    }, [id]);


    if (restaurant === null || restaurant === undefined || loading === true) {
        return (
            <>
                <Card border="dark" style={{ width: "70rem" }}>
                    <Card.Header>
                        <Card.Text>
                            Loading Restaurant data... 
                        </Card.Text>
                    </Card.Header>
                </Card>
            </>
        )
    }
    else {
        return (
            <>
                <Card border="dark" style={{ width: "70rem" }}>
                    <Card.Header>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>
                            {restaurant.address.building} {restaurant.address.street}
                        </Card.Text>
                    </Card.Header>
                </Card>
                <br />
                <MapContainer style={{ "height": "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}> <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker> </MapContainer>
                <br />

                <h2>Ratings</h2>
                <hr />
                <CardDeck>
                    {restaurant.grades.map((value, index) => 
                        <Card key={index}>
                            <Card.Header><b>Grade:</b> {value.grade}</Card.Header>                               
                            <Card.Body>
                                <Card.Text>
                                    Completed: {new Date(value.date).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}    
                </CardDeck>
            </>
        )
    }
}