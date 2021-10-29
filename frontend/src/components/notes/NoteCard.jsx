import React from "react";
import { Card, Button } from "react-bootstrap"

function NoteCard() {
    return (
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPMR6tjHCqvKDo9rU_1mIE50_AfVASIDvHg&usqp=CAU" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;
