import { Card } from "react-bootstrap";

export default function NotFound() {


    return (
        <>
            <Card border="dark" style={{ width: "70rem" }}>
                <Card.Header>
                    <Card.Title>Not Found</Card.Title>
                    <Card.Text>
                        We can't find what you're looking for...
                    </Card.Text>
                </Card.Header>
            </Card>
        </>
    )
}