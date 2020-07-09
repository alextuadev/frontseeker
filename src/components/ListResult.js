import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';


class ListResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: []
        }
    }

    componentDidMount() {
        this.setState({ results: this.props.results })
    }


    render() {
        return (
            <Row xs="5">
                {this.state.results.map(function (item, index) {
                    return <Col>
                        <Card key={item.index}>
                            <CardImg top width="100%" src={item.image} alt="image" />

                            <CardBody>
                                <CardTitle><a href={item.url} rel="noopener noreferrer" target="_blank">{item.name}</a> </CardTitle>
                                <CardText>{item.type}</CardText>
                                <CardText>
                                    <small className="text-muted">From {item.origin}</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                })
                }
            </Row>
        );



    }

}


export default ListResult;
