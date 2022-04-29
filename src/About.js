import { Button, Card } from "react-bootstrap";

export default function About() {
    return (
        <>
            <Card border="dark" style={{ width: "70rem" }}>
                <Card.Header>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        Hey there! I am Mann Patel and I am currently persuing
                        Computer Programming diploma at Seneca College. 
                    </Card.Text>
                    <Button href="/" variant="primary">Home</Button>
                </Card.Header>
                
            </Card>
        </>
    )
}