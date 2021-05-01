import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Input, Dropdown, Icon } from "semantic-ui-react";
import faker from 'faker';

const Payments = ({ setStep, editMode, setEditMode, user }) => {

    const [savePayment, setSavePayment] = useState({});

    useEffect(() => {
        if (user.user_id) {
            const { firstname, lastname, userPreferences: { street, city, state, zip } } = user;
            setSavePayment({ firstname, lastname, street, city, state, zip });
        } else {
            console.log('guest user');
        }

    }, []);

    const cardType = [
        { key: 'AMEX', text: 'American Express', value: 'AMEX' },
        { key: 'MasterCard', text: 'Master Card', value: 'MasterCard' },
        { key: 'Visa', text: 'Visa', value: 'Visa' },
        { key: 'Discover', text: 'Discover', value: 'Discover' }
    ]

    const handleInput = (e, data) => {
        console.log('Input changed for ', data.name);
        const { name, value } = data;
        console.log('name:', name, ' value:', value);
        setSavePayment({ ...savePayment, [name]: value })

    }

    const handleSelect = (e, data) => {
        console.log('New shipping option chosen:', data.value);
        setSavePayment({ ...savePayment, [cardType]: data.value });
    }

    const addressDefinitions = faker.definitions.address;
    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
    }));

    const handleStateChange = (e, param) => {
        console.log('Handle State Change', param.value);
        setState(param.value);
    };

    return (
        <Grid celled='internally'>
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
                        Edit Your Profile
                            <Button animated compact={true}
                            size='mini'
                            floated='right'
                            onClick={e => setStep('review')}>
                            <Button.Content visible>Next</Button.Content>
                            <Button.Content hidden>
                                <Icon name='thumbs up' />
                            </Button.Content>
                        </Button>
                    </Segment>
                    <Segment>
                        <p>Card Number:</p>
                        <Input
                            name='number'
                            onChange={handleInput}
                        >
                        </Input>
                        <p>CID:</p>
                        <Input
                            name='CID'
                            onChange={handleInput}
                        >
                        </Input>
                        <p>Card Type:</p>
                        <Dropdown options={cardType} onChange={handleSelect} />
                    </Segment>

                    <Segment>
                        <p> First Name:</p>
                        <Input
                            name='firstname'

                            onChange={handleInput}
                        >
                        </Input>
                    </Segment>
                    <Segment>
                        <p> Last Name:</p>
                        <Input
                            name='lastname'

                            onChange={handleInput}
                        >
                        </Input>
                    </Segment>
                    <Segment>
                        <p>Street Address:</p>
                        <Input
                            name='street'

                            onChange={handleInput}
                        >
                        </Input>
                    </Segment>

                    <Segment.Group
                        horizontal
                        style={{
                            backgroundColor: 'white'
                        }}
                    >
                        <Segment>
                            <p>City:</p>
                            <Input
                                name='city'

                                onChange={handleInput}
                            >
                            </Input>
                        </Segment>

                        <Segment>
                            <p>State:</p>
                            <Dropdown
                                name='state'
                                placeholder='State'

                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                search
                                selection
                                options={stateOptions}
                                onChange={handleInput}
                            />
                        </Segment>

                        <Segment>
                            <p>Zip Code:</p>
                            <Input
                                name='zip'

                                onChange={handleInput}
                            >
                            </Input>
                        </Segment>
                    </Segment.Group>


                </Segment.Group>

                <Segment>

                </Segment>

            </Grid.Column>

            <Grid.Column width={3}>

            </Grid.Column>
        </Grid>
    )

}

export default Payments;