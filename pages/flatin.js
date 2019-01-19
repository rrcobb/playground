import React from 'react'

class FoldingAnimation extends React.Component {
    state = {folded: true}
    componentDidMount() {
        this.timer = setInterval(() => this.setState({folded: !this.state.folded}), 3000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return <div>
          <p className={this.state.folded ? 'folded' : 'shown'}>{this.props.from}</p>
          <style jsx>
            {`
            .shown {
                visibility: visible;
                opacity: 1;
                transition: visibility 0s linear 0.33s, opacity 0.33s linear;
                transition-delay: 0s;
            }

            .folded {
                visibility: hidden;
                opacity: 0;
                transition: visibility 0s linear 0.33s, opacity 0.33s linear;
                transition-delay: 0s;
            }`}
          </style>
        </div>;
    }
}

export default class FlatinAnimation extends React.Component {
    render() {
        return <FoldingAnimation from="LATIN" to="FLATIRON"></FoldingAnimation>
    }
}
