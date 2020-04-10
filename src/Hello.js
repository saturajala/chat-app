import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>Hello {this.props.name}</p>
                <p>Have a nice {this.props.weekday}</p>
            </div>
        );
    }
}

export default Hello;