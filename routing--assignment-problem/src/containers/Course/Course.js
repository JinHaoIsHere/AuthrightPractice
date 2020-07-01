import React, { Component } from 'react';

class Course extends Component {
    state = {
        title: 'OURSE_T',
        id: 'ID'
    }
    componentDidMount() {
        this.update();
        // title=query.entries[1];
        //this.setState({title: query.entries()[1]});
    }
    componentDidUpdate(){
        this.update();
    }
    update(){
        console.log(this.props.match.params.redirectParam);
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']
            if (param[0] === 'title' && param[1]!==this.state.title) {
                this.setState({ title: param[1] });
            }

        }

    }
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>You selected the Course with ID:{this.state.id}</p>
            </div>
        );
    }
}

export default Course;