import React from "react";
import {Grid, Segment, Button, Icon} from "semantic-ui-react";

const Shipping = ({setEditMode, shippingInfo, setStep}) =>{
    //get user shipping information and populate
    const handleClick=(e)=>{
        e.preventDefault();
        setEditMode(true);
    }

    const { firstname, lastname, street, city, state, zip, shipping } = shippingInfo;

    return (
                <>
                    <Grid.Column
                        className='column-one'
                        width={3}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'space-between'
                        }}
                    >
                    </Grid.Column>
                    <Grid.Column
                        width={10}
                        style={{
                            height: '100%'
                        }}
                    >
                        <Segment.Group>
                            <Segment
                                style={{
                                    backgroundColor: 'olivedrab',
                                }}
                            >
                            Shipping Information
                            <Button animated compact={true}
                                    size='mini'
                                    floated='right'
                                    onClick={e=>setStep('payment')}>
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='payment' />
                            </Button.Content>
                            </Button>
                            <Button
                                    icon='edit'
                                    compact={true}
                                    size='mini'
                                    floated='right'
                                    onClick={handleClick} >
                                </Button>                       
                            </Segment>
                            <Segment>
                                <label> First Name:</label>
                                <p>{firstname}</p>
                            </Segment>
                            <Segment>
                                <label> Last Name:</label>
                                <p>{lastname}</p>
                            </Segment>
                            <Segment>
                                <label>Street Address:</label>
                                <p>{street}</p>
                            </Segment>
                            <Segment.Group
                                horizontal
                                style={{
                                    backgroundColor: 'white'
                                }}
                            >
                                <Segment>
                                    <label>City:</label>
                                    <p>{city}</p>
                                </Segment>
                                <Segment>
                                    <label>State:</label>
                                    <p>{state}</p>
                                </Segment>
                                <Segment>
                                    <label>Zip Code:</label>
                                    <p>{zip}</p>
                                </Segment>
                            </Segment.Group>
                            <Segment>
                                <label>Preferred Shipping Method:</label>
                                <p>{shipping}</p>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    </Grid.Column>
                </>
    )
}

export default Shipping;