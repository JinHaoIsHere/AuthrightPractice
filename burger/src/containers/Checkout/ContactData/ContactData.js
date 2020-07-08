import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },

            stress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'eamil',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                valid: true,
                validation: {},
            }
        },
        formIsValid: false,
        loading: false,
    }

    
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ings);

        this.setState({ loading: true });
        const formData={};
        for (let ele in this.state.orderForm){
            formData[ele] = this.state.orderForm[ele].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }


    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length<=rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, id)=>{
        const updatedForm = {...this.state.orderForm};
        const updatedFormEle = {...updatedForm[id]};
        updatedFormEle.value=event.target.value;
        updatedFormEle.valid=this.checkValidity(updatedFormEle.value, updatedFormEle.validation);
        updatedFormEle.touched = true;
        
        updatedForm[id]=updatedFormEle;
        let formIsValid=true;
        for( let id in updatedForm){
            formIsValid = updatedForm[id].valid && formIsValid;
        }
        //console.log(formIsValid);
        console.log(updatedForm);
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(e=>(
                    <Input 
                    key={e.id}
                    elementType={e.config.elementType}
                    elementConfig={e.config.elementConfig}
                    value={e.config.value}
                    invalid={!e.config.valid}
                    shouldValidate={e.config.validation}
                    touched={e.config.touched}
                    changed={(event)=>this.inputChangedHandler(event, e.id)}/>
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

export default connect(mapStateToProps)(ContactData);