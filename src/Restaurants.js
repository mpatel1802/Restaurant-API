import { useEffect, useState } from "react";
import { Card, Pagination, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Restaurants() {

    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;

    let navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    var borough = urlParams.get("borough");
    

    useEffect(() => {
        
        var herokuAPI;
        if (borough === null) {
            herokuAPI = `https://shrouded-caverns-06727.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
        }
        else {
            herokuAPI = `https://shrouded-caverns-06727.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`;
        }
            fetch(herokuAPI)
                .then((res) => res.json())
                .then(function (data) {
                    setRestaurants(data.restaurants);
                    
                }).catch(function (err) {
                    console.log(err);
                });
    }, [page, borough]);

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage() {
        setPage(page + 1);
    }


    if (restaurants === null || restaurants === undefined) {
        return (
            
            <Card border="dark" style={{ width: "70rem" }}>
                    <Card.Header>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>
                        Loading Restaurants...
                        </Card.Text>
                    </Card.Header>
            </Card>
        )
    }
    else {
        return (
            <>
                <Card border="dark" style={{ width: "70rem" }}>
                    <Card.Header>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>
                            Full list of restaurants. Optionally sorted by borough
                        </Card.Text>
                    </Card.Header>
                </Card>
                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Borough</th>
                            <th>Cuisine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restData) => (
                            <tr key={restData._id} onClick={() => {
                                    navigate(`/restaurant/${restData._id}`);
                                }}
                            >
                                <td>{restData.name}</td>
                                <td>{restData.address.building} {restData.address.street}</td>
                                <td>{restData.borough}</td>
                                <td>{restData.cuisine}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.Prev onClick={() => previousPage()}/>
                    <Pagination.Item>{ page }</Pagination.Item>
                    <Pagination.Next onClick={() => nextPage()}/>
                </Pagination>
            </>
        )
    }
}
