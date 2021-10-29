import React from "react";
import { Card, Button } from "react-bootstrap"

function NoteCard(props) {
    return (
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPMR6tjHCqvKDo9rU_1mIE50_AfVASIDvHg&usqp=CAU" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.body}</Card.Text>
                <Button variant="primary">Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;
