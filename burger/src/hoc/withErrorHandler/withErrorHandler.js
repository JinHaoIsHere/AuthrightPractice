import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler=(WrappedComponent, axios)=>{
    return class extends Component{
        
        state = {
            error: null,
        }
        componentWillMount(){
            this.reqInc = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            })
            this.resInc = axios.interceptors.response.use(req=>req, err=>{
                this.setState({error: err});
            })
        }
        errorConfirmedHandler=()=>{
            this.setState({error: null});
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInc);
            axios.interceptors.response.eject(this.resInc);
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
    
            )
        }
    }
}

export default withErrorHandler;